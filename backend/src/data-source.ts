import { DataSource } from "typeorm"
import 'dotenv/config'
import 'reflect-metadata'

const port = process.env.DB_PORT as number | undefined

// Certificado SSL (se necessário)
const sslCert = process.env.DB_SSL_CA ? Buffer.from(process.env.DB_SSL_CA, 'utf-8') : undefined;

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST, // Exemplo: mysql-3336d5e5-marcosdudu001-7177.d.aivencloud.com
    port: port || 12083, // Defina a porta para o banco em nuvem (12083)
    username: process.env.DB_USER, // Exemplo: avnadmin
    password: process.env.DB_PASSWORD, // Sua senha do banco de dados
    database: process.env.DB_DATABASE, // Exemplo: defaultdb
    entities: [`${__dirname}/**/entities/*.{ts,js}`],
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
    logging: true,
    ssl: sslCert ? { ca: sslCert } : true,  // Usando o certificado diretamente da variável
})
