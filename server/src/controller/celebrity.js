const { SuccessModel, ErrorModel } = require("../model/resModel")
const { _getCelebrity,_deleteCelebrity,_createCelebrity,_updateCelebrity } = require("../service/celebrity")
const {_updateMovie} = require("../service/movies");

const getCelebrity = async ({name}) => {
	const result = await _getCelebrity({name})
	return new SuccessModel({
		result
	})
}

const deleteCelebrity = async ( deleteIdsArr ) => {
	const deleteIdsStr = deleteIdsArr.join(",")
	const result = await _deleteCelebrity(deleteIdsStr)
	return new SuccessModel({
		result
	})
}

const createCelebrity = async ({ name,icon,sex,constellation="",birth,vocation="",anotherName="",desc }) => {
	const result = await _createCelebrity({name,icon,sex,constellation,birth,vocation,anotherName,desc})
	return new SuccessModel({
		result
	})
}


const updateCelebrity = async ( { id,name,icon,sex,constellation,birth,vocation,anotherName,anotherChineseName,indbLink,web,desc }) => {
	const result = await _updateCelebrity({  id,name,icon,sex,constellation,birth,vocation,anotherName,anotherChineseName,indbLink,web,desc })
	return new SuccessModel({
		result
	})
}


module.exports = {
	getCelebrity,
	deleteCelebrity,
	createCelebrity,
	updateCelebrity
}
