const router = require("koa-router")()
const { getCelebrity,deleteCelebrity,createCelebrity, updateCelebrity} = require('../../controller/celebrity')
const { loginCheck } = require("../../middlewares/loginChecks")
router.prefix('/api')

router.get('/getCelebrity',loginCheck,async (ctx,next) => {
	const { name } = ctx.request.query
	ctx.body = await getCelebrity({name})
})

router.post('/deleteCelebrity',loginCheck,async (ctx,next) => {
	const { deleteIdsArr } = ctx.request.body
	ctx.body = await deleteCelebrity(deleteIdsArr)
})

router.post('/createCelebrity',loginCheck,async (ctx,next) => {
	const { name,icon,sex,constellation,birth,vocation,anotherName,desc } = ctx.request.body
	ctx.body = await createCelebrity({ name,icon,sex,constellation,birth,vocation,anotherName,desc })
})

router.post('/updateCelebrity',loginCheck,async (ctx,next) => {
	const { id,name,icon,sex,constellation,birth,vocation,anotherName,anotherChineseName,indbLink,web,desc } = ctx.request.body
	ctx.body = await updateCelebrity({ id,name,icon,sex,constellation,birth,vocation,anotherName,anotherChineseName,indbLink,web,desc })
})


module.exports = router
