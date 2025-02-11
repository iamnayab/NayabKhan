import { Component } from '@angular/core';
import { SupabaseService } from './services/supabase/supabase.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Nayab Khan';

  isLoggedIn: boolean = false;
  
  constructor(private supabase: SupabaseService, private router: Router,private titleService: Title) {
    this.titleService.setTitle('Nayab Khan');
  }
  
async ngOnInit() {
  const userData = await this.supabase.getUser(); // Get user data
  this.isLoggedIn = !!userData.user;  // ✅ Set login status
}


async logout() {
  await this.supabase.signOut();
  this.isLoggedIn = false;
  this.router.navigate(['/login']);  // Redirect to login after logout
}
}
