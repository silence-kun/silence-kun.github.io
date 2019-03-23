import React from 'react';
import axios from "axios"
import "./PCImagelist.less"
import { Icon, Tabs, Card, Form, Button, Carousel, Menu } from 'antd';
const { Meta } = Card;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
import { Link } from 'react-router-dom'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import PCNewsBlock from "../PCNewsBlock/PCNewsBlock"

class PCImagelist extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            news: ""
        }
    }
    componentWillMount() {

        var myFetchOptions = {
            method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" +
            this.props.type + "&count=" +
            this.props.count, myFetchOptions).then(response => response.json()).then(json => {
                this.setState({ news: json })
            }
            );
    }



    render() {
        const news = this.state.news;
        const newsList = news.length ?
            news.map((newsItem, index) => {
                return (
                    <Link to={`/details/${newsItem.realtype}/${newsItem.uniquekey}`} target="_blank">
                        <Card
                            key={index}
                            className="cardlist"
                            hoverable
                            // style={{ width: 200 }}
                            cover={<img alt="example" src={newsItem.thumbnail_pic_s} />}
                        >

                            <Meta
                                key={newsItem.title}
                                title={newsItem.title}
                                description={newsItem.author_name}
                                className="meta"
                            />

                        </Card >
                    </Link >
                )
            })
            :
            "nothing";
        // var more=`/home/${this.props.type}`
        return (
            <div>
                <div>
                    <Card
                        title={this.props.cardtitle}
                        extra={<Link to={`/home/${this.props.type}`}>更多</Link>}
                    // style={{ width: 550 }}
                    >
                        {newsList}
                    </Card>
                </div>
            </div >
        )
    }
}
export default PCImagelist = Form.create({})(PCImagelist);