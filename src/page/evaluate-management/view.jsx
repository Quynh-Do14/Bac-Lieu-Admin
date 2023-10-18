import React, { useEffect, useState } from 'react'
import { MainLayout } from '../../infrastucture/common/components/layout/MainLayout'
import { ROUTE_PATH } from '../../core/common/appRouter'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../infrastucture/api';
import InputTextCommon from '../../infrastucture/common/components/input/input-text';
import { Col, Row } from 'antd';
import { FullPageLoading } from '../../infrastucture/common/components/controls/loading';
import InputDateCommon from '../../infrastucture/common/components/input/input-date';
import { WarningMessage } from '../../infrastucture/common/components/toast/notificationToast';
import { ButtonCommon } from '../../infrastucture/common/components/button/button-common';
import InputTextAreaCommon from '../../infrastucture/common/components/input/input-text-area';
import InputNumberCommon from '../../infrastucture/common/components/input/input-number';

export const ViewEvaluateManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [detailEvaluate, setDetailEvaluate] = useState({});
    const [submittedTime, setSubmittedTime] = useState();

    const [_data, _setData] = useState({});
    const dataEvaluate = _data;

    const setDataEvaluate = (data) => {
        Object.assign(dataEvaluate, { ...data });
        _setData({ ...dataEvaluate });
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


    const navigate = useNavigate();
    useEffect(() => {
        if (detailEvaluate) {
            setDataEvaluate({
                idUser: detailEvaluate.idUser,
                soSao: detailEvaluate.soSao,
                noiDung: detailEvaluate.noiDung,
                thoiGianDanhGia: detailEvaluate.thoiGianDanhGia,
                idDiaDiem: detailEvaluate.idDiaDiem,
                idTinTuc: detailEvaluate.idTinTuc,
                idTour: detailEvaluate.idTour,
            });
        };
    }, [detailEvaluate]);
    const param = useParams();
    const onDetailEvaluateAsync = async () => {
        const response = await api.getEvaluateById({
            id: param.id,

        },
            setLoading
        )
        setDetailEvaluate(response.danhGia);
    };
    useEffect(() => {
        onDetailEvaluateAsync();
    }, []);

    const onBack = () => {
        navigate(ROUTE_PATH.EVALUATE)
    };

    const onUpdateEvaluate = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await api.updateEvaluate({
                id: parseInt(param.id),
                idUser: dataEvaluate.idUser,
                soSao: dataEvaluate.soSao,
                noiDung: dataEvaluate.noiDung,
                thoiGianDanhGia: dataEvaluate.thoiGianDanhGia,
                idDiaDiem: dataEvaluate.idDiaDiem,
                idTinTuc: dataEvaluate.idTinTuc,
                idTour: dataEvaluate.idTour,
            },
                onBack,
                setLoading
            )
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        };
    };

    return (
        <MainLayout breadcrumb={"Quản lý đánh giá"} title="Xem chi tiết" redirect={ROUTE_PATH.EVALUATE}>
            <div className='flex flex-col header-page'>
                <div className='title-page pt-5 pb-7'>
                    Xem thông tin chi tiết đánh giá
                </div>
            </div>
            <div className='main-page h-100 flex-1 auto bg-white px-8 py-4'>
                <div className='bg-white'>
                    <Row gutter={[10, 10]}>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputNumberCommon
                                label={"Số sao"}
                                attribute={"soSao"}
                                isRequired={true}
                                dataAttribute={dataEvaluate.soSao}
                                setData={setDataEvaluate}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                                max={5}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputDateCommon
                                label={"Thời gian đánh giá"}
                                attribute={"thoiGianDanhGia"}
                                isRequired={true}
                                dataAttribute={dataEvaluate.thoiGianDanhGia}
                                setData={setDataEvaluate}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <InputTextAreaCommon
                                label={"Nội dung"}
                                attribute={"noiDung"}
                                isRequired={true}
                                dataAttribute={dataEvaluate.noiDung}
                                setData={setDataEvaluate}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
            <div className='container-btn main-page bg-white p-4 flex flex-col '>
                <Row justify={"center"}>
                    <Col className='mx-1'>
                        <ButtonCommon onClick={onBack} classColor="grey">Quay lại</ButtonCommon>
                    </Col>
                    <Col className='mx-1'>
                        <ButtonCommon onClick={onUpdateEvaluate} classColor="blue">Cập nhật</ButtonCommon>
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </MainLayout >
    )
}
