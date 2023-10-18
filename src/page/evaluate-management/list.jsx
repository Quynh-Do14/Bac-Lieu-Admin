import { Button, Col, Dropdown, Input, Menu, Row, Space, Table } from 'antd';
import Column from 'antd/es/table/Column';
import React, { useEffect, useState } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { convertDateOnly } from '../../infrastucture/utils/helper';
import api from '../../infrastucture/api';
import { FullPageLoading } from '../../infrastucture/common/components/controls/loading';
import Constants from '../../core/common/constant';
import { MainLayout } from '../../infrastucture/common/components/layout/MainLayout';
import { ROUTE_PATH } from '../../core/common/appRouter';
import DialogConfirmCommon from '../../infrastucture/common/components/modal/dialogConfirm';
import { useNavigate } from 'react-router-dom';
import { InputSearchCommon } from '../../infrastucture/common/components/input/input-text-search';
import { ButtonCommon } from '../../infrastucture/common/components/button/button-common';
import { PaginationCommon } from '../../infrastucture/common/components/pagination/Pagination';

let timeout
export const ListEvaluateManagement = () => {
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [pageSize, setPageSize] = useState(Constants.PaginationConfigs.Size);
    const [page, setPage] = useState(1);
    const [isDeleteModal, setIsDeleteModal] = useState(false);
    const [idSelected, setIdSelected] = useState(null);
    const [pagination, setPagination] = useState({});
    const [totalItem, setTotalItem] = useState();

    const navigate = useNavigate();

    const onGetListEvaluateAsync = async ({ keyWord = "", limit = pageSize, page = 1 }) => {
        const response = await api.getAllEvaluate(`${Constants.Params.search}=${keyWord}&${Constants.Params.limit}=${limit}&${Constants.Params.page}= ${page}`,
            setLoading
        )
        if (response.data.danhGias?.length > 0) {
            setData(response.data.danhGias)
        }
        setPagination(response.data.pagination);
        setTotalItem(response.data.totalItems);
    }
    const onSearch = async (keyWord = "", limit = pageSize, page = 1) => {
        await onGetListEvaluateAsync({ keyWord: keyWord, limit: limit, page: page })
    };

    useEffect(() => {
        onSearch().then(_ => { })
    }, [])

    const onChangeSearchText = (e) => {
        setSearchText(e.target.value);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            onSearch(e.target.value, pageSize, page).then((_) => { });
        }, Constants.DEBOUNCE_SEARCH);
    };

    const onChangePage = async (value) => {
        setPage(value);
        await onSearch(searchText, pageSize, value).then((_) => { });
    };

    const onPageSizeChanged = (value) => {
        setPageSize(value);
        setSearchText("");
        setPage(1);
        onSearch(searchText, value, page).then((_) => { });
    };

    const onOpenModalDelete = (id) => {
        setIsDeleteModal(true);
        setIdSelected(id)
    };

    const onCloseModalDelete = () => {
        setIsDeleteModal(false);
    }

    const onDeleteEvaluate = async () => {
        await api.deleteEvaluate({
            id: idSelected
        },
            onSearch,
            setLoading
        )
        setIsDeleteModal(false);
    };

    const onNavigate = (idDanhGia) => {
        navigate(`${(ROUTE_PATH.VIEW_EVALUATE).replace(`${Constants.UseParams.Id}`, "")}${idDanhGia}`);
    }

    const listAction = (record) => {
        return (
            <Menu>
                <Menu.Item className='title-action' onClick={() => onNavigate(record.idDanhGia)}>
                    <div className='text-base weight-600 px-1 py-0-5'>Sửa</div>
                </Menu.Item>
                <Menu.Item className='title-action' onClick={() => onOpenModalDelete(record.idDanhGia)}>
                    <div className='text-base weight-600 px-1 py-0-5'>Xóa</div>
                </Menu.Item>
            </Menu>
        )
    };
    return (
        <MainLayout breadcrumb={"Quản lý đánh giá"} title={"Danh sách đánh giá"} redirect={""}>
            <div className='flex flex-col header-page'>
                <Row className='filter-page px-5 py-2-5 mb-10' justify={"space-between"} align={"middle"}>
                    <Col xs={14} sm={14} md={10} lg={8}>
                        <InputSearchCommon
                            placeholder="Tìm kiếm theo tên..."
                            value={searchText}
                            onChange={onChangeSearchText}
                            disabled={false}
                        />
                    </Col>
                    {/* <Col>
                        <ButtonCommon classColor="gradient" onClick={() => navigate(ROUTE_PATH.ADD_EVALUATE)} >Thêm mới</ButtonCommon>
                    </Col> */}
                </Row>
                <div className='title-page pt-5 pb-7'>Danh sách đánh giá</div>
            </div>
            <div className='flex-1 auto bg-white content-page'>
                <Table
                    dataSource={data}
                    pagination={false}
                >
                    <Column
                        title={"STT"}
                        dataIndex="stt"
                        key="stt"
                        width={"5%"}
                        render={(val, record, index) => (
                            <div style={{ textAlign: "center" }}>
                                {index + 1 + pageSize * (page - 1)}
                            </div>
                        )}
                    />
                    <Column
                        title={"Đánh giá"}
                        key={"idDanhGia"}
                        dataIndex={"idDanhGia"}
                    />
                    <Column
                        title={"Địa điểm"}
                        key={"idDiaDiem"}
                        dataIndex={"idDiaDiem"}
                    />
                    <Column
                        title={"Nội dung"}
                        key={"noiDung"}
                        dataIndex={"noiDung"}
                    />
                    <Column
                        title={"Số sao"}
                        key={"soSao"}
                        dataIndex={"soSao"}
                    />
                    <Column
                        title={"Thời gian đánh giá"}
                        key={"thoiGianDanhGia"}
                        dataIndex={"thoiGianDanhGia"}
                        render={(val) => (
                            <div>{convertDateOnly(val)} </div>
                        )}
                    />
                    <Column
                        title={"Người dùng"}
                        key={"userId"}
                        dataIndex={"userId"}
                    />
                    <Column
                        title={"Thao tác"}
                        width={"60px"}
                        fixed="right"
                        align='center'
                        render={(action, record) => (
                            // <CommonPermission permission={Permissions.OrderManagement.Order.action}>
                            <Space
                                size="small"
                            >
                                <Dropdown
                                    trigger={["hover"]}
                                    placement="bottomRight"
                                    overlay={listAction(record)}
                                >
                                    <MenuOutlined className="pointer" />
                                </Dropdown>
                            </Space>
                        )}
                    />
                </Table>;
            </div>
            <div className='flex flex-col'>
                <PaginationCommon
                    total={totalItem}
                    currentPage={page}
                    onChangePage={onChangePage}
                    pageSize={pageSize}
                    onChangeSize={onPageSizeChanged}
                    disabled={false}
                />
            </div>
            <DialogConfirmCommon
                message={"Bạn có muốn xóa đánh giá này ra khỏi hệ thống"}
                titleCancel={"Bỏ qua"}
                titleOk={"Xóa đánh giá"}
                visible={isDeleteModal}
                handleCancel={onCloseModalDelete}
                handleOk={onDeleteEvaluate}
                title={"Xác nhận"}
            />
            <FullPageLoading isLoading={loading} />
        </MainLayout>
    )
}
