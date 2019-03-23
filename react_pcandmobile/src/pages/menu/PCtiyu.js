
import React from 'react';
import PCHeader from "../../components/PCHeader/PCHeader";
import { PCList } from "../../components/PCList/PCList";
export default class PCtiyu extends React.Component {
    render() {
        return (
            <div>
                <PCHeader keykey="tiyu"></PCHeader>
                <PCList count={50} type="tiyu"></PCList>
            </div>
        );
    };
}
