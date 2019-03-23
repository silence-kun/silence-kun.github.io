
import React from 'react';
import PCHeader from "../../components/PCHeader/PCHeader";
import { PCList } from "../../components/PCList/PCList";
export default class PCguoji extends React.Component {
    render() {
        return (
            <div>
                <PCHeader keykey="guoji"></PCHeader>
                <PCList count={50} type="guoji"></PCList>
            </div>
        );
    };
}
