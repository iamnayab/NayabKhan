import { Component } from '@angular/core';
import { SupabaseService } from './services/supabase.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Nayab Khan';

  isResponsive = false;
  isLoggedIn: boolean = false;
  constructor(private supabase: SupabaseService, private router: Router,private titleService: Title) {
    this.titleService.setTitle('Nayab Khan');
  }
  
toggleMenu() {
  this.isResponsive = !this.isResponsive;
}


async ngOnInit() {
  const { data } = await this.supabase.getUser();
  this.isLoggedIn = !!data.user;  // ✅ Set login status
}

async logout() {
  await this.supabase.signOut();
  this.isLoggedIn = false;
  this.router.navigate(['/login']);  // Redirect to login after logout
}
}
