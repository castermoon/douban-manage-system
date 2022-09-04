const router = require("koa-router")()
const { getUsers,deleteUsers,createUser,updateUser,login } = require('../../controller/users')

router.prefix('/api')

router.get('/getUsers',async (ctx,next) => {
	const { username } = ctx.request.query
	ctx.body = await getUsers({ username })
})

router.post('/deleteUsers',async (ctx,next) => {
	const { deleteIdsArr } = ctx.request.body
	ctx.body = await deleteUsers({deleteIdsArr})
})

router.post('/createUser',async (ctx,next) => {
	const { username, password,nickname } = ctx.request.body
	ctx.body = await createUser({username, password,nickname})
})

router.post('/updateUser',async (ctx,next) => {
	const { id,username, password,nickname } = ctx.request.body
	ctx.body = await updateUser({id,username, password,nickname})
})

//登录
router.post('/login', async (ctx, next) => {
	const { username, password } = ctx.request.body
	ctx.body = await login({ctx,username, password})
})

module.exports = router
