import React from 'react';
import axios from "axios"
import "./PCHeader.less"
import { Icon, Tabs, message, Form, Input, Button, Modal, Menu } from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
import { Link } from 'react-router-dom'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import PCShouye from "../PCShouye/PCShouye"
import { PCList } from "../PCList/PCList"

class PCHeader extends React.Component {
    state = {
        current: "top",
        modalVisible: false,
        action: 'login',
        hasLogined: false,
        userNickName: "",
        userId: 0,
        defaultkey: "1"
        // showlist: <PCShouye></PCShouye>
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

    // handleClick = (e) => {
    //     console.log('click ', e);
    //     switch (e.key) {
    //         case "1":
    //             this.setState({
    //                 showlist: <PCShouye></PCShouye>
    //             });
    //             break;
    //         case "2":
    //             this.setState({
    //                 showlist: <PCList count={20} type="shehui"></PCList>
    //             });
    //             break;
    //         case "3":
    //             this.setState({
    //                 showlist: <PCList count={20} type="guonei"></PCList>
    //             });
    //             break;
    //         case "4":
    //             this.setState({
    //                 showlist: <PCList count={20} type="guoji"></PCList>
    //             });
    //             break;
    //         case "5":
    //             this.setState({
    //                 showlist: <PCList count={20} type="tiyu"></PCList>
    //             });
    //             break;
    //         case "6":
    //             this.setState({
    //                 showlist: <PCList count={20} type="junshi"></PCList>
    //             });
    //             break;
    //         case "7":
    //             this.setState({
    //                 showlist: <PCList count={20} type="keji"></PCList>
    //             });
    //             break;

    //         default:
    //             this.setState({
    //                 showlist: <PCShouye></PCShouye>
    //             });
    //             break;
    //     }
    // }

    render() {
        let { getFieldProps, getFieldDecorator, getFieldsValue } = this.props.form;
        var user = sessionStorage.userNickName;
        const userShow = this.state.hasLogined ?
            <span className="logout">

                <Link to={`/user`}>
                    <Button type="primary" icon="user">{user}</Button>
                    {/* <Icon type="solution" style={{ fontSize: '26px', color: '#1890FE', float: "right", marginTop: "10px", marginRight: "10px" }} /> */}
                </Link>
                <Link to={`/home`}>
                    <Button type="dashed" icon="poweroff" onClick={this.logout.bind(this)}>登出</Button>
                    {/* <Icon type="logout" onClick={this.logout.bind(this)} style={{ fontSize: '24px', color: '#1890FE', float: "right", marginTop: "10px", marginRight: "10px" }} /> */}
                </Link>

            </span>
            :
            <div><Icon type="user" /><span onClick={() => this.setModalVisible(true)}>登录/注册</span></div>

            // <Icon type="user" style={{ fontSize: '28px', color: '#1890FE', float: "right", marginTop: "10px", marginRight: "10px" }} onClick={() => this.setModalVisible(true)} />
            ;
        const keykey = this.props.keykey
        return (
            <div className="pchead">
                <div className="posi1"></div>
                <div className="posi2">
                    <div className="pclogo">
                        <Link to={`/home`}>
                            <img src={require("../../image/news.png")} alt="news" />
                            <span>MY News</span>
                        </Link>

                    </div>
                    <div className="menudiv">
                        <Menu
                            onClick={this.handleClick}
                            defaultSelectedKeys={[keykey]}
                            mode="horizontal"
                        >
                            <Menu.Item key="1">
                                <Link to={`/home`}>
                                    <Icon type="global" />新闻首页
                            </Link>
                            </Menu.Item>
                            <Menu.Item key="shehui">
                                <Link to={`/home/shehui`}>
                                    <Icon type="global" />社会
                            </Link>
                            </Menu.Item>
                            <Menu.Item key="guonei">
                                <Link to={`/home/guonei`}>
                                    <Icon type="global" />国内
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="guoji">
                                <Link to={`/home/guoji`}>
                                    <Icon type="global" />国际
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="tiyu">
                                <Link to={`/home/tiyu`}>
                                    <Icon type="global" />体育
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="junshi">
                                <Link to={`/home/junshi`}>
                                    <Icon type="global" />军事
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="keji">
                                <Link to={`/home/keji`}>
                                    <Icon type="global" />科技
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="8">
                                {userShow}
                            </Menu.Item>
                        </Menu>
                        {/* <Tabs>
                        <TabPane tab="新闻首页" key={"1"}>
                            <PCShouye></PCShouye>
                        </TabPane>
                        <TabPane tab="社会" key={"2"} >
                            <PCList count={20} type="shehui"></PCList>
                        </TabPane>
                        <TabPane tab="国内" key={"3"} >
                            <PCList count={20} type="guonei"></PCList>
                        </TabPane>
                        <TabPane tab="国际" key={"4"} >
                            <PCList count={20} type="guoji" />
                        </TabPane>
                        <TabPane tab="体育" key={"5"} >
                            <PCList count={20} type="tiyu" />
                        </TabPane>
                        <TabPane tab="军事" key={"6"} >
                            <PCList count={20} type="junshi" />
                        </TabPane>
                        <TabPane tab="科技" key={"7"}>
                            <PCList count={20} type="keji" />
                        </TabPane>
                        <TabPane tab="科技" key={"8"}>
                        {userShow}
                        </TabPane>
                    </Tabs> */}
                    </div>
                </div>
                {/* <PCShouye></PCShouye> */}
                {/* {this.state.showlist} */}

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
        );
    }
}

export default PCHeader = Form.create({})(PCHeader);