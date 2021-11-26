import { NgModule, APP_INITIALIZER } from '@angular/core';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';

import { NotFoundComponent } from './not-found/not-found.component';
import { initializer } from './app.init';
import { RouterModule } from '@angular/router';

import {APOLLO_OPTIONS} from 'apollo-angular';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {HttpLink} from 'apollo-angular/http';
import {environment} from '../../environments/environment';


export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({uri: environment.apiUrl + '/graphql'}),
    cache: new InMemoryCache(),
  };
}

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
    },
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class CoreModule {}
