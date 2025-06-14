FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libicu-dev \
    libzip-dev 

RUN docker-php-ext-install \
    pdo_mysql \
    intl \
    zip

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /var/www/html

# Copier le script d'entrée et le rendre exécutable
COPY docker/php/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

COPY symfony/ .

# Installation des dépendances pendant la construction de l'image
RUN composer install --no-interaction --optimize-autoloader --no-dev
RUN php bin/console cache:clear --env=prod

# Utiliser le script d'entrée comme point d'entrée
ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]

CMD ["php-fpm"]