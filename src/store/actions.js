import {
    GET_SHIPS_DATA
} from "./action-types";

export const getShipsData = data => ({
    type: GET_SHIPS_DATA,
    payload: data

})