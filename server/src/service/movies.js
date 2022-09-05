const { exec } = require("../db/mysql");

const _getMovieList = async ({name}) => {
	let sql
	if(name){
		sql = `SELECT * FROM movies WHERE \`name\` LIKE '%${name}%';`
	}else {
		sql = `select * from movies;`
	}
	return await exec(sql)
}

const _deleteMovies = async (deleteIdsStr) => {
	let sql = `DELETE FROM movies WHERE id in(${deleteIdsStr});`
	return await exec(sql)
}

const _createMovie = async ({name,cover,type,web,country,language,timeLen,anotherName,indbLink,score,brief,time}) => {
	let sql = `insert into movies(\`name\`,cover,\`type\`,web,country,\`language\`,timeLen,anotherName,score,brief,\`time\`) values('${name}','${cover}','${type}','${web}','${country}','${language}',${timeLen},'${anotherName}',${score},'${brief}','${time}');`
	const insertData = await exec(sql)
	return{
		id: insertData.insertId
	}
}

const _updateMovie = async ( { id,name,cover,type,web,country,language,timeLen,anotherName,indbLink,score,brief,time }) => {
	let sql = `UPDATE movies SET \`name\`='${name}',cover='${cover}',\`type\`='${type}',web='${web}',
  country='${country}',\`language\`='${language}',timeLen=${timeLen},anotherName='${anotherName}',score=${score},
  brief='${brief}',\`time\`='${time}',indbLink='${indbLink}'
  WHERE id=${id};`
	return await exec(sql)
}

const _addMovieRelation = async ({ movie_id,celebrity_id,position }) => {
	let sql = `insert into movie_celebrity(celebrity_id,movie_id,position) values(${celebrity_id},${movie_id},'${position}');`
	return await exec(sql)
}

module.exports = {
	_getMovieList,
	_deleteMovies,
	_createMovie,
	_updateMovie,
	_addMovieRelation
}
