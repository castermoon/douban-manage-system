const { exec } = require("../db/mysql");

const _getCelebrity = async () => {
	let sql = `select * from celebritys;`
	return await exec(sql)
}

const _deleteCelebrity = async (_deleteCelebrityIdStr) => {
	let sql = `DELETE FROM celebritys WHERE id in(${_deleteCelebrityIdStr});`
	return await exec(sql)
}

const _createCelebrity = async ({ name,icon,sex,constellation,birth,vocation,anotherName,desc }) => {
	let sql = `INSERT INTO celebritys(\`name\`,icon,sex,constellation,birth,vocation,anotherName,\`desc\`)VALUES('${name}','${icon}',${sex},'${constellation}','${birth}','${vocation}','${anotherName}','${desc}');`
	const insertData = await exec(sql)
	return{
		id: insertData.insertId
	}
}



module.exports = {
	_getCelebrity,
	_deleteCelebrity,
	_createCelebrity,
}
