FROM nginx:1.27-alpine

# Copiar configuración personalizada
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Crear directorio para Let's Encrypt challenges
RUN mkdir -p /var/www/certbot

# Exponer puertos
EXPOSE 80 3001

# Healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]

