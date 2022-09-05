const { SuccessModel, ErrorModel } = require("../model/resModel")
const { _getMovieList,_deleteMovies,_createMovie,_updateMovie,_addMovieRelation } = require("../service/movies")
const {relationError} = require("../model/ErrorInfo");

const getMovieList = async ({name}) => {
	const moviesList = await _getMovieList({name})
	return new SuccessModel({
		moviesList
	})
}

const deleteMovies = async ( deleteIdsArr ) => {
	const deleteIdsStr = deleteIdsArr.join(",")
	const result = await _deleteMovies(deleteIdsStr)
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

const updateMovie = async ( { id,name,cover,type,web,country,language,timeLen,anotherName,indbLink,score,brief,time }) => {
	const result = await _updateMovie({ id,name,cover,type,web,country,language,timeLen,anotherName,indbLink,score,brief,time })
	return new SuccessModel({
		result
	})
}
const addMovieRelation = async ({ movie_id,celebrity_id,position }) => {
		const result = await _addMovieRelation({ movie_id,celebrity_id,position })
		return new SuccessModel(result)
}



module.exports = {
	getMovieList,
	deleteMovies,
	createMovie,
	updateMovie,
	addMovieRelation
}
