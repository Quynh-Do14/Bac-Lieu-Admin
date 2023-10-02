import React, { useEffect, useState } from 'react'
import { MainLayout } from '../../infrastucture/common/components/layout/MainLayout'
import { ROUTE_PATH } from '../../core/common/appRouter'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../infrastucture/api';
import InputTextCommon from '../../infrastucture/common/components/input/input-text';
import { Button, Col, Row, Upload } from 'antd';
import { FullPageLoading } from '../../infrastucture/common/components/controls/loading';
import InputSelectCommon from '../../infrastucture/common/components/input/select-common';
import InputDateCommon from '../../infrastucture/common/components/input/input-date';
import InputTextAreaCommon from '../../infrastucture/common/components/input/input-text-area';
import UploadFileCommon from '../../infrastucture/common/components/input/upload-file';
import { WarningMessage } from '../../infrastucture/common/components/toast/notificationToast';
import { ButtonCommon } from '../../infrastucture/common/components/button/button-common';

export const AddNewsManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [submittedTime, setSubmittedTime] = useState();
    const [imageName, setImageName] = useState("");
    const [_data, _setData] = useState({});
    const dataNews = _data;

    const setDataNews = (data) => {
        Object.assign(dataNews, { ...data });
        _setData({ ...dataNews });
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
        navigate(ROUTE_PATH.NEWS)
    };

    const onCreateNews = async () => {
        var formdata = new FormData();
        await setSubmittedTime(Date.now());
        if (document.getElementById("file").files.length > 0) {
            formdata.append(
                "hinhAnh",
                document.getElementById("file").files[0],
                document.getElementById('file').value
            );
        }

        formdata.append("tieuDe", dataNews.tieuDe);
        formdata.append("status", 1);
        formdata.append("tieuDeCon", dataNews.tieuDeCon);
        formdata.append("moTaNgan", dataNews.moTaNgan);
        formdata.append("firstName", dataNews.firstName);
        formdata.append("chiTiet", dataNews.chiTiet);
        formdata.append("ngayDang", dataNews.ngayDang);
        formdata.append("luotXem", dataNews.luotXem || 0);
        formdata.append("soSaoTrungBinh", dataNews.soSaoTrungBinh || 0);
        formdata.append("diaChi", dataNews.diaChi);
        formdata.append("userId", dataNews.userId || 1);
        formdata.append("lat", 1);
        formdata.append("long", 1);
        formdata.append("geom", "POINT(-122.360 47.656)");
        if (isValidData()) {
            await api.createNews(
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
        <MainLayout breadcrumb={"Quản lý bài viết"} title={"Thêm bài viết"} redirect={ROUTE_PATH.NEWS}>
            <div className='flex flex-col header-page'>
                <div className='title-page pt-5 pb-7'>
                    Thêm mới bài viết
                </div>
            </div>
            <div className='main-page h-100 flex-1 auto bg-white px-8 py-4'>
                <div className='bg-white'>
                    <Row gutter={[10, 10]}>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputTextCommon
                                label={"Tiêu đề"}
                                attribute={"tieuDe"}
                                isRequired={true}
                                dataAttribute={dataNews.tieuDe}
                                setData={setDataNews}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputTextCommon
                                label={"Tiêu đề con"}
                                attribute={"tieuDeCon"}
                                isRequired={true}
                                dataAttribute={dataNews.tieuDeCon}
                                setData={setDataNews}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputTextAreaCommon
                                label={"Mô tả ngắn"}
                                attribute={"moTaNgan"}
                                isRequired={true}
                                dataAttribute={dataNews.moTaNgan}
                                setData={setDataNews}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputTextAreaCommon
                                label={"Chi tiết"}
                                attribute={"chiTiet"}
                                isRequired={true}
                                dataAttribute={dataNews.chiTiet}
                                setData={setDataNews}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                            <InputDateCommon
                                label={"Ngày đăng"}
                                attribute={"ngayDang"}
                                isRequired={true}
                                dataAttribute={dataNews.ngayDang}
                                setData={setDataNews}
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
                                dataAttribute={dataNews.diaChi}
                                setData={setDataNews}
                                disabled={false}
                                validate={validate}
                                setValidate={setValidate}
                                submittedTime={submittedTime}
                            />
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <UploadFileCommon
                                label={'Hình ảnh'}
                            // isRequired={true}
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
                        <ButtonCommon onClick={onCreateNews} classColor="blue">Thêm mới</ButtonCommon>
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </MainLayout >
    )
}
