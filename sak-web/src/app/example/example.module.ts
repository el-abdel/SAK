import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ExampleRoutingModule } from './example-routing.module';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
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
