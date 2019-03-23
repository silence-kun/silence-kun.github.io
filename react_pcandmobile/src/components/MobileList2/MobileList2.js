import "./MobileList2.less"
import React from 'react';
import { Row, Col, Empty } from 'antd';
import { HashRouter, Link } from 'react-router-dom';

export class MobileList2 extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const domList = this.props.list.length ?
            this.props.list.map((newsItem, index) => (
                <section key={index} className="m_article list-item special_section clearfix">
                    {/* <HashRouter basename="/"> */}
                        <Link to={`details/${newsItem.realtype}/${newsItem.uniquekey}`}>
                            <div className="m_article_img">
                                <img src={newsItem.thumbnail_pic_s} alt={newsItem.title} />
                            </div>
                            <div className="m_article_info">
                                <div className="m_article_title">
                                    <span>{newsItem.title}</span>
                                </div>
                                <div className="m_article_desc clearfix">
                                    <div className="m_article_desc_l">
                                        <span className="m_article_channel">{newsItem.realtype}</span>
                                        <span className="m_article_time">{newsItem.date}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    {/* </HashRouter> */}
                </section>
            ))
            :
            <Empty description="暂无数据" image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original" />
        // "nothing";

        return (
            <div>
                <Row>
                    <Col span={24}>
                        {domList}
                    </Col>
                </Row>
            </div>
        )
    }


}