import { HOME_SET_BANNER,HOME_SET_GOODS} from "../actions/actionTypes";

export let home = (state={
    bannerList : [],
    goodsList : [],
    // age : 18
},action) => {
    let {type} = action
    let newState = {...state}
    switch (type) {
        case HOME_SET_BANNER:
            newState.bannerList = action.list
            return newState
            break;
        case HOME_SET_GOODS:
            newState.goodsList = action.list
            return newState
        default:
            return state
            break;
    }
}