import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SupabaseService } from '../supabase/supabase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private supabase: SupabaseService, private router: Router) {}
  async canActivate(): Promise<boolean> {
    try {
      const userData = await this.supabase.getUser(); // Get full response
      const user = userData.user; // Extract user
  
      if (!user) {
        this.router.navigate(['/login']);
        return false;
      }
  
      return true;
    } catch (error) {
      console.error('Error in AuthGuard:', error);
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
