import React from 'react';
import { connect } from "react-redux"
import { MobileBanner } from "../components/MobileBanner/MobileBanner";
import { MobileList } from "../components/MobileList/MobileList";

import MobileHeader from "../components/MobileHeader/MobileHeader";
import { Tabs, Carousel } from 'antd';
import {  getGoods } from "../actions/actions";
import { Link } from "react-router-dom"
const TabPane = Tabs.TabPane;



@connect(
    state => {
        return {
            bannerList: state.home.bannerList,
            goodsList: state.home.goodsList
        }
    },
    // dispatch => {
    //     return {
    //         init() {
    //             dispatch(getBanner())
    //             dispatch(getGoods())
    //         }
    //     }
    // }
)


export class MobileIndex extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            type: "top",
        }
    }

    componentDidMount() {
        // this.props.init()

        const { dispatch } = this.props;

        // dispatch(getBanner())
        // dispatch(getGoods(this.state.type))
    }

    // componentWillUpdate() {
    //     const { dispatch } = this.props;
    //     dispatch(getGoods(this.state.type))
    // }

    // changetabs(key) {
    //     if (key == "1") {
    //         this.setState( {
    //             type: "top"
    //         })
    //     }
    //     if (key == "2") {
    //         this.setState( {
    //             type: "shehui"
    //         })
    //     }
    //     if (key == "3") {
    //         this.setState( {
    //             type: "guonei"
    //         })
    //     }
    //     if (key == "4") {
    //         this.setState( {
    //             type: "guoji"
    //         })
    //     }
    //     if (key == "5") {
    //         this.setState( {
    //             type: "tiyu"
    //         })
    //     }
    //     if (key == "6") {
    //         this.setState( {
    //             type: "junshi"
    //         })
    //     }
    //     if (key == "7") {
    //         this.setState( {
    //             type: "keji"
    //         })
    //     }
    // }


    render() {
        let { bannerList, goodsList } = this.props
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            autoplay: true
        };
        return (
            <div>
                <MobileHeader></MobileHeader>
                <Tabs>
                    <TabPane tab="新闻首页" key={"1"}>
                        {/* <MobileBanner list={bannerList} /> */}
                        <div className="carousel">
                            <Carousel {...settings}>
                                <div><img src={require("../image/carousel_1.jpg")}/></div>
                                <div><img src={require("../image/carousel_2.jpg")}/></div>
                                <div><img src={require("../image/carousel_3.jpg")}/></div>
                                <div><img src={require("../image/carousel_4.jpg")}/></div>
                            </Carousel>
                        </div>
                        {/* <MobileList list={goodsList} /> */}
                        <MobileList count={20} type="top"/>
                    </TabPane>
                    <TabPane tab="社会" key={"2"} >
                        <MobileList count={20} type="shehui"/>
                        {/* <MobileList list={goodsList} /> */}
                    </TabPane>
                    <TabPane tab="国内" key={"3"} >
                        <MobileList count={20} type="guonei"/>
                        {/* <MobileList list={goodsList} /> */}
                    </TabPane>
                    <TabPane tab="国际" key={"4"} >
                        <MobileList count={20} type="guoji"/>
                        {/* <MobileList list={goodsList} /> */}
                    </TabPane>
                    <TabPane tab="体育" key={"5"} >
                        <MobileList count={20} type="tiyu"/>
                        {/* <MobileList list={goodsList} /> */}
                    </TabPane>
                    <TabPane tab="军事" key={"6"} >
                        <MobileList count={20} type="junshi"/>
                        {/* <MobileList list={goodsList} /> */}
                    </TabPane>
                    <TabPane tab="科技" key={"7"}>
                        <MobileList count={20} type="keji"/>
                        {/* <MobileList list={goodsList} /> */}
                    </TabPane>
                </Tabs>
                {/* <MobileTabBar></MobileTabBar> */}
                {/* <MobileFooter/> */}
            </div>
        )


    }
}

// let mapStateToProps = state => {
//     return {
//         bannerList: state.home.bannerList,
//         goodsList: state.home.goodsList
//     }
// }

// let mapDispathToProps = dispatch => {
//     return {
//         init() {
//             dispatch(getBanner())
//             dispatch(getGoods("top"))
//         }
//     }
// }

// export let MobileIndex = connect(mapStateToProps, mapDispathToProps)(UI)