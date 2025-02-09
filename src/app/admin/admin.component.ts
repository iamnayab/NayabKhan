import { Component } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(private supabase: SupabaseService, private router: Router) {}
 
  async logout() {
    await this.supabase.signOut();
    this.router.navigate(['/login']); // Redirect to login page
  }
}
