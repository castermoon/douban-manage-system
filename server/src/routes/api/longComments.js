const router = require("koa-router")()
const { getLongComments,deleteLongComments,createLongComment,updateLongComment } = require('../../controller/longComments')
const { loginCheck } = require("../../middlewares/loginChecks")

router.prefix('/api')

router.get('/getLongComments',loginCheck,async (ctx,next) => {
	const { title } = ctx.request.query
	ctx.body = await getLongComments({ title })
})

router.post('/deleteLongComments',loginCheck,async (ctx,next) => {
	const { deleteIdsArr } = ctx.request.body
	ctx.body = await deleteLongComments(deleteIdsArr)
})

router.post('/createLongComment/',loginCheck,async (ctx,next) => {
	const { movie_id,user_id,content,score,title,spoiler,date } = ctx.request.body
	ctx.body = await createLongComment({ movie_id,user_id,content,score,title,spoiler,date })
})

router.post('/updateLongComment/',loginCheck,async (ctx,next) => {
	const { id,movie_id,user_id,content,score,title,spoiler,date } = ctx.request.body
	ctx.body = await updateLongComment({ id,movie_id,user_id,content,score,title,spoiler,date })
})

module.exports = router
