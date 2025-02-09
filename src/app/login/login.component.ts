import { Component } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private supabase: SupabaseService, private router: Router) {}

  async login() {
    const { error } = await this.supabase.signIn(this.email, this.password);
    if (error) {
      this.errorMessage = error.message;
    } else {
      this.router.navigate(['/admin']); // Redirect to Admin Panel
    }
  }
}
