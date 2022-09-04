const { exec } = require("../db/mysql");

const _getLongComments = async ({title}) => {
	let sql
	if(title){
		sql = `SELECT * FROM longcomments WHERE title LIKE '%${title}%';`
	}else {
		sql = `select * from longcomments;`
	}
	return await exec(sql)
}

const _deleteLongComments = async (_deleteIdStr) => {
	let sql = `DELETE FROM longcomments WHERE id in(${_deleteIdStr});`
	return await exec(sql)
}

const _createLongComment = async ({ movie_id,user_id,content,score,title,spoiler,date }) => {
	let sql = `insert into longcomments(content,\`date\`,score,user_id,movie_id,spoiler,title) values('${content}','${date}',${score},${user_id},${movie_id},${spoiler},'${title}');`
	const insertData = await exec(sql)
	return{
		id: insertData.insertId
	}
}

const _updateLongComment = async ({ id,movie_id,user_id,content,score,title,spoiler,date }) => {
	let sql = `UPDATE longcomments SET user_id=${user_id},movie_id=${movie_id},content='${content}',score=${score},title='${title}',
	spoiler=${spoiler},\`date\`=${date}
  WHERE id=${id};`
	return await exec(sql)
}

module.exports = {
	_getLongComments,
	_deleteLongComments,
	_createLongComment,
	_updateLongComment
}
