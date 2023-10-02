import React, { useEffect, useState } from 'react'
import { MainLayout } from '../../infrastucture/common/components/layout/MainLayout'
import { ROUTE_PATH } from '../../core/common/appRouter'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../infrastucture/api';
import InputTextCommon from '../../infrastucture/common/components/input/input-text';
import { Button, Col, Row } from 'antd';
import { FullPageLoading } from '../../infrastucture/common/components/controls/loading';
import InputDateCommon from '../../infrastucture/common/components/input/input-date';
import InputNumberCommon from '../../infrastucture/common/components/input/input-number';
import { WarningMessage } from '../../infrastucture/common/components/toast/notificationToast';
import { ButtonCommon } from '../../infrastucture/common/components/button/button-common';

export const ViewTourManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [detailTour, setDetailTour] = useState({});
    const [submittedTime, setSubmittedTime] = useState();

    const [_data, _setData] = useState({});
    const dataTour = _data;

    const setDataTour = (data) => {
        Object.assign(dataTour, { ...data });
        _setData({ ...dataTour });
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
        if (detailTour) {
            setDataTour({
                tenTour: detailTour.tenTour,
                chiPhi: detailTour.chiPhi,
                status: detailTour.status,
                ngayBatDau: detailTour.ngayBatDau,
                ngayKetThuc: detailTour.ngayKetThuc,
                khoangCach: detailTour.khoangCach,
                soDiaDiem: detailTour.soDiaDiem,
                soNgay: detailTour.soNgay,
                luotXem: detailTour.luotXem,
                userId: detailTour.userId
            });
        };
    }, [detailTour]);
    const param = useParams();
    const onDetailTourAsync = async () => {
        const response = await api.getTourById({
            id: param.id,

        },
            setLoading
        )
        setDetailTour(response.tour);
    };
    useEffect(() => {
        onDetailTourAsync();
    }, []);

    const onBack = () => {
        navigate(ROUTE_PATH.TOUR)
    };

    const onUpdateTour = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await api.updateTour({
                id: parseInt(param.id),
                tenTour: dataTour.tenTour,
                status: dataTour.status,
                chiPhi: dataTour.chiPhi,
                ngayBatDau: dataTour.ngayBatDau,
                ngayKetThuc: dataTour.ngayKetThuc,
                khoangCach: parseInt(dataTour.khoangCach),
                soDiaDiem: parseInt(dataTour.soDiaDiem),
                soNgay: parseInt(dataTour.soNgay),
                luotXem: dataTour.luotXem,
                userId: dataTour.userId
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
        <MainLayout breadcrumb={"Quản lý lịch trình"} title={"Xem chi tiết"} redirect={ROUTE_PATH.TOUR}>
            <div className='flex flex-col header-page'>
                <div className='title-page pt-5 pb-7'>
                    Xem thông tin chi tiết lịch trình
                </div>
            </div>
            <div className='main-page h-100 flex-1 auto bg-white px-8 py-4'>
                <div className='bg-white'>
                    <Row gutter={[10, 10]}>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputTextCommon
                                label={"Tên lịch trình"}
                                attribute={"tenTour"}
                                isRequired={true}
                                dataAttribute={dataTour.tenTour}
                                setData={setDataTour}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputTextCommon
                                label={"Chi phí"}
                                attribute={"chiPhi"}
                                isRequired={true}
                                dataAttribute={dataTour.chiPhi}
                                setData={setDataTour}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputDateCommon
                                label={"Ngày bắt đầu"}
                                attribute={"ngayBatDau"}
                                isRequired={true}
                                dataAttribute={dataTour.ngayBatDau}
                                setData={setDataTour}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputDateCommon
                                label={"Ngày kết thúc"}
                                attribute={"ngayKetThuc"}
                                isRequired={true}
                                dataAttribute={dataTour.ngayKetThuc}
                                setData={setDataTour}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputNumberCommon
                                label={"Khoảng cách"}
                                attribute={"khoangCach"}
                                isRequired={true}
                                dataAttribute={dataTour.khoangCach}
                                setData={setDataTour}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputNumberCommon
                                label={"Số địa điểm"}
                                attribute={"soDiaDiem"}
                                isRequired={true}
                                dataAttribute={dataTour.soDiaDiem}
                                setData={setDataTour}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputNumberCommon
                                label={"Số ngày"}
                                attribute={"soNgay"}
                                isRequired={true}
                                dataAttribute={dataTour.soNgay}
                                setData={setDataTour}
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
                        <ButtonCommon onClick={onUpdateTour} classColor="blue">Thêm mới</ButtonCommon>
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </MainLayout >
    )
}
