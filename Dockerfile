# Etapa 1: Construção da imagem para o backend
FROM node:18 AS builder

# Definir diretório de trabalho no container para a pasta backend
WORKDIR /app

# Copiar o package.json e o package-lock.json (caso tenha) da pasta backend
COPY ./backend/package*.json ./

# Instalar dependências de desenvolvimento
RUN npm install

# Copiar o restante dos arquivos do backend (incluindo o código-fonte TypeScript)
COPY ./backend /app

# Compilar o TypeScript
RUN npm run build  # Certifique-se de que você tenha um script "build" no package.json que rode "tsc"

# Etapa 2: Configuração para rodar o backend com o frontend
FROM node:18

# Definir diretório de trabalho
WORKDIR /app

# Copiar apenas os arquivos compilados do container "builder"
COPY --from=builder /app/dist /app/dist

# Copiar o package.json e o package-lock.json para o novo contêiner
COPY ./backend/package*.json ./backend/

# Instalar as dependências de produção
RUN npm install --only=production

# Copiar a pasta do frontend para dentro do container
COPY ./frontend /app/frontend

# Expor a porta onde o backend vai rodar
EXPOSE 3000

# Rodar o comando para iniciar o servidor
CMD ["npm", "run", "dev", "--prefix", "backend"]
