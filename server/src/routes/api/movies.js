const router = require("koa-router")()
const { getMovieList,deleteMovies,createMovie,updateMovie } = require('../../controller/movies')

router.prefix('/api')

router.get('/getMovies',async (ctx,next) => {
	const { name } = ctx.request.query
	ctx.body = await getMovieList({name})
})


router.post('/deleteMovies',async (ctx,next) => {
	const { deleteIdsArr } = ctx.request.body
	ctx.body = await deleteMovies(deleteIdsArr)
})

router.post('/createMovie',async (ctx,next) => {
	const { name,cover,type,web,country,language,timeLen,anotherName,indbLink,score,brief,time } = ctx.request.body
	ctx.body = await createMovie({ name,cover,type,web,country,language,timeLen,anotherName,indbLink,score,brief,time })
})

router.post('/updateMovie',async (ctx,next) => {
	const { id,name,cover,type,web,country,language,timeLen,anotherName,indbLink,score,brief,time } = ctx.request.body
	ctx.body = await updateMovie({ id,name,cover,type,web,country,language,timeLen,anotherName,indbLink,score,brief,time })
})

module.exports = router
