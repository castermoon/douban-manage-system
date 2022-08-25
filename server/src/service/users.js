const { exec } = require("../db/mysql");

const _checkUserName = async (username) => {
	const sql = `SELECT id FROM users WHERE username='${username}';`
	const rows = await exec(sql)
	return rows[0] || null
}

const _getUsers = async () => {
	let sql = `SELECT * FROM users;`
	return await exec(sql)
}

const _deleteUsers = async (_deleteIdStr) => {
	let sql = `DELETE FROM users WHERE id in(${_deleteIdStr});`
	return await exec(sql)
}

const _createUsers = async ({username,password}) => {
	const sql = `insert into users(userName,\`password\`,nickName) values('${username}','${password}','${username}');`
	const insertData = await exec(sql)
	return{
		id: insertData.insertId
	}
}

const _login = async ({username,password}) => {
	const sql = `select id,username,nickname from users where username=${username} and \`password\`='${password}'`
	const rows = await exec(sql)
	return rows[0] || null
}





module.exports = {
	_getUsers,
	_deleteUsers,
	_createUsers,
	_checkUserName,
	_login
}
