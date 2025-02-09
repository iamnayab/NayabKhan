import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { BlogComponent } from './blog/blog.component';



const routes: Routes=[
  {
    path: '', redirectTo: 'home', pathMatch: 'full',
  },
  { path: 'admin', component:AdminComponent, canActivate: [AuthGuardService] },
  { path: 'home', component: HomeComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'blog', component:BlogComponent },
  { path: 'login', component:LoginComponent },
  {path:'**',component:NotFoundComponent},

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
