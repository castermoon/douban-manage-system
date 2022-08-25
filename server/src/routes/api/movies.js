const router = require("koa-router")()
const { getMovieList,deleteMovies,createMovie,updateMovie } = require('../../controller/movies')

router.prefix('/api')

router.get('/getMovies',async (ctx,next) => {
	ctx.body = await getMovieList()
})


router.post('/deleteMovies',async (ctx,next) => {
	const { deleteMoviesIdStr } = ctx.request.body
	ctx.body = await deleteMovies(deleteMoviesIdStr)
})

router.post('/createMovie',async (ctx,next) => {
	const { name,cover,type,web,country,language,timeLen,anotherName,indbLink,score,brief,time } = ctx.request.body
	ctx.body = await createMovie({ name,cover,type,web,country,language,timeLen,anotherName,indbLink,score,brief,time })
})

// router.post('/updateMovie',async (ctx,next) => {
// 	const { movieId,content,score,status,labelList,onlyMe,isShare } = ctx.request.body
// 	ctx.body = await updateMovie()
// })

module.exports = router
