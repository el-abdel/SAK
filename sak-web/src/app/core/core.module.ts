import { NgModule, APP_INITIALIZER } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { initializer } from './app.init';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    RouterModule,
    KeycloakAngularModule
  ],
  exports: [
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
