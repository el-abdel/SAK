import { CommonModule } from '@angular/common';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { NotFoundComponent } from './not-found/not-found.component';
import { MaterialModule } from './material.module';
import { initializer } from './app.init';


@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    MaterialModule,
    KeycloakAngularModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    KeycloakAngularModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    }
  ],
})
export class CoreModule {}
