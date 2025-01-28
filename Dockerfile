# Etapa 1: Construção da imagem para o backend
FROM node:18 AS builder

WORKDIR /app

# Copiar o package.json e o package-lock.json da pasta backend
COPY ./backend/package*.json ./

# Instalar as dependências
RUN npm install

# Copiar todos os arquivos do backend para /app
COPY ./backend /app

# Verificar se o arquivo index.ts foi copiado corretamente
RUN ls -R /app/backend/src

# Compilar o TypeScript
RUN npm run build  # Certifique-se de que você tenha um script "build" no package.json que rode "tsc"

# Etapa 2: Configuração para rodar o backend com o frontend
FROM node:18

WORKDIR /app

# Copiar apenas os arquivos compilados do container "builder"
COPY --from=builder /app/dist /app/dist

# Copiar o package.json e o package-lock.json para o novo contêiner
COPY ./backend/package*.json ./

# Instalar as dependências
RUN npm install

# Instalar nodemon globalmente
RUN npm install -g nodemon

# Copiar a pasta do frontend para dentro do container
COPY ./frontend /app/frontend

# Expor a porta onde o backend vai rodar
EXPOSE 3000

# Rodar o comando para iniciar o servidor
CMD ["nodemon", "--exec", "ts-node", "/app/backend/src/index.ts"]
