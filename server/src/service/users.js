const { exec } = require("../db/mysql");

const _checkUserName = async (username) => {
	const sql = `SELECT id FROM users WHERE username='${username}';`
	const rows = await exec(sql)
	return rows[0] || null
}

const _getUsers = async ({ username }) => {
	let sql
	if(username){
		sql = `SELECT * FROM users WHERE username LIKE '%${username}%';`
	}else {
		sql = `select * from users;`
	}
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

const _updateUser = async ({id,username,nickname,password}) => {
	let sql = `UPDATE users SET username='${username}',nickname='${nickname}',password='${password}'
	WHERE id=${id};`
	return await exec(sql)
}


const _login = async ({username,password}) => {
	const sql = `select id,username,nickname from users where username='${username}' AND \`password\`='${password}'`
	const rows = await exec(sql)
	return rows[0] || null
}






module.exports = {
	_getUsers,
	_deleteUsers,
	_createUsers,
	_updateUser,
	_checkUserName,
	_login
}
