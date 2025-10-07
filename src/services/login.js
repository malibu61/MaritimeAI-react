import {post} from "../helpers/api-helper"
import {LOGIN_URL,LOGOUT_URL} from "../helpers/url-helper"


export const loginService = async (body) => {

    return await post(LOGIN_URL, body)

}

export const logoutService = async (body) => {

    return await post(LOGOUT_URL, body)

}