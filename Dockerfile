# Etapa 1: Construção do backend (Node.js)
FROM node:18 AS backend

# Diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos do backend para o diretório do container
COPY ./backend/package*.json ./
COPY ./backend/tsconfig.json ./
COPY ./backend/src ./src


# Instala as dependências do backend
RUN npm install

# Compila o código TypeScript para JavaScript
RUN npx tsc

# Etapa 2: Servindo o frontend
FROM nginx:alpine AS frontend

# Copia o conteúdo estático do frontend para o nginx
COPY ./frontend /usr/share/nginx/html

# Etapa 3: Configuração final do container (backend + nginx)
FROM node:18

# Diretório de trabalho do container
WORKDIR /app

# Copia as dependências do backend e frontend para dentro do container
COPY --from=backend /app /app
COPY --from=frontend /usr/share/nginx/html /usr/share/nginx/html

# Expõe as portas
EXPOSE 3000 80

# Comando para iniciar o servidor Node.js
CMD ["npm", "run", "dev"]
