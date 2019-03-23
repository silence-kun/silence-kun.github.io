import "./Comment.less"
import axios from "axios"
import React from 'react';
import moment from 'moment';
import { Col, Row, Form, Input, Button, Card, notification, message, Comment, Icon, Tooltip, Avatar, } from 'antd';

const { TextArea } = Input;
const FormItem = Form.Item;

class Comments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: '',
            likes: 0,
            dislikes: 0,
            action: null,
            usercollect: false
            // collect:'收藏该文章'
        }
    }
    like = () => {
        this.setState({
            likes: 1,
            dislikes: 0,
            action: 'liked',
        });
    }

    dislike = () => {
        this.setState({
            likes: 0,
            dislikes: 1,
            action: 'disliked',
        });
    }
    componentDidMount() {
        axios.post("http://47.93.96.214:4900/users/findcomment", {
            newsid: this.props.uniquekey
        }).then(({ data }) => {
            console.log(data);
            if (data.code === 1) {
                this.setState({ comments: data.list });
                // message.success("findcomment成功！");

            }
        });

        axios.post("http://47.93.96.214:4900/users/findcollect", {
            newsid: this.props.uniquekey,
            username: sessionStorage.userNickName,
            realtype: this.props.realtype
        }).then(({ data }) => {
            console.log(data);
            if (data.code === 1) {
                this.setState({ usercollect: true });
                // message.success("findcomment成功！");

            }
        });
    };
    dateFormat(date, str) {
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        month = month < 10 ? "0" + month : month;
        day = day < 10 ? "0" + day : day;
        hour = hour < 10 ? "0" + hour : hour;
        min = min < 10 ? "0" + min : min;
        sec = sec < 10 ? "0" + sec : sec;
        return str.replace("yyyy", year).replace("mm", month).replace("dd", day).replace("hh", hour).replace("mm", min).replace("ss", sec);
    }
    handleSubmit(e) {
        e.preventDefault();
        var date = new Date();
        var formdata = this.props.form.getFieldsValue();
        if (formdata.remark == "") {
            message.success("请输入评论内容...");
        } else {
            axios.post("http://47.93.96.214:4900/users/addcomment", {
                comment: formdata.remark,
                username: sessionStorage.userNickName,
                date: this.dateFormat(date, "yyyy-mm-dd hh:mm:ss"),
                newsid: this.props.uniquekey,
                realtype: this.props.realtype,
                title: this.props.title
            }).then(({ data }) => {
                console.log(data);
                if (data.code === 1) {
                    message.success("添加评论成功！");
                    window.location.reload();
                }
            });
        }

    }

    addUserCollection() {
        var date = new Date();
        axios.post("http://47.93.96.214:4900/users/addcollect", {
            username: sessionStorage.userNickName,
            date: this.dateFormat(date, "yyyy-mm-dd hh:mm:ss"),
            newsid: this.props.uniquekey,
            realtype: this.props.realtype,
            title: this.props.title
        }).then(({ data }) => {
            console.log(data);
            if (data.code === 1) {
                message.success("添加收藏成功！");
                this.setState({ usercollect: true });
            }
        });
    }
    render() {

        const { likes, dislikes, action } = this.state;

        const actions = [
            <span>
                <Tooltip title="Like">
                    <Icon
                        type="like"
                        theme={action === 'liked' ? 'filled' : 'outlined'}
                        onClick={this.like}
                    />
                </Tooltip>
                <span style={{ paddingLeft: 8, cursor: 'auto' }}>
                    {likes}
                </span>
            </span>,
            <span>
                <Tooltip title="Dislike">
                    <Icon
                        type="dislike"
                        theme={action === 'disliked' ? 'filled' : 'outlined'}
                        onClick={this.dislike}
                    />
                </Tooltip>
                <span style={{ paddingLeft: 8, cursor: 'auto' }}>
                    {dislikes}
                </span>
            </span>
        ];



        let { getFieldProps } = this.props.form;
        const { comments } = this.state;
        const commentsList = comments.length ?
            comments.map((comment, index) => (
                // <Card key={index} title={comment.username} extra={< a href="#"> 发布于 {comment.date} </a>}>
                //     <p>{comment.comment}</p>
                // </Card>
                <Comment key={index}
                    actions={actions}
                    author={<a>{comment.username}</a>}
                    avatar={(
                        <Avatar
                            // src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            src="http://s9.rr.itc.cn/r/wapChange/20171_9_20/a293mu7507920924276.jpeg"
                            alt={comment.username}
                        />
                    )}
                    content={(
                        <p>{comment.comment}</p>
                    )}
                    datetime={(
                        <Tooltip title={comment.date}>
                            <span>{comment.date}</span>
                        </Tooltip>

                    )}
                />
            ))
            :
            "没有加载到任何评论"
            ;

        let tijiaopl = null;
        if (sessionStorage.userNickName) {
            if (this.state.usercollect == false) {
                tijiaopl = <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem label={"您的评论"}>
                        <TextArea type="textarea" placeholder={"请输入评论内容"}
                            {...getFieldProps('remark', { initialValue: '' })} />
                    </FormItem>
                    <Button type="primary" htmlType="submit">提交评论</Button>
                    &nbsp;&nbsp;<Button type="primary" htmlType="button" onClick={this.addUserCollection.bind(this)}>收藏该文章</Button>
                </Form>
            } else {
                tijiaopl = <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem label={"您的评论"}>
                        <TextArea type="textarea" placeholder={"请输入评论内容"}
                            {...getFieldProps('remark', { initialValue: '' })} />
                    </FormItem>
                    <Button type="primary" htmlType="submit">提交评论</Button>
                    &nbsp;&nbsp;<Button type="primary" htmlType="button" onClick={this.addUserCollection.bind(this)} disabled>已收藏</Button>
                </Form>
            }

            // this.state.usercollect == false ?
            //     tijiaopl = (<Form onSubmit={this.handleSubmit.bind(this)}>
            //         <FormItem label={"您的评论"}>
            //             <TextArea type="textarea" placeholder={"请输入评论内容"}
            //                 {...getFieldProps('remark', { initialValue: '' })} />
            //         </FormItem>
            //         <Button type="primary" htmlType="submit">提交评论</Button>
            //         &nbsp;&nbsp;<Button type="primary" htmlType="button" onClick={this.addUserCollection.bind(this)}>收藏该文章</Button>
            //     </Form>) :
            //     tijiaopl = (<Form onSubmit={this.handleSubmit.bind(this)}>
            //         <FormItem label={"您的评论"}>
            //             <TextArea type="textarea" placeholder={"请输入评论内容"}
            //                 {...getFieldProps('remark', { initialValue: '' })} />
            //         </FormItem>
            //         <Button type="primary" htmlType="submit">提交评论</Button>
            //         &nbsp;&nbsp;<Button type="primary" htmlType="button" onClick={this.addUserCollection.bind(this)} disabled>已收藏</Button>
            //     </Form>)
            //     ;
        } else {
            tijiaopl = <div>
                <p className="pinglunp">登录之后才能进行评论呦~</p>
                <hr></hr>
            </div>
        }


        // const tijiaopl = sessionStorage.userNickName ?
        //     (this.state.usercollect == false ? <Form onSubmit={this.handleSubmit.bind(this)}>
        //         <FormItem label={"您的评论"}>
        //             <TextArea type="textarea" placeholder={"请输入评论内容"}
        //                 {...getFieldProps('remark', { initialValue: '' })} />
        //         </FormItem>
        //         <Button type="primary" htmlType="submit">提交评论</Button>
        //         &nbsp;&nbsp;<Button type="primary" htmlType="button" onClick={this.addUserCollection.bind(this)}>收藏该文章</Button>
        //     </Form> : <Form onSubmit={this.handleSubmit.bind(this)}>
        //             <FormItem label={"您的评论"}>
        //                 <TextArea type="textarea" placeholder={"请输入评论内容"}
        //                     {...getFieldProps('remark', { initialValue: '' })} />
        //             </FormItem>
        //             <Button type="primary" htmlType="submit">提交评论</Button>
        //             &nbsp;&nbsp;<Button type="primary" htmlType="button" onClick={this.addUserCollection.bind(this)} disabled>已收藏</Button>
        //         </Form>;)
        //      :
        // <div>
        //     <p className="pinglunp">登录之后才能进行评论呦~</p>
        //     <hr></hr>
        // </div>
        //     ;
        return (
            <div className="comment">
                <Row>
                    <Col span={24}>

                        {tijiaopl}

                        {commentsList}
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Comments = Form.create({})(Comments);