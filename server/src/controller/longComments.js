const { SuccessModel, ErrorModel } = require("../model/resModel")
const { 	_getLongComments, _deleteLongComments } = require("../service/longComments")

const getLongComments = async () => {
	const result = await _getLongComments()
	return new SuccessModel({
		result
	})
}

const deleteLongComments = async ( deleteIdStr ) => {
	const _deleteIdStr = JSON.parse(deleteIdStr).join(",") //把数组字符串转化为数组后再转化为字符串，如"[1,2]" = "1,2"
	const result = await _deleteLongComments(_deleteIdStr)
	return new SuccessModel({
		result
	})
}



module.exports = {
	getLongComments,
	deleteLongComments
}
