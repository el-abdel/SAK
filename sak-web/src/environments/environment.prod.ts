import { KeycloakConfig } from 'keycloak-angular';

// Add here your keycloak setup infos
const keycloakConfig: KeycloakConfig = {
  url: 'http://keycloak.local:8080/auth',
  realm: 'realm',
  clientId: 'client-id'
};

export const environment = {
  production: true,
  keycloakConfig
};
