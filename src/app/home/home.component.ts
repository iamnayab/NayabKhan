import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
constructor(private Snackbar:MatSnackBar){}
showSnackbar() {
  console.log("buttonclicked");
  
  this.Snackbar.open('⚠️ Page Not Completed Yet!', 'Close', {
    duration: 5000, 
    horizontalPosition: 'center',
    verticalPosition: 'top',
    panelClass: ['custom-snackbar']
  });
}
}
