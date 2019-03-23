import React from 'react';
import { Row, Col, BackTop } from 'antd';
import PCHeader from "../components/PCHeader/PCHeader";
import PCImagelist from "../components/PCImagelist/PCImagelist";
import "../style/PCNewsDetails.less"
import Comment from "../components/Comment/Comment";
export default class PCNewsDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            newsItem: '',
            newsType: '',
            newsRealtype: ''
        }
    }

    componentWillMount() {
        const realType = this.props.match.params.realtype;

        if (realType == "娱乐") {
            this.setState({ newsType: 'yule' });
        } else if (realType == "国际") {
            this.setState({ newsType: 'guoji' });
        } else if (realType == "国内") {
            this.setState({ newsType: 'guonei' });
        } else if (realType == "社会") {
            this.setState({ newsType: 'shehui' });
        } else if (realType == "体育") {
            this.setState({ newsType: 'tiyu' });
        } else if (realType == "科技") {
            this.setState({ newsType: 'keji' });
        } else if (realType == "军事") {
            this.setState({ newsType: 'junshi' });
        } else {
            this.setState({ newsType: 'top' });
        }
    }


    componentDidMount() {
        // debugger;
        var myFetchOption = {
            method: "GET"
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" +
            this.props.match.params.uniquekey, myFetchOption)
            .then(response => response.json())
            .then(json => {
                this.setState({ newsItem: json, newsRealtype: json.realtype });


                document.title = this.state.newsItem.title + +" - React News | React 驱动的新闻平台";
            });
    };

    createMarkup() {

        return { __html: this.state.newsItem.pagecontent };
    };

    render() {

        return (
            <div>
                <PCHeader></PCHeader>
                <div id="pcDetailsContainer">
                    <Row>
                        <Col span={3}></Col>
                        <Col span={11}>
                            <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                            <hr />
                            <Comment uniquekey={this.props.match.params.uniquekey} realtype={this.props.match.params.realtype} title={this.state.newsItem.title} />
                            
                        </Col>
                        <Col span={1}></Col>
                        <Col span={6}>
                            <PCImagelist type={this.state.newsType} count="20" cardtitle={this.props.match.params.realtype + "新闻"}></PCImagelist>
                            {/* <PCNewsImgBlock count={30} type={this.state.newsType} width={"100%"} cartTitle={this.props.match.params.realtype+"新闻"} imageWidth="102px"/> */}
                        </Col>
                        <Col span={2}></Col>
                    </Row>
                    <BackTop />
                </div>
                {/* <PCFooter></PCFooter> */}
            </div>
        )
    }
}