/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Col, Image, Row, Upload } from 'antd';
import '../../../../assets/css/common/input.css'
import { API, PUBLIC } from '../../../../core/common/apiLinks';
const UploadFileCommon = (props) => {
    const {
        label,
        isRequired,
        dataAttribute,
    } = props;
    const [value, setValue] = useState("");
    // useEffect(() => {
    //     setValue(dataAttribute || '');

    // }, [dataAttribute]);
    return (
        <div>
            <Row className='mb-4 input-common'>
                <Col xs={24} sm={10} lg={5} xl={3} className='title'>
                    <span >
                        <span className='label'>{label}</span>
                        <span className='ml-1 is-required'>{isRequired ? "*" : ""} </span>
                    </span>
                </Col>
                <Col xs={24} sm={14} lg={19} xl={21}>
                    <input
                        type='file'
                        // onChange={handleUpload}
                        id='file'
                        multiple
                    />
                    {/* <Upload id='file' {...props}>
                        <ButtonCommon classColor="blue" icon={<UploadOutlined />}>Tải lên</ButtonCommon>
                    </Upload> */}
                    {
                        dataAttribute
                        &&
                        <div className='flex justify-start'>
                            <Image src={dataAttribute.includes("http") ? dataAttribute : `${API}${PUBLIC}/${dataAttribute}`} alt="" width={200} />
                        </div>
                    }

                </Col>
            </Row>
        </div>
    )
};
export default UploadFileCommon;