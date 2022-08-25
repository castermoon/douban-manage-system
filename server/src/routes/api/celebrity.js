const router = require("koa-router")()
const { getCelebrity,deleteCelebrity,createCelebrity } = require('../../controller/celebrity')

router.prefix('/api')

router.get('/getCelebrity',async (ctx,next) => {
	ctx.body = await getCelebrity()
})

router.post('/deleteCelebrity',async (ctx,next) => {
	const { deleteCelebrityIdStr } = ctx.request.body
	ctx.body = await deleteCelebrity(deleteCelebrityIdStr)
})

router.post('/createCelebrity',async (ctx,next) => {
	const { name,icon,sex,constellation,birth,vocation,anotherName,desc } = ctx.request.body
	ctx.body = await createCelebrity({ name,icon,sex,constellation,birth,vocation,anotherName,desc })
})


module.exports = router
