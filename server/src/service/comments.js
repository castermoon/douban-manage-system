const { exec } = require("../db/mysql");

const _getComments = async ({content}) => {
	let sql
	if(content){
		sql = `SELECT * FROM comments WHERE content LIKE '%${content}%';`
	}else {
		sql = `select * from comments;`
	}
	return await exec(sql)
}

const _deleteComments = async ({deleteIdStr}) => {
	let sql = `DELETE FROM comments WHERE id in(${deleteIdStr});`
	return await exec(sql)
}

const _createComment = async ({ content,date,score,user_id,movie_id,status,labelList,onlyMe,isShare}) => {
	let sql = `INSERT INTO comments(content,\`date\`,score,user_id,movie_id,\`status\`,labelList,onlyMe,isShare)
	VALUES('${content}',${date},${score},${user_id},${movie_id},${status},'${labelList}',${onlyMe},${isShare});`
	const insertData = await exec(sql)
	return{
		id: insertData.insertId
	}
}

const _updateComment = async ( { id,content,date,score,user_id,movie_id,status,labelList,onlyMe,isShare}) => {
	let sql = `UPDATE comments SET content='${content}',\`date\`='${date}',score=${score},user_id=${user_id},movie_id=${movie_id},
	status=${status},labelList='${labelList}',onlyMe=${onlyMe},isShare=${isShare}
	WHERE id=${id};`
	return await exec(sql)
}

module.exports = {
	_getComments,
	_deleteComments,
	_createComment,
	_updateComment
}
