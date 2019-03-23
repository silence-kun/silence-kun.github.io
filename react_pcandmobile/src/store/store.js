import {createStore , applyMiddleware} from "redux"
import { reducer } from "../reducers";
import thunk from "redux-thunk"


// 中间件(插件)
// thunk中间件的作用是  允许store.dispath()方法传入函数类型参数
export let store = createStore(reducer,applyMiddleware(thunk))