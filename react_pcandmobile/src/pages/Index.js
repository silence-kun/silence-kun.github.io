import {Route,Switch,Redirect,HashRouter} from "react-router-dom"
import { MobileIndex } from "./MobileIndex";
import { User } from "./User";
import { PCuser } from "./PCuser";
import { MobileNewsDetails } from "./MobileNewsDetails";
import  PCIndex  from "./PCIndex";
import PCshehui from "./menu/PCshehui"
import PCguonei from "./menu/PCguonei"
import PCguoji from "./menu/PCguoji"
import PCtiyu from "./menu/PCtiyu"
import PCjunshi from "./menu/PCjunshi"
import PCkeji from "./menu/PCkeji"
import  PCNewsDetails  from "./PCNewsDetails";


import MediaQuery from 'react-responsive';
export class Index extends React.Component{
    render(){
        return (
            <div>
               

                <MediaQuery query='(min-device-width:1224px)'>
                    <Switch>
                        <Redirect from="/" exact={true} to="/home" />
                        <Route path="/home" exact={true} component={PCIndex} />
                        <Route path="/home/shehui" component={PCshehui} />
                        <Route path="/home/guonei" component={PCguonei} />
                        <Route path="/home/guoji" component={PCguoji} />
                        <Route path="/home/tiyu" component={PCtiyu} />
                        <Route path="/home/junshi" component={PCjunshi} />
                        <Route path="/home/keji" component={PCkeji} />
                        <Route path="/details/:realtype/:uniquekey" component={PCNewsDetails} />
                        <Route path="/user" component={PCuser} />
                        {/* <Route path="/user" component={User} /> */}
                    </Switch>
                </MediaQuery>
                <MediaQuery query='(max-device-width:1224px)'>
                    <Switch>
                        <Redirect from="/" exact={true} to="/home" />
                        <Route path="/home" component={MobileIndex} />
                        <Route path="/details/:realtype/:uniquekey" component={MobileNewsDetails} />
                        <Route path="/user" component={User} />
                    </Switch>
                </MediaQuery>
            </div>
        )
    }
}