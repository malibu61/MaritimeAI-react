import {GET_SHIPS_DATA} from "./action-types"

const INIT_STATE = {
    data: []
}


const ShipDatas = (state = INIT_STATE, action) => {
    switch (action.payload.type) {
        case GET_SHIPS_DATA:
            return {
                ...state,
                data: action.payload.data
            }
        default:
            return state

    }
}

export default ShipDatas;