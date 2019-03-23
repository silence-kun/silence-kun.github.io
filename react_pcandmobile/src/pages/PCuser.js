
import PCHeader from "../components/PCHeader/PCHeader";
import Usercenter from "../components/Usercenter/Usercenter";
import "../style/PCNewsDetails.less"
export class PCuser extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (<div>
            <PCHeader keykey="8"></PCHeader>
            <div className="pcuser">
                <Usercenter></Usercenter>
            </div>

        </div>)
    }
}