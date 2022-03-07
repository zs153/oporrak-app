import logger from 'morgan'
import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'path'
// import rutas
import mainRouter from './routes/main.router'
import adminRouter from './routes/admin.router'
import loginRouter from './routes/login.router'
import usuarioRouter from './routes/usuario.router'
import tipoRouter from './routes/tipo.router'
import oficinaRouter from './routes/oficina.router'
import formularioRouter from './routes/formulario.router'
import fraudeRouter from './routes/fraude.router'
import smsRouter from './routes/sms.router'

const app = express()

// view engine setup
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '/public')))

// routes
app.use('/', mainRouter)
app.use('/admin', adminRouter)
app.use('/admin', usuarioRouter)
app.use('/admin', tipoRouter)
app.use('/admin', oficinaRouter)
app.use('/admin', formularioRouter)
app.use('/admin', fraudeRouter)
app.use('/admin', smsRouter)
app.use('/log', loginRouter)

export default app
