const { SuccessModel, ErrorModel } = require("../model/resModel")
const { 	_getLongComments, _deleteLongComments,_createLongComment,_updateLongComment } = require("../service/longComments")

const getLongComments = async ({ title }) => {
	const result = await _getLongComments({ title })
	return new SuccessModel({
		result
	})
}

const deleteLongComments = async ( deleteIdsArr ) => {
	const deleteIdsStr = deleteIdsArr.join(",")
	const result = await _deleteLongComments(deleteIdsStr)
	return new SuccessModel({
		result
	})
}

const createLongComment = async ( {movie_id,user_id,content,score,title,spoiler,date } ) => {
	const result = await _createLongComment({ movie_id,user_id,content,score,title,spoiler,date })
	return new SuccessModel({
		result
	})
}

const updateLongComment = async ({ id,movie_id,user_id,content,score,title,spoiler,date } ) => {
	const result = await _updateLongComment({ id,movie_id,user_id,content,score,title,spoiler,date })
	return new SuccessModel({
		result
	})
}

module.exports = {
	getLongComments,
	deleteLongComments,
	createLongComment,
	updateLongComment
}
