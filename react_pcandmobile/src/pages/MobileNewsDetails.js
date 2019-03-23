// import React from 'react';
// import { connect } from "react-redux"
// import { MobileDetails } from "../components/MobileDetails/MobileDetails";
// import { getDetail } from "../actions/actions";


// class UI extends React.Component {
//     constructor(props) {
//         super(props)
//     }

//     componentDidMount() {
//         this.props.init()
//     }
//     render() {

//         return (
//             <div>
//                 <MobileDetails json={json} />
//             </div>
//         )
//     }
// }
// let mstp = state => {
//     return {
//         json: state.detail.json
//     }
// }
// let mdtp = (dispatch, props) => {
//     return {
//         init() {
//             let uniquekey = props.match.params.uniquekey
//             dispatch(getDetail(uniquekey))
//         }
//     }
// }
// export let MobileNewsDetails = connect(mstp, mdtp)(UI)


import React from 'react';
import { Row, Col } from 'antd';
import { Moblieback } from "../components/Moblieback/Moblieback";
import Comment from "../components/Comment/Comment";
import "../style/MobileNewsDetails.less"
import MobileHeader from "../components/MobileHeader/MobileHeader";

export class MobileNewsDetails extends React.Component {
    constructor() {
        super();
        this.state = {
            newsItem: '',
            newsType: ""
        }
    }

    componentDidMount() {
        var myFetchOption = {
            method: "GET"
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" + this.props.match.params.uniquekey, myFetchOption)
            .then(response => response.json())
            .then(json => {
                // console.log(json);
                this.setState({ newsItem: json });
                document.title = this.state.newsItem.title + + " - React News | React 驱动的新闻平台";
            });
    };


    createMarkup() {
        return { __html: this.state.newsItem.pagecontent };
    };

    render() {
        return (
            <div>
                <MobileHeader></MobileHeader>
                <Moblieback></Moblieback>
                <div id="mobileDetailsContainer">

                    <div className="ucmobileList">
                        <Row>
                            <Col span={24} className="container">
                                <div className="articleContainer" dangerouslySetInnerHTML={this.createMarkup()}></div>
                                <hr />
                                <Comment uniquekey={this.props.match.params.uniquekey} realtype={this.props.match.params.realtype} title={this.state.newsItem.title} />
                            </Col>
                        </Row>
                    </div>
                </div>
                <div></div>
            </div>

        )
    }
}