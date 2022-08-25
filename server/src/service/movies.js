const { exec } = require("../db/mysql");

const _getMovieList = async () => {
	let sql = `select * from movies;`
	return await exec(sql)
}

const _deleteMovies = async (_deleteMoviesIdStr) => {
	let sql = `DELETE FROM movies WHERE id in(${_deleteMoviesIdStr});`
	return await exec(sql)
}

const _createMovie = async ({name,cover,type,web,country,language,timeLen,anotherName,indbLink,score,brief,time}) => {
	let sql = `insert into movies(\`name\`,cover,\`type\`,web,country,\`language\`,timeLen,anotherName,score,brief,\`time\`) values('${name}','${cover}','${type}','${web}','${country}','${language}',${timeLen},'${anotherName}',${score},'${brief}','${time}');`
	const insertData = await exec(sql)
	return{
		id: insertData.insertId
	}
}

const _updateMovie = async () => {
	let sql = `select * from movies;`
	return await exec(sql)
}


module.exports = {
	_getMovieList,
	_deleteMovies,
	_createMovie,
	_updateMovie
}
