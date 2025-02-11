import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  client: any;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // Sign up with email & password
  signUp(email: string, password: string) {
    return this.supabase.auth.signUp({ email, password });
  }

  // Sign in with email & password
  signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  // Check if user is logged in (Uses cached session to reduce API calls)
  async getUser() {
    const { data } = await this.supabase.auth.getSession();
    return data?.session?.user ? { user: data.session.user } : { user: null };
  }

  // Logout
  signOut() {
    return this.supabase.auth.signOut();
  }

  // ✅ Check if the logged-in user is an admin
  async isAdmin(): Promise<boolean> {
    const { user } = await this.getUser();
    return user?.app_metadata?.['role'] === 'admin';
  }

  // ✅ Upload Image to Supabase Storage
  async uploadImage(file: File): Promise<string> {
    const fileName = `${Date.now()}-${file.name}`;
    const { data, error } = await this.supabase.storage.from('blog-images').upload(fileName, file);

    if (error) throw new Error(`Image Upload Failed: ${error.message}`);

    // ✅ Get Public URL
    return this.supabase.storage.from('blog-images').getPublicUrl(fileName).data.publicUrl;
  }

  // ✅ Create Blog Post (Admins Only)
  async createBlogPost(title: string, content: string, file: File | null) {
    if (!(await this.isAdmin())) throw new Error('Unauthorized: Only admins can create posts.');

    let imageUrl: string | null = null; // Initialize as null

    if (file) {
        imageUrl = await this.uploadImage(file); // Upload only if file exists
    }

    const { data, error } = await this.supabase
        .from('blog')
        .insert([{ 
            title, 
            content, 
            image_url: imageUrl, // Can be null if no image is uploaded
            author_id: (await this.getUser()).user?.id 
        }]);

    if (error) throw error;
    return data;
}

  // ✅ Get All Blog Posts (Public)
  async getBlogPosts() {
    const { data, error } = await this.supabase.from('blog').select('*').order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  // ✅ Delete Blog Posts (Admin)
  async deleteBlogPost(postId: string) {
    try {
      // ✅ Check if the user is an admin
      if (!(await this.isAdmin())) {
        throw new Error('Unauthorized: Only admins can delete posts.');
      }
  
      // ✅ Get the blog post to retrieve the image URL before deleting
      const { data, error: fetchError } = await this.supabase
        .from('blog')
        .select('image_url')
        .eq('id', postId)
        .single();
  
      if (fetchError) throw new Error(fetchError.message);
      
      // ✅ Extract the image path from the URL (if exists)
      if (data?.image_url) {
        const imagePath = data.image_url.split('/').pop(); // Get the file name
        await this.deleteImage(imagePath); // Call function to delete the image
      }
  
      // ✅ Delete the blog post
      const { error } = await this.supabase.from('blog').delete().eq('id', postId);
  
      if (error) throw new Error(error.message);
    } catch (error: any) {
      throw new Error(error?.message || 'An unknown error occurred while deleting the post.');
    }
  }
  async deleteImage(imagePath: string) {
    try {
      const { error } = await this.supabase.storage.from('blog-images').remove([imagePath]);
      if (error) throw new Error(error.message);
    } catch (error: any) {
      console.error('Error deleting image:', error.message);
    }
  }
  
}