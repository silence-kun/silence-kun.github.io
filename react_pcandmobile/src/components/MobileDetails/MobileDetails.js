import React from 'react';
import {Row, Col } from 'antd';

export class MobileDetails extends React.Component {
    constructor(props) {
        super(props)
    }
    // componentDidMount() {
    //     var myFetchOption = {
    //         method: "GET"
    //     };
    //     fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.match.params.uniquekey, myFetchOption)
    //         .then(response => response.json())
    //         .then(json => {
    //             this.setState({newsItem: json});
    //             document.title = this.state.newsItem.title+ + " - React News | React 驱动的新闻平台";
    //         });
    // };


    createMarkup() {
        return {__html: this.props.json.pagecontent};
    };

    render() {
        return (
            
            <div id="mobileDetailsContainer">
                <div className="ucmobileList">
                    <Row>
                        <Col span={24} className="container">
                            <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                            <hr/>
                            {/* <CommonComments uniquekey={this.props.match.params.uniquekey} /> */}
                        </Col>
                    </Row>
                </div>


            </div>
        )
    }
}