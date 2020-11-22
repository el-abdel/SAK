import { NgModule } from '@angular/core';

import { ExampleRoutingModule } from './example-routing.module';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [ListComponent],
  imports: [
    ExampleRoutingModule
  ]
})
export class ExampleModule { }
