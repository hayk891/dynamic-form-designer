import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateComponent } from './template/template.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ResponsesComponent } from './responses/responses.component';

const routes: Routes = [
  {
    path: '',
    component: TemplateComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: HomepageComponent
      },
      {
        path: 'responses',
        pathMatch: 'full',
        component: ResponsesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
