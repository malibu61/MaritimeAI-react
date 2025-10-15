import {get,post} from "../helpers/api-helper"
import {
    GET_SHIPS_WITH_ZOOM1,
    GET_ALL_SHIPS,
    GET_CANAKKALE_STRAIT_SHIP_COUNT, GET_ISTANBUL_STRAIT_SHIP_COUNT, GET_ISTANBUL_STRAIT_AVG_SPEED,
    GET_CANAKKALE_STRAIT_AVG_SPEED
} from "../helpers/url-helper";


export const getAllShipsService = async (params) => {
    const queryParams = new URLSearchParams({
        minLat: params.minLat,
        maxLat: params.maxLat,
        minLon: params.minLon,
        maxLon: params.maxLon,
        zoom: params.zoom
    }).toString();

    return await post(`${GET_ALL_SHIPS}?${queryParams}`);
}


export const getShipsWZoom1Service = async (body) => {

    return await get(GET_SHIPS_WITH_ZOOM1, body)

}


export const canakkaleStraitShipsCountService = async (body) => {

    return await get(GET_CANAKKALE_STRAIT_SHIP_COUNT, body)

}


export const istanbulStraitShipsCountService = async (body) => {

    return await get(GET_ISTANBUL_STRAIT_SHIP_COUNT, body)

}

export const canakkaleStraitShipsAvgSpeedService = async (body) => {

    return await get(GET_CANAKKALE_STRAIT_AVG_SPEED, body)

}

export const istanbulStraitShipsAvgSpeedService = async (body) => {

    return await get(GET_ISTANBUL_STRAIT_AVG_SPEED, body)

}