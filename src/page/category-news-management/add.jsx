import React, { useEffect, useState } from 'react'
import { MainLayout } from '../../infrastucture/common/components/layout/MainLayout'
import { ROUTE_PATH } from '../../core/common/appRouter'
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../infrastucture/api';
import InputTextCommon from '../../infrastucture/common/components/input/input-text';
import { Button, Col, Row } from 'antd';
import { FullPageLoading } from '../../infrastucture/common/components/controls/loading';
import { WarningMessage } from '../../infrastucture/common/components/toast/notificationToast';
import { ButtonCommon } from '../../infrastucture/common/components/button/button-common';
import Constants from '../../core/common/constant';

export const AddCategoryNewsManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [submittedTime, setSubmittedTime] = useState();

    const [_data, _setData] = useState({});
    const dataCategory = _data;

    const setDataCategory = (data) => {
        Object.assign(dataCategory, { ...data });
        _setData({ ...dataCategory });
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
        navigate(ROUTE_PATH.CATEGORY_NEWS)
    };

    const onCreateCategory = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await api.createCategory({
                tenDanhMuc: dataCategory.tenDanhMuc,
                status: 1,
                parentId: Constants.CategoryConfig.News.value
            },
                onBack,
                setLoading
            )
        }
        else {
            WarningMessage("Nhập thiếu thông tin", "Vui lòng nhập đầy đủ thông tin")
        }
    };
    return (
        <MainLayout breadcrumb={"Quản lý danh mục bài viết"} title={"Thêm danh mục bài viết"} redirect={ROUTE_PATH.CATEGORY_NEWS}>
            <div className='flex flex-col header-page'>
                <div className='title-page pt-5 pb-7'>
                    Thêm mới danh mục bài viết
                </div>
            </div>
            <div className='main-page h-100 flex-1 auto bg-white px-8 py-4'>
                <div className='bg-white'>
                    <InputTextCommon
                        label={"Tên danh mục"}
                        attribute={"tenDanhMuc"}
                        isRequired={true}
                        dataAttribute={dataCategory.tenDanhMuc}
                        setData={setDataCategory}
                        disabled={false}
                        validate={validate}
                        setValidate={setValidate}
                        submittedTime={submittedTime}
                    />
                </div>
            </div>
            <div className='container-btn main-page bg-white p-4 flex flex-col '>
                <Row justify={"center"}>
                    <Col className='mx-1'>
                        <ButtonCommon onClick={onBack} classColor="grey">Quay lại</ButtonCommon>
                    </Col>
                    <Col className='mx-1'>
                        <ButtonCommon onClick={onCreateCategory} classColor="blue">Thêm mới</ButtonCommon>
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </MainLayout>
    )
}
