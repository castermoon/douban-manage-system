const { exec } = require("../db/mysql");

const _getLongComments = async () => {
	let sql = `select * from longcomments;`
	return await exec(sql)
}

const _deleteLongComments = async (_deleteIdStr) => {
	let sql = `DELETE FROM longcomments WHERE id in(${_deleteIdStr});`
	return await exec(sql)
}



module.exports = {
	_getLongComments,
	_deleteLongComments
}
