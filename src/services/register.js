import {post} from "../helpers/api-helper"
import {REGISTER_URL} from "../helpers/url-helper"


export const registerService = async (body) => {

    return await post(REGISTER_URL, body)

}