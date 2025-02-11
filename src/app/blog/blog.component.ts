import { Component, OnInit, OnDestroy } from '@angular/core';
import { SupabaseService } from '../services/supabase/supabase.service';
import { RealtimeChannel } from '@supabase/supabase-js';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit, OnDestroy {
  blogs: any[] = [];
  private blogSubscription!: RealtimeChannel;

  constructor(private supabase: SupabaseService) {}

  ngOnInit(): void {
    this.loadPosts(); // Load posts initially
    this.subscribeToBlogUpdates(); // Listen for real-time updates
  }

  async loadPosts() {
    this.blogs = await this.supabase.getBlogPosts(); // Fetch latest posts
    console.log("data",this.blogs);
    
  }

  subscribeToBlogUpdates() {
    this.blogSubscription = this.supabase.client
      .channel('blog-updates') // Create a channel
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'blog' },
        async () => {
          await this.loadPosts(); // Reload posts when a change occurs
        }
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    if (this.blogSubscription) {
      this.supabase.client.removeChannel(this.blogSubscription); // Unsubscribe on component destroy
    }
  }
}
