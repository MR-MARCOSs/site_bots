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

# Etapa 2: Copiar o frontend para o container do Node.js
FROM node:18

# Diretório de trabalho do container
WORKDIR /app

# Copia as dependências do backend e frontend para dentro do container
COPY --from=backend /app /app
COPY ./frontend /app/frontend

# Expõe as portas
EXPOSE 3000

# Comando para iniciar o servidor Node.js
CMD ["npm", "run", "dev"]