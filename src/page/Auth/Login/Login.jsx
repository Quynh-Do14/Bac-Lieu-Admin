
import React, { useEffect, useState } from 'react'
import "../../../assets/css/components/Login.css";
import { ROUTE_PATH } from '../../../core/common/appRouter';
import { useNavigate } from 'react-router-dom';
import api from '../../../infrastucture/api';
import { FullPageLoading } from '../../../infrastucture/common/components/controls/loading';
import Constants from '../../../core/common/constant';
import { Row, Col } from 'antd';
import { WarningMessage } from '../../../infrastucture/common/components/toast/notificationToast';
import InputTextAuthCommon from '../../../infrastucture/common/components/input/input-text-auth';
export const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [submittedTime, setSubmittedTime] = useState();
    const [validate, setValidate] = useState({});


    const navigate = useNavigate();

    let storage = sessionStorage.getItem(Constants.TOKEN);
    useEffect(() => {
        if (storage) {
            navigate(ROUTE_PATH.MAINLAYOUT);
        };
    }, [])

    const [_data, _setData] = useState({});
    const dataAuth = _data;

    const setDataAuth = (data) => {
        Object.assign(dataAuth, { ...data });
        _setData({ ...dataAuth });
    };

    const isValidData = () => {
        let allRequestOK = true;

        setValidate({ ...validate });

        Object.values(validate).forEach((it) => {
            if (it.isError === true) {
                allRequestOK = false;
            }
        });

        return allRequestOK;
    };



    const onSubmit = async (e) => {
        await setSubmittedTime(Date.now());
        e.preventDefault();
        if (isValidData()) {
            const login = await api.login({
                email: dataAuth.email,
                password: dataAuth.password,
            },
                setLoading
            );
            if (login.success == true) {
                sessionStorage.setItem(Constants.TOKEN, login.data.token)
                navigate(ROUTE_PATH.MAINLAYOUT);
            }
            return false;
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    }
    return (
        <div>
            <div className='login'>
                <div className={"container"} id="container">
                    <div className="form-container sign-in-container">
                        <div className='form-flex'>
                            <h1 className='mb-4'>Đăng nhập</h1>
                            <Row>
                                <Col span={24}>
                                    <InputTextAuthCommon
                                        label={"Email"}
                                        attribute={"email"}
                                        isRequired={true}
                                        dataAttribute={dataAuth.email}
                                        setData={setDataAuth}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        isPassWord={true}
                                    />
                                </Col>
                                <Col span={24}>
                                    <InputTextAuthCommon
                                        label={"Mật khẩu"}
                                        attribute={"password"}
                                        isRequired={true}
                                        dataAttribute={dataAuth.password}
                                        setData={setDataAuth}
                                        disabled={false}
                                        validate={validate}
                                        setValidate={setValidate}
                                        submittedTime={submittedTime}
                                        isPassWord={false}
                                    />
                                </Col>
                            </Row>
                            <button onClick={onSubmit}>Đăng nhập</button>
                        </div>
                    </div>
                    <div className="overlay-container">
                        <div className="overlay">
                        </div>
                    </div>
                </div>

            </div>
            <FullPageLoading isLoading={loading} />
        </div>
    )
}
