import React from 'react';
import axios from "axios"
import { Icon, Tabs, message, Form, Input, Button, Modal } from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
import { Link } from 'react-router-dom'

import "./MobileHeader.less"
class MobileHeader extends React.Component {
    constructor() {
        super();
        this.state = {
            current: "top",
            modalVisible: false,
            action: 'login',
            hasLogined: false,
            userNickName: "",
            userId: 0
        }
    }
    componentWillMount() {
        if (sessionStorage.getItem("userNickName")) {
            this.setState({ hasLogined: true });
        }
    };
    handleSubmit(e) {
        e.preventDefault();
        var formData = this.props.form.getFieldsValue();
        // console.log(formData.r_userName);
        //为空验证
        if (formData.r_userName == undefined) {
            message.success("用户名不能为空呦~");
        } else if (formData.r_password == undefined) {
            message.success("密码不能为空呦~");
        }
        else if (formData.r_confirmPassword == undefined) {
            message.success("密码不能为空呦~");
        }
        else if (formData.r_confirmPassword != formData.r_password) {
            message.success("密码输入不一致呦~");
        } else {
            //用户名验证
            var nameRex = /^[a-zA-Z0-9_-]{4,16}$/;
            if (!nameRex.test(formData.r_userName)) {
                message.success("用户名：4到16位（字母，数字，下划线，减号）");
            } else {
                axios
                    .post("http://47.93.96.214:4900/users/exname", { username: formData.r_userName })
                    .then(({ data }) => {
                        if (data.code === 1) {
                            // message.success("注册成功！");
                            var pwdRex = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/;
                            if (!pwdRex.test(formData.r_password)) {
                                message.success("密码：8～20字符，需同时包含英文和数字~");
                            } else {
                                axios.post("http://47.93.96.214:4900/users/zhuce", {
                                    username: formData.r_userName,
                                    usertel: formData.r_userName,
                                    userpwd: formData.r_password
                                }).then(({ data }) => {
                                    console.log(data);
                                    if (data.code === 1) {
                                        console.log(formData.r_userName);
                                        console.log(formData.r_password);
                                        sessionStorage.userNickName = formData.r_userName;
                                        message.success("注册成功！");
                                        this.setModalVisible(false);
                                        this.setState({ hasLogined: true });
                                    }
                                });
                            }
                        } else {
                            message.success("用户名已经有人用了呦~");
                        }
                    });
            };
        }
    }
    handleSubmitLn(e) {
        e.preventDefault();
        var formData = this.props.form.getFieldsValue();
        if (formData.userName == undefined) {
            message.success("用户名不能为空呦~");
        } else if (formData.password == undefined) {
            message.success("密码不能为空呦~");
        } else {
            axios.post("http://47.93.96.214:4900/users/login", {
                username: formData.userName,
                userpwd: formData.password
            }).then(({ data }) => {
                console.log(data);
                if (data.code === 1) {
                    console.log(formData.userName);
                    console.log(formData.password);
                    sessionStorage.userNickName = formData.userName;
                    message.success("登录成功！");
                    this.setModalVisible(false);
                    this.setState({ hasLogined: true });

                }
                if (data.code == 0) {
                    message.success("账号或者密码错误！");
                }
            });
        }
    }

    setModalVisible(value) {
        this.setState({ modalVisible: value });
    };

    callback(key) {
        if (key == 1) {
            this.setState({
                action: 'login'
            })
        } else if (key == 2) {
            this.setState({
                action: 'register'
            })
        }
    }
    logout() {
        sessionStorage.removeItem("userNickName");
        this.setState({ hasLogined: false });
    }

    render() {
        let { getFieldProps, getFieldDecorator, getFieldsValue } = this.props.form;
        const userShow = this.state.hasLogined ?
            <span className="logout">
                <Link to={`/home`}>
                    <Icon type="logout" onClick={this.logout.bind(this)} style={{ fontSize: '24px', color: '#1890FE', float: "right", marginTop: "10px", marginRight: "10px" }} />
                </Link>
                <Link to={`/user`}>
                    <Icon type="solution" style={{ fontSize: '26px', color: '#1890FE', float: "right", marginTop: "10px", marginRight: "10px" }} />
                </Link>

            </span>
            : <Icon type="user" style={{ fontSize: '28px', color: '#1890FE', float: "right", marginTop: "10px", marginRight: "10px" }} onClick={() => this.setModalVisible(true)} />
            ;
        return (
            <div>
            <div className="moHeaderdd"></div>
            <div className="moHeader">
                <div className="newshead">
                    <a href="#">
                        <img src={require("../../image/news.png")} alt="news" />
                    </a>
                    <span>MY News</span>
                    {userShow}
                </div>

                <Modal title="用户中心" wrapClassName="vertical-center-modal" visible={this.state.modalVisible}
                    onOk={() => this.setModalVisible(false)} onText="关闭"
                    onCancel={() => this.setModalVisible(false)}>
                    <Tabs type="card" onChange={this.callback.bind(this)} >
                        <TabPane tab={"登陆"} key={"1"}>
                            <Form layout={"horizontal"} onSubmit={this.handleSubmitLn.bind(this)}>
                                <FormItem label="账户">
                                    <Input type="text" placeholder="请输入您的账号" {...getFieldProps("userName")} />
                                </FormItem>
                                <FormItem label={"密码"}>
                                    <Input type="password" placeholder="请输入您的密码" {...getFieldProps("password")} />
                                </FormItem>
                                <Button type="primary" htmlType="submit" className="login">登陆</Button>
                            </Form>
                        </TabPane>
                        <TabPane tab={"注册"} key={"2"}>
                            <Form layout={"horizontal"} onSubmit={this.handleSubmit.bind(this)}>
                                <FormItem label="账户">
                                    <Input type="text" placeholder="请输入4到16位（字母，数字，下划线，减号）" {...getFieldProps("r_userName")} />
                                </FormItem>
                                <FormItem label={"密码"}>
                                    {/* {getFieldDecorator('密码',
                                        {
                                            rules: [{ required: true, message: '请输入密码' }],
                                            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/
                                        })(  <Input />)} */}

                                    <Input type="password" id="r_password" placeholder="请输入8～20字符，需同时包含英文和数字" {...getFieldProps("r_password")} />


                                </FormItem>
                                <FormItem label={"确认密码"}>
                                    <Input type="password"
                                        placeholder="请再次输入您的密码" {...getFieldProps("r_confirmPassword")} />
                                </FormItem>
                                <Button type="primary" htmlType="submit" className="zhuce">注册</Button>
                            </Form>
                        </TabPane>
                    </Tabs>
                </Modal>
            </div>
            </div>
        )
    }
}


export default MobileHeader = Form.create({})(MobileHeader);