const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const { REDIS_CONF } = require('./conf/db')


const movies = require('./routes/api/movies')
const celebrity = require('./routes/api/celebrity')
const comments = require('./routes/api/comments')
const longComments = require('./routes/api/longComments')
const users = require('./routes/api/users')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

//session配置
app.keys = ['WJiol#23123_']
app.use(session({
  key: 'douban.sid', //cookie name默认是`douban.sid`
  prefix: 'douban:sess:', //redis key 的前缀，默认是`douban:sess:`
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  //配置redis
  store: redisStore({
    all:`${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// routes
app.use(movies.routes(), movies.allowedMethods())
app.use(celebrity.routes(), movies.allowedMethods())
app.use(comments.routes(), comments.allowedMethods())
app.use(longComments.routes(), longComments.allowedMethods())
app.use(users.routes(), users.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
