import {combineReducers} from "redux"
import { home } from "./homeReducer";
import { detail } from "./detailReducer";

export let reducer = combineReducers({home,detail})
// export let reducer = (state,action) => {



//     return state
// }