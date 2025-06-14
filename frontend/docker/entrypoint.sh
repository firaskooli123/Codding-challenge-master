#!/bin/sh

# Installer les dépendances si node_modules n'existe pas ou si package.json a changé
if [ ! -d "node_modules" ] || [ ! -e "node_modules/.package-lock.json" ] || [ "package.json" -nt "node_modules/.package-lock.json" ]; then
  echo "📦 Installing dependencies..."
  npm install
  # Créer un fichier caché pour suivre la dernière installation
  cp package-lock.json node_modules/.package-lock.json
fi

# Exécuter la commande passée au conteneur
exec "$@"