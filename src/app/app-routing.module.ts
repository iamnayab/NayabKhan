import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppComponent } from './app.component';



const routes: Routes=[
  {
    path: '', redirectTo: 'home', pathMatch: 'full',
  },
  { path: 'home', component: HomeComponent },
  { path: 'portfolio', component: PortfolioComponent },
  {path:'**',component:NotFoundComponent},

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
