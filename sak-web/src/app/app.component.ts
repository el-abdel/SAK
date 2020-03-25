import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private keycloakService: KeycloakService) {}

  async doLogout() {
    await this.keycloakService.logout();
  }
}
