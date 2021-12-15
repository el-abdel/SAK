import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { CreateComponent } from './components/create/create.component';
import { UpdateComponent } from './components/update/update.component';
import { ExampleResolverService } from './resolvers/ExampleResolver.service';


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
