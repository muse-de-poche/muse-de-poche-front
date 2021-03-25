import { CompositionCardComponent } from './components/composition-card/composition-card.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompositionEditorComponent } from './components/composition-editor/composition-editor.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  {path:'', component: HomeComponent},
  {path:'search', component: SearchComponent},
  {path:'dashboard', component: DashboardComponent},
  {path:'editor', component: CompositionEditorComponent},
  {path:'compo', component: CompositionCardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
