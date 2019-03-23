
import React from 'react';
import PCHeader from "../../components/PCHeader/PCHeader";
import { PCList } from "../../components/PCList/PCList";
export default class PCguonei extends React.Component {
    render() {
        return (
            <div>
                <PCHeader keykey="guonei"></PCHeader>
                <PCList count={50} type="guonei"></PCList>
            </div>
        );
    };
}
