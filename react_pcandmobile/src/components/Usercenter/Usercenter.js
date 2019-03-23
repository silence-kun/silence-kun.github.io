import React from 'react';
import "./Usercenter.less"
import { Row, Col, Tabs, Upload, Icon, Modal, Card, List, Avatar, message, Empty, confirmLoading } from 'antd';
import axios from "axios";
const TabPane = Tabs.TabPane;
import { Link } from 'react-router-dom';
import { setPriority } from 'os';

export default class Usercenter extends React.Component {
    constructor() {
        super();
        this.state = {
            list: [],
            collectlist: [],
            ModalText: '您将删除评论：',
            visible: false,
            confirmLoading: false,
            date: "",
            xscomment: ""
        };
    };

    componentDidMount() {
        axios.post("http://47.93.96.214:4900/users/findMyComment", {
            username: sessionStorage.userNickName
        }).then(({ data }) => {
            console.log(data);
            if (data.code === 1) {
                console.log(data.list);
                this.setState({ list: data.list })
            }
        });

        axios.post("http://47.93.96.214:4900/users/findmycollect", {
            username: sessionStorage.userNickName
        }).then(({ data }) => {
            console.log(data);
            if (data.code === 1) {
                console.log(data.list);
                this.setState({ collectlist: data.list })
            }
        });

    }
    showModal = (date, xscomment) => {
        console.log(date, xscomment)
        this.setState({
            visible: true,
            date,
            xscomment
        });
    }

    handleOk = () => {
        this.setState({
            ModalText: '正在删除评论...',
            confirmLoading: true,
        });
        setTimeout(() => {
            axios.post("http://47.93.96.214:4900/users/removecomment", {
                date: this.state.date
            }).then(({ data }) => {
                console.log(data);
                if (data.code === 1) {
                    console.log(data.result);
                    // message.success("删除评论成功！");
                    window.location.reload();
                }
            });
            this.setState({
                visible: false,
                confirmLoading: false,
                date: "",
                xscomment: ""
            });

        }, 1500);
    }

    handleCancel = () => {
        this.setState({
            visible: false,
            date: "",
            xscomment: ""
        });
    }

    removecollect(newsid) {
        axios.post("http://47.93.96.214:4900/users/removecollect", {
            newsid
        }).then(({ data }) => {
            console.log(data);
            if (data.code === 1) {
                console.log(data.result);
                message.success("取消收藏成功！");
                // window.location.reload();
            }
        });
    }


    fetchfn(newsid) {
        var myFetchOption = {
            method: "GET"
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + newsid, myFetchOption)
            .then(response => response.json())
            .then(json => {
                // console.log(json.title);
                // console.log(i);
                // return json.title;

                console.log(json.title)

                // data.list[i].title=json.title;



            });
    }


    render() {
        const { visible, confirmLoading, ModalText } = this.state;

        const listData = [];
        for (let i = 0; i < this.state.list.length; i++) {
            listData.push({
                date: this.state.list[i].date,
                title: sessionStorage.userNickName,
                avatar: 'http://s9.rr.itc.cn/r/wapChange/20171_9_20/a293mu7507920924276.jpeg',
                description: this.state.list[i].comment,
                content: this.state.list[i].title,
                realtype: this.state.list[i].realtype,
                newsid: this.state.list[i].newsid,
            });
        }
        const IconText = ({ type, text }) => (
            <span>
                <Icon type={type} style={{ marginRight: 8 }} />
                {text}
            </span>
        );

        const { collectlist } = this.state;
        const collect = collectlist.length ?
            collectlist.map((item, i) => (
                <Card
                    key={i}
                    style={{ marginTop: 16 }}
                    type="inner"
                    title={<p><span>收藏时间：</span>{item.collectdate}</p>}
                    extra={<span onClick={this.removecollect.bind(this, item.newsid)}><a href="#">取消收藏</a></span>}
                >
                    <p>原文章：</p>
                    <Link to={`details/${item.realtype}/${item.newsid}`}>
                        {item.title}
                    </Link>
                </Card>
            )) :
            <Empty description="您还没有收藏呦" image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original" />;



        return (
            <div>
                <Tabs defaultActiveKey="2">
                    <TabPane tab={<span><Icon type="star" />我的收藏</span>} key="1">
                        <div>
                            {collect}
                        </div>

                    </TabPane>
                    <TabPane tab={<span><Icon type="message" />我的评论</span>} key="2">
                        <div className="comentcontent">

                            <List
                                itemLayout="vertical"
                                size="large"
                                // pagination={{
                                //     onChange: (page) => {
                                //         console.log(page);
                                //     },
                                //     pageSize: 3,
                                // }}
                                dataSource={listData}
                                footer={<div><b>没有更多评论了呦...</b></div>}
                                renderItem={item => (
                                    <List.Item
                                        key={item.title}
                                    // actions={[<IconText type="setting" text="删除评论"/>]}
                                    // extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                                    >
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.avatar} />}
                                            title={<a href={item.href}>{item.title}<p className="date">{item.date}</p></a>}
                                            description={ <div>
                                                <p>{item.description}</p>
                                                <p className="mt">原文章：</p>
                                                <Link to={`details/${item.realtype}/${item.newsid}`}>
                                                    <p> {item.content}</p>
                                                </Link>
                                                
                                            </div>}
                                            
                                        // date={<span>{item.date}</span>}    {item.description}
                                        />
                                       <span className="shanchupinglun" onClick={this.showModal.bind(this, item.date, item.description)}><Icon type="setting" />删除评论</span>








                                        <Modal
                                            key={item.date}
                                            title="删除评论"
                                            visible={visible}
                                            onOk={this.handleOk}
                                            confirmLoading={confirmLoading}
                                            onCancel={this.handleCancel}
                                        >
                                            <p>{ModalText}{this.state.xscomment}</p>
                                        </Modal>

                                    </List.Item>
                                )}
                            />,

                    </div>

                    </TabPane>
                    {/* <TabPane tab={<span><Icon type="picture" />我的头像</span>} key="3">
                        Tab 3
                    </TabPane> */}
                </Tabs>
            </div>
        )
    }
}