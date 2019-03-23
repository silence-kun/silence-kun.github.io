import "./PCList.less"
import React from 'react';
import { Row, Col, Empty } from 'antd';
import { HashRouter, Link } from 'react-router-dom';

export class PCList extends React.Component {
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
            this.props.count, myFetchOptions).then(response => response.json()).then(json => (
                this.setState({ news: json })
            )
            );
    }

    render() {
        const domList = this.state.news.length ?
            this.state.news.map((newsItem, index) => (
                <section key={index} className="tihuan">
                    {/* <HashRouter basename="/"> */}
                    <Link to={`/details/${newsItem.realtype}/${newsItem.uniquekey}`}>
                        <div className="tihuan_img">
                            <img src={newsItem.thumbnail_pic_s} alt={newsItem.title} />
                        </div>
                        <div className="tihuan_info">
                            <div className="tihuan_title">
                                <span>{newsItem.title}</span>
                            </div>
                            <div className="tihuan_desc clearfix">
                                <div className="tihuan_desc_l">
                                    <span className="tihuan_channel">{newsItem.realtype}</span>
                                    <span className="tihuan_time">{newsItem.date}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                    {/* </HashRouter> */}
                </section>
            ))
            :
            <Empty description="Loading..." image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original" />
        // "nothing";

        return (
            <div className="wi">
                <Row>
                    <Col span={24}>
                        {domList}
                    </Col>
                </Row>
            </div>
        )
    }


}