const router = require("koa-router")()
const { getMovieList,deleteMovies,createMovie,updateMovie,addMovieRelation } = require('../../controller/movies')
const { loginCheck } = require("../../middlewares/loginChecks")

router.prefix('/api')

router.get('/getMovies',loginCheck,async (ctx,next) => {
	const { name } = ctx.request.query
	ctx.body = await getMovieList({name})
})

router.post('/deleteMovies',loginCheck,async (ctx,next) => {
	const { deleteIdsArr } = ctx.request.body
	ctx.body = await deleteMovies(deleteIdsArr)
})

router.post('/createMovie',loginCheck,async (ctx,next) => {
	const { name,cover,type,web,country,language,timeLen,anotherName,indbLink,score,brief,time } = ctx.request.body
	ctx.body = await createMovie({ name,cover,type,web,country,language,timeLen,anotherName,indbLink,score,brief,time })
})

router.post('/updateMovie',loginCheck,async (ctx,next) => {
	const { id,name,cover,type,web,country,language,timeLen,anotherName,indbLink,score,brief,time } = ctx.request.body
	ctx.body = await updateMovie({ id,name,cover,type,web,country,language,timeLen,anotherName,indbLink,score,brief,time })
})

router.post('/addMovieRelation',loginCheck,async (ctx,next) => {
	const { movie_id,celebrity_id,position } = ctx.request.body
	ctx.body = await addMovieRelation({ movie_id,celebrity_id,position } )
})

module.exports = router
