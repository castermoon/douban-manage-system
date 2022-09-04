const { exec } = require("../db/mysql");

const _getCelebrity = async ({name}) => {
	let sql
	if(name){
		sql = `SELECT * FROM celebritys WHERE \`name\` LIKE '%${name}%';`
	}else {
		sql = `select * from celebritys;`
	}
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

const _updateCelebrity = async ( { id,name,icon,sex,constellation,birth,vocation,anotherName,anotherChineseName,indbLink,web,desc }) => {
	let sql = `UPDATE celebritys SET \`name\`='${name}',icon='${icon}',sex=${sex},constellation='${constellation}',birth='${birth}',
	vocation='${vocation}',anotherName='${anotherName}',indbLink='${indbLink}',web='${web}',
	\`desc\`='${desc}',anotherChineseName='${anotherChineseName}'
	WHERE id=${id};`
	return await exec(sql)
}


module.exports = {
	_getCelebrity,
	_deleteCelebrity,
	_createCelebrity,
	_updateCelebrity
}
