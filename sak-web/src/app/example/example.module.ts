import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ExampleRoutingModule } from './example-routing.module';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [ListComponent],
  imports: [
    SharedModule,
    ExampleRoutingModule
  ]
})
export class ExampleModule { }
