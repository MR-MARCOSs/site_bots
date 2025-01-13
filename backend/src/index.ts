import express from 'express'
import { AppDataSource } from './data-source'
import routes from './routes'
const cors = require('cors');
  // Importando o pacote cors

AppDataSource.initialize().then(() => {
    const app = express()

    // Habilitar o CORS para todas as origen
    app.use(cors())

    app.use(express.json())

    app.use(routes)

    // Definir a porta
    const port = process.env.PORT || 3000
    return app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`)
    })
})
