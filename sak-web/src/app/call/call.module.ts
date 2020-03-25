import { NgModule } from '@angular/core';

import { CallRoutingModule } from './call-routing.module';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [ListComponent],
  imports: [
    CallRoutingModule
  ]
})
export class CallModule { }
