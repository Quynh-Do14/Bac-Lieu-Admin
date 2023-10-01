/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Col, Input, Row } from 'antd';
import { validateFields } from '../../../utils/helper';
import { MessageError } from '../controls/MessageError';
import '../../../../assets/css/common/input.css'
import { validateEmail, validateInputPassword, validatePhoneNumber } from '../../../utils/validate';
const InputTextAuthCommon = (props) => {
    const {
        label,
        attribute,
        isRequired,
        setData,
        dataAttribute,
        disabled = false,
        size,
        validate,
        setValidate,
        submittedTime,
        isPassWord = false
    } = props;
    const [value, setValue] = useState("");

    const onChange = (e) => {
        setValue(e.target.value || "");
        setData({
            [attribute]: e.target.value || ''
        });
    };
    let labelLower = label?.toLowerCase();
    const onBlur = (isImplicitChange = false) => {
        let checkValidate
        if (isRequired) {
            validateFields(isImplicitChange, attribute, !value, setValidate, validate, !value ? `Vui lòng nhập ${labelLower}` : "");
        }

        if (attribute.includes("email")) {
            checkValidate = validateEmail(value);
            validateFields(isImplicitChange, attribute, !checkValidate, setValidate, validate, !checkValidate ? value ? `Vui lòng nhập đúng định dạng ${labelLower}` : `Vui lòng nhập ${labelLower}` : "");
        }
        if (attribute.includes("password")) {
            checkValidate = validateInputPassword(value);
            validateFields(isImplicitChange, attribute, !checkValidate, setValidate, validate, !checkValidate ? value ? `Mật khẩu bắt buộc có 8 kí tự và có kí tự đặc biệt` : `Vui lòng nhập ${labelLower}` : "");
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
    return (
        <div className='mb-4 input-auth-common'>
            {
                isPassWord
                    ?
                    <div>
                        <Input
                            size={size ? size : "middle"}
                            value={value ? value : ""}
                            onChange={onChange}
                            onBlur={() => onBlur(false)}
                            disabled={disabled}
                            placeholder={`Nhập ${label}`}
                        />
                        <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
                    </div>
                    :
                    <div>
                        <Input.Password
                            size={size ? size : "middle"}
                            value={value ? value : ""}
                            onChange={onChange}
                            onBlur={() => onBlur(false)}
                            disabled={disabled}
                            placeholder={`Nhập ${label}`}
                        />
                        <MessageError isError={validate[attribute]?.isError || false} message={validate[attribute]?.message || ""} />
                    </div>
            }

        </div>
    )
};
export default InputTextAuthCommon;