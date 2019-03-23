import axios from "axios"
import {  HOME_SET_GOODS } from "./actionTypes";

// export let setBanner = list => ({
//     type: HOME_SET_BANNER,
//     list
// })
// export let getBanner = () => {
//     return function (dispatch) {
//         axios.get("http://www.projectlog.top:3000/zhuiszhu/goods/getHot")
//             .then(({ data }) => {
//                 dispatch(setBanner(data.list))
//             })
//     }
// }

export let setGoods = list => ({
    type: HOME_SET_GOODS,
    list
})

export let getGoods = (type) => dispatch => {
    // axios.get("/zhuiszhu/goods/getList")
    //     .then(({ data }) => {
    //         dispatch(setGoods(data.list))
    //     })
    var myFetchOptions = {
        method: 'GET'
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" +
        type + "&count=20", myFetchOptions).then(response => response.json()).then(json => (
            dispatch(setGoods(json))
        )
        );
}

export let setDetail = json => ({
    type: DETAIL_SET_GOODS,
    json
})

export let getDetail = uniquekey => dispatch => {
    var myFetchOption = {
        method: "GET"
    };
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + uniquekey, myFetchOption)
        .then(response => response.json())
        .then(json => {
            dispatch(setDetail(data.json))
        });
}
