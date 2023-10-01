import React from 'react'
import { Button, Col, Modal, Row } from 'antd';
import "../../../../assets/css/common/modal.css"
const DialogConfirmCommon = (props) => {
    const { title, message, titleCancel, titleOk, handleOk, handleCancel, visible, isLoading = false } = props;

    return (
        <div>
            <Modal
                key={"f-0"}
                centered
                visible={visible}
                closable={false}
                footer={false}
                onCancel={() => handleCancel()}
            >
                <div className='modal'>
                    <div className='mb-2 title'>{title}</div>
                    <div className='mb-2-5 message'>{message}</div>
                    <Row justify={"center"}>
                        <Col>
                            <Button className={"btn-Cancel mx-2"} type='text' key="f-2" onClick={() => handleCancel()}>{titleCancel}</Button>
                        </Col>
                        <Col>
                            <Button disabled={isLoading} type='text' className={"btn-ok mx-2"} key="f-1" onClick={() => handleOk()}>{titleOk}</Button>
                        </Col>
                    </Row>
                </div>
            </Modal>
        </div>
    )
}
export default DialogConfirmCommon;