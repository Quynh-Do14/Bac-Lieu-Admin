import React, { useEffect, useState } from 'react'
import { MainLayout } from '../../infrastucture/common/components/layout/MainLayout'
import { BreadcrumbCommon } from '../../infrastucture/common/components/layout/Breabcumb'
import "../../assets/css/breadcumb.css"
import { Button, Col, Dropdown, Input, Menu, Row, Space, Table } from 'antd'
import { useNavigate } from 'react-router-dom'
import { ROUTE_PATH } from '../../core/common/appRouter'
import api from '../../infrastucture/api'
import Constants from '../../core/common/constant'
import { InputSearchCommon } from '../../infrastucture/common/components/input/input-text-search'
import { ButtonCommon } from '../../infrastucture/common/components/button/button-common'
import Column from 'antd/es/table/Column'
import { MenuOutlined } from '@ant-design/icons'
import { StatusUser } from '../../infrastucture/common/components/controls/status'
import { PaginationCommon } from '../../infrastucture/common/components/pagination/Pagination'
import DialogConfirmCommon from '../../infrastucture/common/components/modal/dialogConfirm'
import { FullPageLoading } from '../../infrastucture/common/components/controls/loading'
let timeout

export const ListUserManagement = () => {
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

    const onGetListUserAsync = async ({ keyWord = "", limit = pageSize, page = 1 }) => {
        const response = await api.getAllUser(
            `${Constants.Params.search}=${keyWord.trim()}&${Constants.Params.limit}=${limit}&${Constants.Params.page}= ${page}`,
            setLoading
        )
        setData(response.data.users);
        setPagination(response.data.pagination);
        setTotalItem(response.data.totalItems);
    }
    const onSearch = async (keyWord = "", limit = pageSize, page = 1) => {
        await onGetListUserAsync({ keyWord: keyWord, limit: limit, page: page });
    };

    useEffect(() => {
        onSearch().then(_ => { });
    }, []);

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

    const onPageSizeChanged = async (value) => {
        setPageSize(value);
        setSearchText("");
        setPage(1);
        await onSearch(searchText, value, page).then((_) => { });
    };

    const onOpenModalDelete = (id) => {
        setIsDeleteModal(true);
        setIdSelected(id)
    };

    const onCloseModalDelete = () => {
        setIsDeleteModal(false);
    };
    const onDeleteUser = async () => {
        await api.deleteUser({
            id: idSelected
        },
            onSearch,
            setLoading
        )
        setIsDeleteModal(false);
    };

    const onNavigate = (id) => {
        navigate(`${(ROUTE_PATH.VIEW_USER).replace(`${Constants.UseParams.Id}`, "")}${id}`);
    }
    const listAction = (record) => {
        return (
            <Menu>
                <Menu.Item className='title-action' onClick={() => onNavigate(record.id)}>
                    <div className='text-base weight-600 px-1 py-0-5'>Sửa</div>
                </Menu.Item>
                <Menu.Item className='title-action' onClick={() => onOpenModalDelete(record.id)}>
                    <div className='text-base weight-600 px-1 py-0-5'>Xóa</div>
                </Menu.Item>
            </Menu>
        )
    };
    return (
        <MainLayout breadcrumb={"Quản lý người dùng"} title={"Danh sách người dùng"} redirect={""}>
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
                    <Col>
                        <ButtonCommon classColor="gradient" onClick={() => navigate(ROUTE_PATH.ADD_USER)} >Thêm mới</ButtonCommon>
                    </Col>
                </Row>
                <div className='title-page pt-5 pb-7'>Danh sách người dùng</div>
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
                        title={"Tên người dùng"}
                        key={"userName"}
                        dataIndex={"userName"}
                    />
                    <Column
                        title={"Phân quyền"}
                        key={"role"}
                        dataIndex={"role"}
                        width={"200px"}
                        render={(value) => {
                            return (
                                <div>{StatusUser(value)} </div>
                            )
                        }}
                    />
                    <Column
                        title={"Họ tên"}
                        key={"lastName"}
                        dataIndex={"lastName"}
                        render={(value, record) => {
                            return (
                                <div>
                                    {record.lastName} {record.firstName}
                                </div>
                            )
                        }}
                    />
                    <Column
                        title={"Số điện thoại"}
                        key={"sdt"}
                        dataIndex={"sdt"}
                    />
                    <Column
                        title={"Địa chỉ"}
                        key={"address"}
                        dataIndex={"address"}
                    />
                    <Column
                        title={"Thao tác"}
                        // width={"60px"}
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
                </Table>
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
                message={"Bạn có muốn xóa người dùng này ra khỏi hệ thống"}
                titleCancel={"Bỏ qua"}
                titleOk={"Xóa người dùng"}
                visible={isDeleteModal}
                handleCancel={onCloseModalDelete}
                handleOk={onDeleteUser}
                title={"Xác nhận"}
            />
            <FullPageLoading isLoading={loading} />
        </MainLayout >
    )
}
