const { SuccessModel, ErrorModel } = require("../model/resModel")
const { _getCelebrity,_deleteCelebrity,_createCelebrity } = require("../service/celebrity")

const getCelebrity = async () => {
	const result = await _getCelebrity()
	return new SuccessModel({
		result
	})
}

const deleteCelebrity = async ( deleteCelebrityIdStr ) => {
	const _deleteCelebrityIdStr = JSON.parse(deleteCelebrityIdStr).join(",") //把数组字符串转化为数组后再转化为字符串，如"[1,2]" = "1,2"
	const result = await _deleteCelebrity(_deleteCelebrityIdStr)
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



module.exports = {
	getCelebrity,
	deleteCelebrity,
	createCelebrity
}
