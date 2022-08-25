const router = require("koa-router")()
const { getUsers,deleteUser,createUser,login } = require('../../controller/users')

router.prefix('/api')

router.get('/getUsers',async (ctx,next) => {
	ctx.body = await getUsers()
})

router.post('/deleteUser',async (ctx,next) => {
	const { deleteIdStr } = ctx.request.body
	ctx.body = await deleteUser(deleteIdStr)
})

router.post('/createUser',async (ctx,next) => {
	const { username, password } = ctx.request.body
	ctx.body = await createUser({username, password})
})

//登录
router.post('/login', async (ctx, next) => {
	const { username, password } = ctx.request.body
	const result = await login(ctx,username, password)
	ctx.body = result
})

module.exports = router
