import { NgModule, APP_INITIALIZER } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { NotFoundComponent } from './not-found/not-found.component';
import { initializer } from './app.init';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [NotFoundComponent],
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
