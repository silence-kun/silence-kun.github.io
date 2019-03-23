import { DETAIL_SET_GOODS } from "../actions/actionTypes";

export let detail = (state={
    json : null,
    title :"详情页"
},action) => {
    let {type} = action
    let newState = {...state}
    switch (type) {
        case DETAIL_SET_GOODS:
            newState.json = action.json
            return newState
        default:
            return state
            break;
    }
}