import React from 'react';
import {Card} from 'antd';
import { Link,  HashRouter} from 'react-router-dom';
import "./PCNewsBlock.less"
export default class PCNewsBlock extends React.Component{
    constructor(){
        super();
        this.state = {
            news : ""
        }
    }
    componentWillMount(){
        var myFetchOptions = {
            method : 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" +
            this.props.type + "&count=" +
            this.props.count, myFetchOptions).
        then(response => response.json()).
        then(json =>{
            this.setState({news: json})
        })


    }
    render(){
        const news = this.state.news;
        const newsList = news.length ?
            news.map((newsItem,index)=>(
                <li key={index} className="lia">
                        <Link to={`/details/${newsItem.realtype}/${newsItem.uniquekey}`} target="_blank">
                            {newsItem.title}
                        </Link>
                </li>
            ))
            :
            "nothing";
        return(
            <div className="topNewsList">
                <Card>
                    <ul>
                        {newsList}
                    </ul>
                </Card>
            </div>
        )
    }
}