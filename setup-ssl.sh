#!/bin/bash

# Script para configurar certificados SSL con Let's Encrypt para blog-managment
# Uso: ./setup-ssl.sh <email> <dominio>

set -e

EMAIL=${1:-""}
DOMAIN=${2:-"bugzilo.com"}

if [ -z "$EMAIL" ]; then
    echo "Error: Se requiere un email"
    echo "Uso: ./setup-ssl.sh tu-email@example.com bugzilo.com"
    exit 1
fi

echo "================================================"
echo "Configurando SSL para $DOMAIN"
echo "Email: $EMAIL"
echo "================================================"

# Verificar que certbot esté instalado
if ! command -v certbot &> /dev/null; then
    echo "❌ Certbot no está instalado."
    echo ""
    echo "Para instalarlo:"
    echo "  Ubuntu/Debian: sudo apt install certbot"
    echo "  macOS: brew install certbot"
    echo "  CentOS/RHEL: sudo yum install certbot"
    exit 1
fi

echo ""
echo "✅ Certbot está instalado"
echo ""

# Obtener certificado
echo "📜 Solicitando certificado SSL de Let's Encrypt..."
echo ""
echo "Nota: Asegúrate de que:"
echo "  1. El dominio $DOMAIN apunte a la IP de este servidor"
echo "  2. Los puertos 80 y 443 estén abiertos en el firewall"
echo ""
read -p "¿Continuar? (s/n): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Ss]$ ]]; then
    echo "Operación cancelada"
    exit 1
fi

# Obtener certificado usando standalone mode
sudo certbot certonly \
    --standalone \
    --preferred-challenges http \
    --email "$EMAIL" \
    --agree-tos \
    --no-eff-email \
    -d "$DOMAIN" \
    -d "www.$DOMAIN"

if [ $? -eq 0 ]; then
    echo ""
    echo "================================================"
    echo "✅ Certificado SSL obtenido exitosamente!"
    echo "================================================"
    echo ""
    echo "Ubicación de certificados:"
    echo "  Certificado: /etc/letsencrypt/live/$DOMAIN/fullchain.pem"
    echo "  Clave privada: /etc/letsencrypt/live/$DOMAIN/privkey.pem"
    echo ""
    echo "Siguiente paso:"
    echo "  docker-compose up -d --build"
    echo ""
    echo "El certificado se renovará automáticamente cada 90 días."
    echo "Para renovar manualmente: sudo certbot renew"
else
    echo ""
    echo "❌ Error al obtener el certificado"
    echo "Verifica que el dominio apunte correctamente y los puertos estén abiertos"
    exit 1
fi

