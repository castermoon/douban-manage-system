const { exec } = require("../db/mysql");

const _getComments = async () => {
	let sql = `select * from comments;`
	return await exec(sql)
}

const _deleteComments = async (_deleteIdStr) => {
	let sql = `DELETE FROM comments WHERE id in(${_deleteIdStr});`
	return await exec(sql)
}



module.exports = {
	_getComments,
	_deleteComments
}
