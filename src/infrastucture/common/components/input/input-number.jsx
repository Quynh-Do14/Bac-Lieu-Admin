/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Col, InputNumber, Row } from 'antd';
import { MessageError } from '../controls/MessageError';
import { validateFields } from '../../../utils/helper';
import '../../../../assets/css/common/input.css'

const InputNumberCommon = (props) => {
    const {
        label,
        attribute,
        setData,
        submittedTime,
        validate,
        setValidate,
        isRequired,
        dataAttribute,
        disabled = false,
    } = props;
    const [value, setValue] = useState(null);

    const onChange = (val) => {
        setValue(val || null);
        setData({
            [attribute]: val || null
        });
    }
    let labelLower = label.toLowerCase();
    const onBlur = (isImplicitChange = false) => {
        if (isRequired) {
            validateFields(isImplicitChange, attribute, !(value != null), setValidate, validate, !(value != null) ? `Vui lòng nhập ${labelLower}` : "");

        }
    };

    useEffect(() => {
        setValue(dataAttribute || '');

    }, [dataAttribute]);

    useEffect(() => {

        if (submittedTime != null) {
            onBlur(true);
        }
    }, [submittedTime]);

    const formatterNumber = (val) => {
        if (!val) return "";
        return `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".").replace(/\.(?=\d{0,2}$)/g, ",");
    };

    const parserNumber = (val) => {
        if (!val) return "";
        return Number.parseFloat(val.replace(/\$\s?|(\.*)/g, "").replace(/(\,{1})/g, ".")).toFixed(2);
    };

    return (
        <Row className='mb-4 input-common'>
            <Col xs={24} sm={10} lg={10} xl={6} className='title'>
                <span >
                    <span className='label'>{label}</span>
                    <span className='ml-1 is-required'>{isRequired ? "*" : ""} </span>
                </span>
            </Col>
            <Col xs={24} sm={14} lg={14} xl={18}>
                <InputNumber
                    min={0}
                    max={null}
                    className='w-100'
                    disabled={disabled}
                    formatter={formatterNumber}
                    parser={parserNumber}
                    value={value ? value : ""}
                    onChange={onChange}
                    onBlur={() => onBlur(false)}
                    placeholder={`Nhập ${label}`}
                />
                <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
            </Col>
        </Row>

    )

}
export default InputNumberCommon;