# Backend Challenge - API Proxy pour Innosabi

Ce projet est une API proxy qui permet d'accéder aux suggestions de l'API Innosabi sans authentification.

## Prérequis

- Docker
- Docker Compose
- PHP 8.2 (pour le développement local)
- Composer (pour le développement local)

## Installation

1. Clonez le repository
2. Naviguez vers le dossier du projet
3. Lancez les conteneurs Docker :

```bash
docker-compose up -d --build
```

### Installation pour le Développement Local

1. Installez les dépendances :
```bash
composer install
```

2. Configurez les variables d'environnement :
- Copiez `.env` en `.env.local`
- Modifiez les valeurs selon votre environnement

## Utilisation

L'API est accessible à l'adresse : `http://localhost:8080/api/suggestion`

Vous pouvez utiliser les paramètres de requête suivants :
- include
- filter
- order
- limit
- page

Exemple :
```
http://localhost:8080/api/suggestion?limit=10&page=1
```

## Structure du Projet

- `docker/` - Configurations Docker
  - `nginx/` - Configuration du serveur web Nginx
  - `php/` - Configuration PHP-FPM
  - `src/`
    - `Controller/` - Contrôleurs de l'application
    - `Service/` - Services métier
      - `InnosabiApiClient.php` - Client pour l'API Innosabi
      - `RequestParamValidator.php` - Validation des paramètres de requête
    - `Exception/` - Exceptions personnalisées
  - `tests/` - Tests unitaires
    - `Service/` - Tests des services
      - `InnosabiApiClientTest.php`
      - `RequestParamValidatorTest.php`

## Tests

Le projet utilise PHPUnit pour les tests unitaires. Pour exécuter les tests :

```bash
php bin/phpunit
```

Les tests couvrent :
- La validation des paramètres de requête
- Les appels à l'API Innosabi
- La gestion des erreurs

## Environnement de Développement

Le projet utilise :
- PHP 8.2
- Nginx
- Symfony 6.0
- PHPUnit pour les tests

## Sécurité

L'API proxy :
- Valide tous les paramètres de requête
- Gère les erreurs de manière sécurisée
- Cache les identifiants de l'API Innosabi
