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

export const ViewCategoryServiceManagement = () => {
    const [validate, setValidate] = useState({});
    const [loading, setLoading] = useState(false);
    const [detailCategory, setDetailCategory] = useState({});
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
    useEffect(() => {
        if (detailCategory) {
            setDataCategory({
                tenDanhMuc: detailCategory.tenDanhMuc,
                status: detailCategory.status,
            });
        };
    }, [detailCategory]);
    const param = useParams();
    const onDetailCategoryAsync = async () => {
        const response = await api.getCategoryById({
            id: param.id,

        },
            setLoading
        )
        setDetailCategory(response.danhMuc);
    };
    useEffect(() => {
        onDetailCategoryAsync();
    }, []);

    const onBack = () => {
        navigate(ROUTE_PATH.CATEGORY_SERVICE)
    };

    const onUpdateCategory = async () => {
        await setSubmittedTime(Date.now());
        if (isValidData()) {
            await api.updateCategory({
                id: param.id,
                tenDanhMuc: dataCategory.tenDanhMuc,
                status: dataCategory.status,
                parentId: dataCategory.parentId,
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
        <MainLayout breadcrumb={"Quản lý danh mục dịch vụ du lịch"} title={"Xem chi tiết"} redirect={ROUTE_PATH.CATEGORY_SERVICE}>
            <div className='flex flex-col header-page'>
                <div className='title-page pt-5 pb-7'>
                    Xem chi tiết danh mục dịch vụ du lịch
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
                        <ButtonCommon onClick={onUpdateCategory} classColor="blue">Cập nhật</ButtonCommon>
                    </Col>
                </Row>
            </div >
            <FullPageLoading isLoading={loading} />
        </MainLayout>
    )
}
