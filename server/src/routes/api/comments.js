const router = require("koa-router")()
const { getComments,deleteComments,createComment,updateComment } = require('../../controller/comments')
const { loginCheck } = require("../../middlewares/loginChecks")
router.prefix('/api')

router.get('/getComments',async (ctx,next) => {
	const { content } = ctx.request.query
	ctx.body = await getComments({content})
})

router.post('/deleteComments',async (ctx,next) => {
	const { deleteIdsArr } = ctx.request.body
	ctx.body = await deleteComments({deleteIdsArr})
})

router.post('/createComment',async (ctx,next) => {
	const { content,date,score,user_id,movie_id,status,labelList,onlyMe,isShare } = ctx.request.body
	ctx.body = await createComment({ content,date,score,user_id,movie_id,status,labelList,onlyMe,isShare } )
})

router.post('/updateComment',async (ctx,next) => {
	const { id,content,date,score,user_id,movie_id,status,labelList,onlyMe,isShare } = ctx.request.body
	ctx.body = await updateComment({ id,content,date,score,user_id,movie_id,status,labelList,onlyMe,isShare })
})

module.exports = router
