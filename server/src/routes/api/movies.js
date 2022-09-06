const router = require("koa-router")()
const {
	getMovieList,
	deleteMovies,
	createMovie,
	updateMovie,
	createMovieRelation,
	getMovieRelation,
	deleteMovieRelation,
	updateMovieRelation
} = require('../../controller/movies')
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

router.get('/getMovieRelation',loginCheck,async (ctx,next) => {
	const { movie_id,celebrity_id } = ctx.request.query
	ctx.body = await getMovieRelation({ movie_id,celebrity_id })
})

router.post('/deleteMovieRelation',loginCheck,async (ctx,next) => {
	const { deleteIdsArr } = ctx.request.body
	ctx.body = await deleteMovieRelation({ deleteIdsArr } )
})

router.post('/createMovieRelation',loginCheck,async (ctx,next) => {
	const { movie_id,celebrity_id,position } = ctx.request.body
	ctx.body = await createMovieRelation({ movie_id,celebrity_id,position })
})

router.post('/updateMovieRelation',loginCheck,async (ctx,next) => {
	const { id,position,movie_id,celebrity_id  } = ctx.request.body
	ctx.body = await updateMovieRelation({ id,position,movie_id,celebrity_id } )
})

module.exports = router
