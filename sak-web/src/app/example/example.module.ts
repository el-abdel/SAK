import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ExampleRoutingModule } from './example-routing.module';
import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { UpdateComponent } from './components/update/update.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ListComponent, CreateComponent, UpdateComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ExampleRoutingModule
  ]
})
export class ExampleModule { }
