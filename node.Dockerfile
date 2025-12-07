# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Copiar archivos de dependencias (mejor cacheo)
COPY package.json package-lock.json* ./

# Instalar todas las dependencias para el build
RUN npm ci && \
    npm cache clean --force

# Copiar código fuente
COPY tsconfig*.json ./
COPY src ./src

# Build y limpiar
RUN npm run build && \
    rm -rf src node_modules tsconfig*.json

# Stage 2: Production - Solo lo esencial
FROM node:22-alpine AS production

WORKDIR /app

# Crear usuario no-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Copiar package files
COPY --from=builder /app/package*.json ./

# Instalar solo producción
RUN npm ci --only=production --no-audit --no-fund && \
    npm cache clean --force

# Copiar código compilado
COPY --chown=nodejs:nodejs --from=builder /app/dist ./dist

# Limpiar archivos innecesarios de node_modules para reducir tamaño de imagen
RUN apk add --no-cache findutils && \
    find node_modules -type d \( -name "test" -o -name "tests" -o -name "__tests__" -o -name "examples" -o -name "example" \) -exec rm -rf {} + 2>/dev/null || true && \
    find node_modules -type f \( -name "*.md" -o -name "*.txt" -o -name "CHANGELOG*" -o -name "LICENSE*" -o -name "README*" -o -name ".eslintrc*" -o -name ".prettierrc*" -o -name "*.test.js" -o -name "*.spec.js" \) -delete 2>/dev/null || true && \
    apk del findutils && \
    rm -rf /tmp/* /var/cache/apk/*

ENV NODE_ENV=production \
    PORT=3001

EXPOSE 3001

USER nodejs

HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3001/api', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})" || exit 1

CMD ["node", "dist/main"]








