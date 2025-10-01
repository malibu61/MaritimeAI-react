import {get} from "../helpers/api-helper"
import {GET_SHIPS_WITH_ZOOM1, GET_ALL_SHIPS} from "../helpers/url-helper";

export const getAllShipsService = async (body) => {

    return await get(GET_ALL_SHIPS, body)

}

export const getShipsWZoom1Service = async (body) => {

    return await get(GET_SHIPS_WITH_ZOOM1, body)

}