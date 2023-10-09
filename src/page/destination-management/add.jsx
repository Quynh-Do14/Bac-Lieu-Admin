import React, { useEffect, useState } from 'react'
import { MainLayout } from '../../infrastucture/common/components/layout/MainLayout'
import { ROUTE_PATH } from '../../core/common/appRouter'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../infrastucture/api';
import InputTextCommon from '../../infrastucture/common/components/input/input-text';
import { Button, Col, Row } from 'antd';
import { FullPageLoading } from '../../infrastucture/common/components/controls/loading';
import InputTextAreaCommon from '../../infrastucture/common/components/input/input-text-area';
import InputNumberCommon from '../../infrastucture/common/components/input/input-number';
import InputTimePickerCommon from '../../infrastucture/common/components/input/input-timepicker';
import UploadFileCommon from '../../infrastucture/common/components/input/upload-file';
import InputSelectDistrictCommon from '../../infrastucture/common/components/input/select-district';
import { WarningMessage } from '../../infrastucture/common/components/toast/notificationToast';
import Constants from '../../core/common/constant';
import { ButtonCommon } from '../../infrastucture/common/components/button/button-common';

export const AddDestinationManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [submittedTime, setSubmittedTime] = useState();
    const [_data, _setData] = useState({});
    const dataLocation = _data;

    const setDataLocation = (data) => {
        Object.assign(dataLocation, { ...data });
        _setData({ ...dataLocation });
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

    const onBack = () => {
        navigate(ROUTE_PATH.DESTINATION)
    };

    const onCreateLocation = async () => {
        var formdata = new FormData();
        await setSubmittedTime(Date.now());
        if (document.getElementById("file").files.length > 0) {
            formdata.append(
                "hinhAnh",
                document.getElementById("file").files[0],
                document.getElementById('file').value
            );
        };
        formdata.append("tenDiaDiem", dataLocation.tenDiaDiem);
        formdata.append("status", 1);
        formdata.append("diaChi", dataLocation.diaChi);
        formdata.append("uriVideo", dataLocation.uriVideo);
        formdata.append("moTa", dataLocation.moTa);
        formdata.append("uriBaiViet", dataLocation.uriBaiViet);
        formdata.append("idQuanHuyen", dataLocation.idQuanHuyen);
        formdata.append("idDanhMuc", Constants.CategoryConfig.Destination.value);
        formdata.append("soSaoTrungBinh", dataLocation.soSaoTrungBinh || 0);
        formdata.append("emailLienHe", dataLocation.emailLienHe);
        formdata.append("sdtLienHe", dataLocation.sdtLienHe);
        formdata.append("gioMoCua", dataLocation.gioMoCua);
        formdata.append("gioDongCua", dataLocation.gioDongCua);
        formdata.append("thoiGianGhe", dataLocation.thoiGianGhe);
        formdata.append("luotXem", dataLocation.luotXem || 0);
        formdata.append("giaVe", dataLocation.giaVe)
        formdata.append("lat", 1);
        formdata.append("long", 1);
        formdata.append("geom", "POINT(-122.360 47.656)");
        if (isValidData()) {
            await api.createLocation(
                formdata,
                onBack,
                setLoading
            )
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        }
    };

    return (
        <MainLayout breadcrumb={"Quản lý điểm đến"} title={"Thêm điểm đến"} redirect={ROUTE_PATH.DESTINATION}>
            <div className='flex flex-col header-page'>
                <div className='title-page pt-5 pb-7'>
                    Thêm mới điểm đến
                </div>
            </div>
            <div className='main-page h-100 flex-1 auto bg-white px-8 py-4'>
                <div className='bg-white'>
                    <Row gutter={[10, 10]}>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputTextCommon
                                label={"Tên điểm đến"}
                                attribute={"tenDiaDiem"}
                                isRequired={true}
                                dataAttribute={dataLocation.tenDiaDiem}
                                setData={setDataLocation}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputTextCommon
                                label={"Địa chỉ"}
                                attribute={"diaChi"}
                                isRequired={true}
                                dataAttribute={dataLocation.diaChi}
                                setData={setDataLocation}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputTextCommon
                                label={"URL Video"}
                                attribute={"uriVideo"}
                                isRequired={true}
                                dataAttribute={dataLocation.uriVideo}
                                setData={setDataLocation}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputTextCommon
                                label={"URL bài viết"}
                                attribute={"uriBaiViet"}
                                isRequired={true}
                                dataAttribute={dataLocation.uriBaiViet}
                                setData={setDataLocation}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputSelectDistrictCommon
                                label={"Quận huyện"}
                                attribute={"idQuanHuyen"}
                                isRequired={true}
                                dataAttribute={dataLocation.idQuanHuyen}
                                setData={setDataLocation}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}

                            />
                        </Col>
                        {/* <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputSelectCategoryCommon
                                label={"Danh mục"}
                                attribute={"idDanhMuc"}
                                isRequired={true}
                                dataAttribute={dataLocation.idDanhMuc}
                                setData={setDataLocation}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}

                            />
                        </Col> */}
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputTextCommon
                                label={"Email liên hệ"}
                                attribute={"emailLienHe"}
                                isRequired={true}
                                dataAttribute={dataLocation.emailLienHe}
                                setData={setDataLocation}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputTextCommon
                                label={"Giờ mở cửa"}
                                attribute={"gioMoCua"}
                                isRequired={true}
                                dataAttribute={dataLocation.gioMoCua}
                                setData={setDataLocation}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputTextCommon
                                label={"Giờ đóng cửa"}
                                attribute={"gioDongCua"}
                                isRequired={true}
                                dataAttribute={dataLocation.gioDongCua}
                                setData={setDataLocation}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputTextCommon
                                label={"Dữ liệu ảnh"}
                                attribute={"thoiGianGhe"}
                                isRequired={true}
                                dataAttribute={dataLocation.thoiGianGhe}
                                setData={setDataLocation}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputTextCommon
                                label={"Giá vé"}
                                attribute={"giave"}
                                isRequired={true}
                                dataAttribute={dataLocation.giave}
                                setData={setDataLocation}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputTextCommon
                                label={"SĐT liên hệ"}
                                attribute={"sdtLienHe"}
                                isRequired={true}
                                dataAttribute={dataLocation.sdtLienHe}
                                setData={setDataLocation}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputTextAreaCommon
                                label={"Mô tả"}
                                attribute={"moTa"}
                                isRequired={true}
                                dataAttribute={dataLocation.moTa}
                                setData={setDataLocation}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <UploadFileCommon
                                label={'Hình ảnh'}
                            // handleUpload={handleUpload}
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
                        <ButtonCommon onClick={onCreateLocation} classColor="blue">Thêm mới</ButtonCommon>
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </MainLayout >
    )
}
