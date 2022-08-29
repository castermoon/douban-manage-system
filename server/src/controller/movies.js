const { SuccessModel, ErrorModel } = require("../model/resModel")
const { _getMovieList,_deleteMovies,_createMovie } = require("../service/movies")

const getMovieList = async () => {
	const moviesList = await _getMovieList()
	return new SuccessModel({
		moviesList
	})
}

const deleteMovies = async ( deleteMoviesIdStr ) => {
	const _deleteMoviesIdStr = JSON.parse(deleteMoviesIdStr).join(",")
	const result = await _deleteMovies(_deleteMoviesIdStr)
	return new SuccessModel({
		result
	})
}

const createMovie = async ({ name,cover,type,web="",country,language,timeLen,anotherName="",indbLink="",score,brief,time }) => {
	const result = await _createMovie({name,cover,type,web,country,language,timeLen,anotherName,indbLink,score,brief,time})
	return new SuccessModel({
		result
	})
}

const updateMovie = async () => {
	const result = await _getMovieList()
	return new SuccessModel({
		result
	})
}

module.exports = {
	getMovieList,
	deleteMovies,
	createMovie,
	updateMovie
}
