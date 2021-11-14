import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AuthGuard } from '../core/auth.guard';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { ExampleResolverService } from './resolver/ExampleResolverService';


const routes: Routes = [
  {
    path: 'liste',
    component: ListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'create',
    component: CreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'update/:id',
    component: UpdateComponent,
    canActivate: [AuthGuard],
    resolve: {resolvedData: ExampleResolverService}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExampleRoutingModule { }
