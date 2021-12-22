FROM  php:8.0.13-apache
LABEL maintainer="Abdellah Elmakhroubi"
LABEL name="apache2-php8"
LABEL version="1.0"

ENV TZ=Europe/Paris

RUN apt-get update && apt-get install -y mariadb-client libldap2-dev libzip-dev libwebp-dev libjpeg-dev libfreetype6-dev &&\
    docker-php-ext-configure ldap --with-libdir=lib/x86_64-linux-gnu/ &&\
    docker-php-ext-install ldap pdo pdo_mysql bcmath zip &&\
    echo "ServerName localhost" >> /etc/apache2/apache2.conf && \
    echo 'LogFormat "%{X-Correlation-Id}i %a %l %u %t \"%r\" %>s %O \"%{Referer}i\" \"%{User-Agent}i\"" combined_cid' >> /etc/apache2/apache2.conf && \
    echo 'date.timezone = "Europe/Paris"' >> $PHP_INI_DIR/php.ini && \
    echo 'memory_limit = 512M' >> $PHP_INI_DIR/php.ini && \
    echo 'upload_max_filesize = 10M' >> $PHP_INI_DIR/php.ini && \
    echo 'post_max_size = 10M' >> $PHP_INI_DIR/php.ini && \
    a2enmod headers && \
    a2enmod rewrite && \
    a2enmod ssl && \
    rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install gd

RUN docker-php-ext-configure opcache --enable-opcache &&\
    docker-php-ext-install opcache
# Copy configuration
COPY config/opcache.ini $PHP_INI_DIR/conf.d/

RUN pecl install apcu &&\
    docker-php-ext-enable apcu

WORKDIR /var/www/html/
