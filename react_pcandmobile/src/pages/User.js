
import  MobileHeader  from "../components/MobileHeader/MobileHeader";
import { Moblieback } from "../components/Moblieback/Moblieback";
import  Usercenter  from "../components/Usercenter/Usercenter";
export class User extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        
       return (<div>
            <MobileHeader></MobileHeader>
            <Moblieback></Moblieback>
            <Usercenter></Usercenter>
        </div>)
    }
}