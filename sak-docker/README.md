![wanpa](http://10.141.6.164/public/images/wanpalogoarsguyanehd.png)

# SAK 1.0.0

### Exigence:

* Docker

* PHP 7.3

* Composer

* NodeJS / npm

### Instalation:

* **monter (et construire) l'environnement de développement**

  * `cd wanpa2Docker`

  * `docker-compose -f docker-projects/docker-compose/wanpa.yml up`

  * Exécuter en mode détaché (optionnel):

    * `docker-compose -f docker-projects/docker-compose/wanpa.yml up -d`

  * Configurer le fichier hostes pour ajouter les vhosts suivant:

    * `127.0.0.1 wanpa-api.local wanpa-web.local phpmyadmin.local`

### Configuration API:

* Apres avoir monter l'env de dev sous docker il faut installer les dépendances:

  * `cd docker-projetcs/docker-compose/`

  * `docker-compose -f wanpa.yml run --rm composer install --ignore-platform-reqs`

* Dans un navigateur web accéder à l'api via http://wanpa-api.local

> Accès phpmyadmin: http://phpmyadmin.local

### Configuration Web Client:

1. staller Agular cli globalement:

   * `npm install -g @angular/cli`

2. List item:

   * `cd wanpa-web/`

   * `npm install`

3. Servir l'application localement (dev mode):

   * `ng serve`

   * Accéder à l'app via http://localhost:4200

> Servir l'application sur un Vhost (sous docker):
>
> * `ng build --prod`
>
> * Accéder à l'app via http://wanpa-web.local

### Configuration SSO:

1. Installation: déjà faite avec docker-compose

   ...
   keycloak:\
   image: jboss/keycloak\
   environment:\
   \- DB_VENDOR=MYSQL\
   \- DB_ADDR=dbase\
   \- DB_DATABASE=keycloak\
   \- DB_USER=keycloak\
   \- DB_PASSWORD=password\
   \- KEYCLOAK_USER=admin\
   \- KEYCLOAK_PASSWORD=admin\
   \- KEYCLOAK_HOSTNAME=keycloak.local
   ports:\
   \- 8080:8080\
   links:\
   \- database-wanpa:dbase\
   network_mode: "bridge"
   ...

> Accès a l'admin console:
>
> * url: http://keycloak.local:8080
>
> * login: admin | password: admin

1. Comprendre les concepts de base et la terminologie de keycloak. Cela aidera à comprendre les étapes ci-dessous

2. [Créer un realm](https://www.keycloak.org/docs/latest/server_admin/index.html#_create-realm)

3. [Créer un OpenId connect client](https://www.keycloak.org/docs/latest/server_admin/index.html#_clients)

4. Dans les paramètres du client, définissez une URL de redirection valide (*Valid Redirect URL*) pour pointer sur l'application Angular.

5. Dans les paramètres du client, définissez Web Origin pour qu'il pointe vers l'application Angular.

6. [Configurer la connexion avec LDAP](https://www.keycloak.org/docs/latest/server_admin/index.html#_user-storage-federation)

### Configuration ELK:

* Kibana url: http://kibana:5601

* Elasticsearch url: http://elasticsearch:9200
