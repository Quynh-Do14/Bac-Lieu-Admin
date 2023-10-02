/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Upload } from 'antd';
import { MessageError } from '../controls/MessageError';
import '../../../../assets/css/common/input.css'
import { API, PUBLIC } from '../../../../core/common/apiLinks';
import { UploadOutlined } from '@ant-design/icons';
import { ButtonCommon } from '../button/button-common';
const UploadFileCommon = (props) => {
    const {
        label,
        isRequired,
        dataAttribute,
        handleUpload
    } = props;
    const [value, setValue] = useState("");

    useEffect(() => {
        setValue(dataAttribute || '');

    }, [dataAttribute]);
    return (
        <div>
            <Row className='mb-4 input-common'>
                <Col xs={24} sm={10} lg={5} xl={3} className='title'>
                    <span >
                        <span className='label'>{label}</span>
                        <span className='ml-1 is-required'>{isRequired ? "*" : ""} </span>
                    </span>
                </Col>
                <Col>
                    <input
                        type='file'
                        // onChange={handleUpload}
                        id='file'
                        multiple
                    />
                    {/* <Upload id='file' {...props}>
                        <ButtonCommon classColor="blue" icon={<UploadOutlined />}>Tải lên</ButtonCommon>
                    </Upload> */}
                    <img className='flex' src={`${API}${PUBLIC}/${dataAttribute}`} alt="" width={80} />
                </Col>
            </Row>
        </div>
    )
};
export default UploadFileCommon;