import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xcilgpanzfqpipuikmpl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhjaWxncGFuemZxcGlwdWlrbXBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE2OTQ4NDcsImV4cCI6MjA0NzI3MDg0N30.p-ZmuT7cxVUIK_uZA6egoRoSMIcfAnVh6Z9UESqphpo';


@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(supabaseUrl, supabaseAnonKey);
  }

  // Sign up with email & password
  async signUp(email: string, password: string) {
    return await this.supabase.auth.signUp({ email, password });
  }

  // Sign in with email & password
  async signIn(email: string, password: string) {
    return await this.supabase.auth.signInWithPassword({ email, password });
  }

  // Check if user is logged in
  async getUser() {
    return await this.supabase.auth.getUser();
  }

  // Logout
  async signOut() {
    return await this.supabase.auth.signOut();
  }
}
