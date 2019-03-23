import React from 'react';
import axios from "axios"
import "./PCShouye.less"
import { Icon, Tabs, message, Form, Input, Button, Carousel, Menu } from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
import { Link } from 'react-router-dom'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import PCNewsBlock from "../PCNewsBlock/PCNewsBlock"
import PCImagelist from "../PCImagelist/PCImagelist"
class PCShouye extends React.Component {


    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            autoplay: true
        };
        return (
            <div className="wi">
                <div>
                    <div className="banner mt">
                        <Carousel {...settings}>
                            <div><img src={require("../../image/carousel_1.jpg")} /></div>
                            <div><img src={require("../../image/carousel_2.jpg")} /></div>
                            <div><img src={require("../../image/carousel_3.jpg")} /></div>
                            <div><img src={require("../../image/carousel_4.jpg")} /></div>
                        </Carousel>
                        <PCImagelist type="guoji" count="3" cardtitle="国际头条"></PCImagelist>
                    </div>
                    <Tabs className="tabs_news mt">
                        <TabPane tab={"新闻头条"} key="1">
                            <PCNewsBlock count={26} type="top" width="100%" bordered="false" />
                        </TabPane>
                        <TabPane tab="国际" key="2">
                            <PCNewsBlock count={26} type="guoji" width="100%" bordered="false" />
                        </TabPane>
                    </Tabs>


                </div>
                <div className="mt fl">
                    <PCImagelist type="keji" count="7" cardtitle="科技"></PCImagelist>
                </div>
                <div className="mt fl">
                    <PCImagelist type="junshi" count="7" cardtitle="军事"></PCImagelist>
                </div>
            </div>
        )
    }
}
export default PCShouye = Form.create({})(PCShouye);