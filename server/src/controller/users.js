const { SuccessModel, ErrorModel } = require("../model/resModel")
const { _getUsers,_deleteUsers,_createUsers,_checkUserName,_login,_updateUser } = require("../service/users")
const { userNameRepeat,passwordError } = require("../model/ErrorInfo")

const getUsers = async ({ username }) => {
	const result = await _getUsers({ username })
	return new SuccessModel({
		result
	})
}

const login = async ({ctx,username, password}) => {
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

const logout = async ({ctx}) => {
	delete ctx.session.userInfo
	return new SuccessModel("退出成功")
}

const deleteUsers = async ({deleteIdsArr} ) => {
	const deleteIdsStr = deleteIdsArr.join(",")
	const result = await _deleteUsers(deleteIdsStr)
	return new SuccessModel({
		result
	})
}

const createUser = async ({ username,password,nickname }) => {
	const usernameRepeat = await _checkUserName(username,password)
	if(usernameRepeat){
		return new ErrorModel(userNameRepeat)
	}
	const result = await _createUsers({username,password,nickname})
	return new SuccessModel({
		result
	})
}

const updateUser = async ({ id,username,password,nickname }) => {
	const result = await _updateUser({id,username,password,nickname})
	return new SuccessModel({
		result
	})
}


module.exports = {
	getUsers,
	deleteUsers,
	createUser,
	updateUser,
	login,
	logout
}
