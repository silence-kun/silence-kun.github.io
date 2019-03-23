import React from 'react';
import {Row, Col} from 'antd';
import "./PCFooter.less"

export default class PCFooter extends React.Component {

    render() {
        return (
            <footer>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20} className="footer">
                        &copy;&nbsp;201903 MY News. BY silence.
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </footer>
        );
    };
}
