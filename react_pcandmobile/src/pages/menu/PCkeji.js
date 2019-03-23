
import React from 'react';
import PCHeader from "../../components/PCHeader/PCHeader";
import { PCList } from "../../components/PCList/PCList";
export default class PCkeji extends React.Component {
    render() {
        return (
            <div>
                <PCHeader keykey="keji"></PCHeader>
                <PCList count={50} type="keji"></PCList>
            </div>
        );
    };
}
