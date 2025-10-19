import {get} from "../helpers/api-helper"
import {
    GET_CANAKKALE_STRAIT_AI_ANALYZE,
    GET_CANAKKALE_STRAIT_NAVTEX_AI_ANALYZE,
    GET_ISTANBUL_STRAIT_AI_ANALYZE,
    GET_ISTANBUL_STRAIT_NAVTEX_AI_ANALYZE
} from "../helpers/url-helper";



export const getIstanbulStraitAiAnalyzeService = async (body) => {

    return await get(GET_ISTANBUL_STRAIT_AI_ANALYZE, body)

}
export const getCanakkaleStraitAiAnalyzeService = async (body) => {

    return await get(GET_CANAKKALE_STRAIT_AI_ANALYZE, body)

}

export const getCanakkaleStraitNavtexAiAnalyzeService = async (body) => {

    return await get(GET_CANAKKALE_STRAIT_NAVTEX_AI_ANALYZE, body)

}

export const getIstanbulStraitNavtexAiAnalyzeService = async (body) => {

    return await get(GET_ISTANBUL_STRAIT_NAVTEX_AI_ANALYZE, body)

}


