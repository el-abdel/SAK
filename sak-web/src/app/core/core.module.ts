import { NgModule, APP_INITIALIZER, Optional, SkipSelf } from '@angular/core';
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
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'Core is already loaded. Import it in the AppModule only'
      );
    }
  }
}
