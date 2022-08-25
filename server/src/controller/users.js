const { SuccessModel, ErrorModel } = require("../model/resModel")
const { _getUsers,_deleteUsers,_createUsers,_checkUserName,_login } = require("../service/users")
const { userNameRepeat,passwordError } = require("../model/ErrorInfo")

const getUsers = async () => {
	const result = await _getUsers()
	return new SuccessModel({
		result
	})
}

const login = async (ctx,username, password) => {
	const userInfo = await _login({username, password})
	if(!userInfo){
		return new ErrorModel(passwordError)
	}
	if(!ctx.session.userInfo){
		ctx.session.userInfo = userInfo
	}
	return new SuccessModel({
		errno: 0,
		data:userInfo,
		message:"登录成功"
	})
}

const deleteUser = async ( deleteIdStr ) => {
	const _deleteIdStr = JSON.parse(deleteIdStr).join(",")
	const result = await _deleteUsers(_deleteIdStr)
	return new SuccessModel({
		result
	})
}

const createUser = async ({ username,password }) => {
	const usernameRepeat = await _checkUserName(username)
	if(usernameRepeat){
		return new ErrorModel(userNameRepeat)
	}
	const result = await _createUsers({username,password})
	return new SuccessModel({
		result
	})
}


module.exports = {
	getUsers,
	deleteUser,
	createUser,
	login
}
