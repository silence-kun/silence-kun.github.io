
import React from 'react';
import PCHeader from "../../components/PCHeader/PCHeader";
import { PCList } from "../../components/PCList/PCList";
export default class PCjunshi extends React.Component {
    render() {
        return (
            <div>
                <PCHeader keykey="junshi"></PCHeader>
                <PCList count={50} type="junshi"></PCList>
            </div>
        );
    };
}
