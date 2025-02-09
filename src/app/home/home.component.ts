import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
isResponsive = false;
  
toggleMenu() {
  this.isResponsive = !this.isResponsive;
}
}
