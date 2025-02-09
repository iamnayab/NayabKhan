import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppComponent } from './app.component';



const routes: Routes=[
  // {path:'**',component:NotFoundComponent},
{
  path:'',component:HomeComponent,
  children:[{
    path:'portfolio',component:PortfolioComponent
  }]
},

]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
