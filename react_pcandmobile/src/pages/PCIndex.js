import React from 'react';
import PCHeader from "../components/PCHeader/PCHeader";
import PCShouye from "../components/PCShouye/PCShouye";
import MobileHeader from "../components/MobileHeader/MobileHeader";

export default class PCIndex extends React.Component {
    render() {
        return (
            <div>
                <PCHeader  keykey="1"></PCHeader>
                <PCShouye></PCShouye>
            </div>
        );
    };
}
