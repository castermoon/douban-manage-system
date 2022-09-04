const { SuccessModel, ErrorModel } = require("../model/resModel")
const { 	_getComments, _deleteComments,_updateComment,_createComment } = require("../service/comments")

const getComments = async ({content}) => {
	const result = await _getComments({content})
	return new SuccessModel({
		result
	})
}

const deleteComments = async ( {deleteIdsArr} ) => {
	const deleteIdStr = deleteIdsArr.join(",")
	const result = await _deleteComments({deleteIdStr})
	return new SuccessModel({
		result
	})
}

const createComment = async ({ content,date,score,user_id,movie_id,status,labelList,onlyMe,isShare}) => {
	const result = await _createComment({content,date,score,user_id,movie_id,status,labelList,onlyMe,isShare})
	return new SuccessModel({
		result
	})
}


const updateComment = async ( { id,content,date,score,user_id,movie_id,status,labelList,onlyMe,isShare }) => {
	const result = await _updateComment({  id,content,date,score,user_id,movie_id,status,labelList,onlyMe,isShare })
	return new SuccessModel({
		result
	})
}



module.exports = {
	deleteComments,
	getComments,
	updateComment,
	createComment
}
