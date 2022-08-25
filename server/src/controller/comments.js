const { SuccessModel, ErrorModel } = require("../model/resModel")
const { 	_getComments, _deleteComments } = require("../service/comments")

const getComments = async () => {
	const result = await _getComments()
	return new SuccessModel({
		result
	})
}

const deleteComments = async ( deleteIdStr ) => {
	const _deleteIdStr = JSON.parse(deleteIdStr).join(",") //把数组字符串转化为数组后再转化为字符串，如"[1,2]" = "1,2"
	const result = await _deleteComments(_deleteIdStr)
	return new SuccessModel({
		result
	})
}



module.exports = {
	deleteComments,
	getComments
}
