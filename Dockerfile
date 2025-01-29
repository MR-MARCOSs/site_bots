FROM node:18

WORKDIR /app

COPY ./backend/package*.json ./
COPY ./backend/tsconfig.json ./
COPY ./backend/src ./src
COPY ./frontend ./frontend  # Copia a pasta frontend diretamente

RUN npm install

RUN npx tsc

# Copia o conteúdo estático do frontend para a pasta pública do backend
RUN cp -r ./frontend/public ./dist/public 
RUN cp -r ./frontend/private ./dist/private

EXPOSE 3000

CMD ["node", "dist/src/server.ts"] # Inicia o servidor de produção