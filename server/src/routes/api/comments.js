const router = require("koa-router")()
const { getComments,deleteComments } = require('../../controller/comments')

router.prefix('/api')

router.get('/getComments',async (ctx,next) => {
	ctx.body = await getComments()
})

router.post('/deleteComments',async (ctx,next) => {
	const { deleteIdStr } = ctx.request.body
	ctx.body = await deleteComments(deleteIdStr)
})




module.exports = router
