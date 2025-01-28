FROM node:18 AS builder

WORKDIR /app

# Copia os arquivos package.json e package-lock.json para o diretório /app
COPY ./backend/package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o conteúdo do diretório backend para /app
COPY ./backend .

# Executa o build (se necessário)
RUN npm run build

FROM node:18

WORKDIR /app

# Copia os arquivos compilados do estágio builder
COPY --from=builder /app/dist /app/dist

# Copia os arquivos package.json e package-lock.json para o diretório /app
COPY ./backend/package*.json ./

# Instala apenas as dependências de produção
RUN npm install --only=production

# Instala o nodemon globalmente
RUN npm install -g nodemon

# Copia o frontend para o diretório /app/frontend
COPY ./frontend /app/frontend

# Expõe a porta 3000
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["nodemon", "--exec", "ts-node", "/app/src/index.ts"]