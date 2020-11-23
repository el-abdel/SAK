# SAK

Skeleton stack (for development purpose) built in Symfony, Angular and Keycloak, running on Docker containers using docker-compose tool.

## Requirement

- Docker
- NodeJs/Npm

## Installation

First, clone this repository:

```
$ git clone https://github.com/el-abdel/SAK.git
```

Next got to **sak-docker** folder.

```
$ cd sak-docker
```

Then run this command to build your environment.

```
$ docker-compose -f docker-projects/docker-compose/sak.yml up
```

> Do not forget to add virtual hosts in your /etc/hosts file.

#### Configuring Symfony App

For better performance the **vendor** folder is not shared in our volumes, so we need to install our dependencies in the container. To do so run:

```
$ docker-compose -f docker-projects/docker-compose/sak.yml run --rm composer install --ignore-platform-reqs
```

You can visit your Symfony application on the following URL: [http://sak-api.local/api](http://sak-api.local/api) 

#### Configuring Angular App

Install Angular CLI:

```
$ npm install -g @angular/cli
```

Install app. dependencies:

```
$ cd sak-web
$ npm install -g @angular/cli
```
And finally serve you angular application locally using:

```
$ ng serve
```

You can visit your Angular application on the following URL: [http://localhost:4200](http://localhost:4200)

#### Configuring Keycloak

After building and running your containers, visit keycloak admin console on this URL: [http://keycloak.local:8080/auth](http://keycloak.local:8080/auth)

1. You need to create a realm, go to ```Realm list > Add realm```
    ![Create a realm](./docs/screenshots/create-a-realm.png)

2. Create clients by going in ```Configure > Clients > Create```
    > We need to create two clients one for Authorization and another one for Authentication

    ![Create a client](./docs/screenshots/create-a-client.png)

3. Configure Authorization client
    > you can configure it by going in ```Configure > Clients > [Your client]```. The authorization client Access type should be **bearer-only**.
    
    ![Config Authorization client](./docs/screenshots/config-autorization-client.png)

4. todo: continue on KC conf.

#### Securing API

For this part you can refer to my package [ABELkeycloakBearerOnlyAdapterBundle](https://github.com/el-abdel/ABELkeycloakBearerOnlyAdapterBundle), where you'll find a step by step documentation on how to secure your Symfony App using Keycloak.

#### Securing Angular App

To implement authentication in Angular application we are using: [angular-oauth2-oidc](https://github.com/manfredsteyer/angular-oauth2-oidc), you can visit the package repository for more information.