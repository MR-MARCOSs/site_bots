
FROM node:18 AS builder

WORKDIR /app

COPY ./backend/package*.json ./

RUN npm install

COPY ./backend /app

RUN npm run build  

FROM node:18

WORKDIR /app

COPY --from=builder /app/dist /app/dist

COPY ./backend/package*.json ./

RUN npm install

COPY ./frontend /app/frontend

EXPOSE 3000

CMD ["npm", "run", "dev", "--prefix", "."]
