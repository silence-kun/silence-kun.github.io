import React from 'react';
import PCHeader from "../../components/PCHeader/PCHeader";
import { PCList } from "../../components/PCList/PCList";
export default class PCshehui extends React.Component {
    render() {
        return (
            <div>
                <PCHeader keykey="shehui"></PCHeader>
                <PCList count={50} type="shehui"></PCList>
            </div>
        );
    };
}
