import "./Moblieback.less"
import { Icon } from 'antd';
import {  Link } from 'react-router-dom';


export class Moblieback extends React.Component {
    render() {
        return (
            <div>
                <div className="backkb"></div>
                <div className="head">
                    <div className="back">
                     <Link to={`/home`}>
                        <Icon type="left" />back
                        </Link>
                    </div>
                    
                </div>
            </div>

        );
    }

}