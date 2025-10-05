import {post} from "../helpers/api-helper"
import {LOGIN_URL} from "../helpers/url-helper"


export const loginService = async (body) => {

    return await post(LOGIN_URL, body)

}