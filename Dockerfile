FROM node:18 AS builder

WORKDIR /app

COPY ./backend/package*.json ./backend/
COPY ./backend ./backend
RUN npm install
RUN npm run build

FROM node:18

WORKDIR /app

COPY --from=builder /app/dist /app/dist

COPY ./backend/package*.json ./
RUN npm install --only=production
RUN npm install -g nodemon

COPY ./frontend /app/frontend
RUN ls -R /app/backend

EXPOSE 3000

CMD ["nodemon", "--exec", "ts-node", "/app/backend/src/index.ts"]

