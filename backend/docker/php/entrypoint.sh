#!/bin/sh

# Installer les dépendances si vendor n'existe pas ou si composer.json a changé
if [ ! -d "vendor" ] || [ ! -e "vendor/.composer.json" ] || [ "composer.json" -nt "vendor/.composer.json" ]; then
  echo "📦 Installing Composer dependencies..."
  composer install
  # Créer un fichier caché pour suivre la dernière installation
  cp composer.json vendor/.composer.json
fi

# Exécuter la commande passée au conteneur
exec "$@"