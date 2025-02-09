import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
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
