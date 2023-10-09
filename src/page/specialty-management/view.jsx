import React, { useEffect, useState } from 'react'
import { MainLayout } from '../../infrastucture/common/components/layout/MainLayout'
import { ROUTE_PATH } from '../../core/common/appRouter'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../infrastucture/api';
import InputTextCommon from '../../infrastucture/common/components/input/input-text';
import { Button, Col, Row } from 'antd';
import { FullPageLoading } from '../../infrastucture/common/components/controls/loading';
import InputSelectDistrictCommon from '../../infrastucture/common/components/input/select-district';
import InputNumberCommon from '../../infrastucture/common/components/input/input-number';
import UploadFileCommon from '../../infrastucture/common/components/input/upload-file';
import InputTextAreaCommon from '../../infrastucture/common/components/input/input-text-area';
import InputTimePickerCommon from '../../infrastucture/common/components/input/input-timepicker';
import InputSelectCategoryCommon from '../../infrastucture/common/components/input/select-category';
import { WarningMessage } from '../../infrastucture/common/components/toast/notificationToast';
import { ButtonCommon } from '../../infrastucture/common/components/button/button-common';

export const ViewSpecialtyManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [detailLocation, setDetailLocation] = useState({});
    const [submittedTime, setSubmittedTime] = useState();
    const [imageName, setImageName] = useState("");

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
    useEffect(() => {
        if (detailLocation) {
            setDataLocation({
                tenDiaDiem: detailLocation.tenDiaDiem,
                status: 1,
                diaChi: detailLocation.diaChi,
                uriVideo: detailLocation.uriVideo,
                moTa: detailLocation.moTa,
                uriBaiViet: detailLocation.uriBaiViet,
                idQuanHuyen: detailLocation.idQuanHuyen,
                idDanhMuc: detailLocation.idDanhMuc,
                idDiaDiem: detailLocation.idDiaDiem,
                soSaoTrungBinh: detailLocation.soSaoTrungBinh,
                emailLienHe: detailLocation.emailLienHe,
                sdtLienHe: detailLocation.sdtLienHe,
                gioMoCua: detailLocation.gioMoCua,
                gioDongCua: detailLocation.gioDongCua,
                thoiGianGhe: detailLocation.thoiGianGhe,
                luotXem: detailLocation.luotXem,
                lat: detailLocation.lat,
                long: detailLocation.long,
                geom: detailLocation.geom,
                hinhAnh: detailLocation.hinhAnh

            });
        };
    }, [detailLocation]);

    // const handleUpload = async () => {
    //     var formdata = new FormData();
    //     formdata.append(
    //         "file",
    //         document.getElementById("file").files[0],
    //         document.getElementById('file').value
    //     );
    //     formdata.append('status', 1);
    //     formdata.append('idTintuc', 1);
    //     formdata.append('idDiaDiem', 1);
    //     let request = await api.upload(formdata,
    //         setLoading
    //     )
    //     setImageName(request.data.link)
    // };

    const param = useParams();
    const onDetailLocationAsync = async () => {
        const response = await api.getLocationById({
            id: param.id,

        },
            setLoading
        )
        setDetailLocation(response.diaDiem);
    };
    useEffect(() => {
        onDetailLocationAsync();
    }, []);

    const onBack = () => {
        navigate(ROUTE_PATH.SPECIALTY)
    };

    const onUpdateLocation = async () => {
        var formdata = new FormData();
        console.log('document.getElementById("file").files', document.getElementById("file").value);
        await setSubmittedTime(Date.now());
        if (document.getElementById("file").files.length > 0) {
            formdata.append(
                "hinhAnh",
                document.getElementById("file").files[0],
                document.getElementById('file').value
            );
        }
        else {
            formdata.append("hinhAnh", detailLocation.hinhAnh);
        }
        formdata.append("tenDiaDiem", dataLocation.tenDiaDiem);
        formdata.append("status", 1);
        formdata.append("diaChi", dataLocation.diaChi);
        formdata.append("uriVideo", dataLocation.uriVideo);
        formdata.append("moTa", dataLocation.moTa);
        formdata.append("uriBaiViet", dataLocation.uriBaiViet);
        formdata.append("idQuanHuyen", dataLocation.idQuanHuyen);
        formdata.append("idDanhMuc", dataLocation.idDanhMuc);
        formdata.append("idDiaDiem", dataLocation.idDiaDiem);
        formdata.append("soSaoTrungBinh", dataLocation.soSaoTrungBinh);
        formdata.append("emailLienHe", dataLocation.emailLienHe);
        formdata.append("sdtLienHe", dataLocation.sdtLienHe);
        formdata.append("gioMoCua", dataLocation.gioMoCua);
        formdata.append("gioDongCua", dataLocation.gioDongCua);
        formdata.append("thoiGianGhe", dataLocation.thoiGianGhe);
        formdata.append("luotXem", dataLocation.luotXem);
        formdata.append("lat", 1);
        formdata.append("long", 1);
        formdata.append("geom", "POINT(-122.360 47.656)");
        if (isValidData()) {
            await api.updateLocation(
                parseInt(param.id),
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
        <MainLayout breadcrumb={"Quản lý đặc sản"} title={"Xem chi tiết"} redirect={ROUTE_PATH.SPECIALTY}>
            <div className='flex flex-col header-page'>
                <div className='title-page pt-5 pb-7'>
                    Xem thông tin chi tiết đặc sản
                </div>
            </div>
            <div className='main-page h-100 flex-1 auto bg-white px-8 py-4'>
                <div className='bg-white'>
                    <Row gutter={[10, 10]}>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputTextCommon
                                label={"Tên đặc sản"}
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
                        {/* <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputTimePickerCommon
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
                            <InputTimePickerCommon
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
                        </Col> */}
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputNumberCommon
                                label={"Thời gian ghé"}
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
                        <ButtonCommon onClick={onUpdateLocation} classColor="blue">Thêm mới</ButtonCommon>
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </MainLayout >
    )
}
