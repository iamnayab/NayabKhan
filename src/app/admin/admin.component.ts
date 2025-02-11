import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase/supabase.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  blogs: any[] = [];
    isAdmin = false;
    title = '';
    content = '';
    file: File | null = null;
    errorMessage = '';
  
    constructor(private supabase: SupabaseService) {}
  
    async ngOnInit() {
      this.blogs = await this.supabase.getBlogPosts();
      this.isAdmin = await this.supabase.isAdmin();
    }
  
    onFileSelected(event: any) {
      this.file = event.target.files[0];
    }
  
    async createBlog() {
      if (!this.title || !this.content) {
        this.errorMessage = 'Title, content, and image are required!';
        return;
      }
    
      try {
        await this.supabase.createBlogPost(this.title, this.content, this.file || null);
        this.blogs = await this.supabase.getBlogPosts(); // Refresh blog list
    
        // ✅ Reset Fields After Success
        this.title = '';
        this.content = '';
        this.file = null;
        this.errorMessage = '';
    
      } catch (error: any) {  // 🔹 Ensure 'error' is of 'any' type
        this.errorMessage = error?.message || 'An unexpected error occurred!';
      }
    }
  
    async onDeletePost(postId: string) {
      try {
        await this.supabase.deleteBlogPost(postId);
        console.log('Post deleted successfully');
      } catch (error: any) {
        console.error('Error deleting post:', error?.message || error);
      }
    }
}
