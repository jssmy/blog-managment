FROM node:22.0 as builder


WORKDIR /app

# se copia las dependencias
COPY package.json ./


# se insala las dependencias
RUN npm install


#se copia el codigo fuente
COPY . ./

# se ace build del codigo fuente
RUN npm run build


FROM node:22.0 as delivery

WORKDIR /app

COPY --from=builder /app/package*.json ./

RUN npm install

COPY --from=builder /app/dist ./dist


ENV NODE_ENV production

EXPOSE 3001

CMD [ "node", "dist/main" ]







