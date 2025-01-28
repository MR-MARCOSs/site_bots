# Etapa 1: Construção da imagem para o backend
FROM node:18 AS builder

# Definir diretório de trabalho no container
WORKDIR /app

# Copiar o package.json e o package-lock.json (caso tenha)
COPY ./backend/package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante dos arquivos do backend (incluindo o código-fonte TypeScript)
COPY ./backend /app

# Instalar dependências de produção (pode ser usado se você tiver devDependencies)
RUN npm install --only=production

# Instalar o TypeScript globalmente
RUN npm install -g typescript

# Compilar o TypeScript (assumindo que o tsconfig.json está corretamente configurado)
RUN tsc

# Etapa 2: Configuração para rodar o backend com o frontend
FROM node:18

# Definir diretório de trabalho
WORKDIR /app

# Copiar apenas os arquivos necessários do container "builder"
COPY --from=builder /app /app

# Copiar a pasta do frontend para dentro do container
COPY ./frontend /app/frontend

# Expor a porta onde o backend vai rodar
EXPOSE 3000

# Rodar o comando para iniciar o servidor, como você faria localmente
CMD ["npm", "run", "dev"]
