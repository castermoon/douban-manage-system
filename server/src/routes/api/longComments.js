const router = require("koa-router")()
const { getLongComments,deleteLongComments } = require('../../controller/longComments')

router.prefix('/api')

router.get('/getLongComments',async (ctx,next) => {
	ctx.body = await getLongComments()
})



router.post('/deleteLongComments',async (ctx,next) => {
	const { deleteIdStr } = ctx.request.body
	ctx.body = await deleteLongComments(deleteIdStr)
})




module.exports = router
