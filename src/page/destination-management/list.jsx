import { Button, Col, Dropdown, Input, Menu, Row, Select, Space, Table } from 'antd';
import Column from 'antd/es/table/Column';
import React, { useEffect, useState } from 'react';
import { MenuOutlined, PlusOutlined } from '@ant-design/icons';
import api from '../../infrastucture/api';
import { FullPageLoading } from '../../infrastucture/common/components/controls/loading';
import Constants from '../../core/common/constant';
import { MainLayout } from '../../infrastucture/common/components/layout/MainLayout';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../core/common/appRouter';
import DialogConfirmCommon from '../../infrastucture/common/components/modal/dialogConfirm';
import { useRecoilValue } from 'recoil';
import { CategoryState } from '../../core/common/atoms/category/categoryState';
import { DistrictState } from '../../core/common/atoms/district/districtState';
import { convertTimeOnly } from '../../infrastucture/utils/helper';
import { PaginationCommon } from '../../infrastucture/common/components/pagination/Pagination';
import { ButtonCommon } from '../../infrastucture/common/components/button/button-common';
import { InputSearchCommon } from '../../infrastucture/common/components/input/input-text-search';

let timeout
export const ListDestinationManagement = () => {
    const [searchText, setSearchText] = useState("");
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [pageSize, setPageSize] = useState(Constants.PaginationConfigs.Size);
    const [page, setPage] = useState(1);
    const [isDeleteModal, setIsDeleteModal] = useState(false);
    const [idSelected, setIdSelected] = useState(null);
    const [pagination, setPagination] = useState({});
    const [totalItem, setTotalItem] = useState();

    const dataCategory = useRecoilValue(CategoryState);
    const dataDistrict = useRecoilValue(DistrictState);

    const [districtId, setDictrictId] = useState();
    const [categoryId, setCategoryId] = useState(Constants.CategoryConfig.Destination.value);
    const navigate = useNavigate();

    useEffect(() => {
        setDictrictId(dataDistrict[0]?.idQuanHuyen);
        // setCategoryId(dataCategory[0]?.idDanhMucDiaDiem);
    }, [dataDistrict, dataCategory])
    const checkCondition = () => {
        return dataDistrict && dataCategory ? true : false
    }
    const onGetListLocationAsync = async ({ keyWord = "", limit = pageSize, page = 1, idQuanHuyen = 1, idDanhMuc = 1 }) => {
        const condition = await checkCondition()
        if (condition) {
            const response = await api.getAllLocation(
                `${Constants.Params.search}=${keyWord.trim()}&${Constants.Params.limit}=${limit}&${Constants.Params.page}=${page}&${Constants.Params.idQuanHuyen}=${idQuanHuyen}&${Constants.Params.idDanhMuc}=${idDanhMuc}`,
                setLoading
            )
            setData(response.data.diaDiems);
            setPagination(response.data.pagination);
            setTotalItem(response.data.totalItems);
        }
    }
    const onSearch = async (keyWord = "", limit = pageSize, page = 1, idQuanHuyen = dataDistrict[0]?.idQuanHuyen, idDanhMuc = Constants.CategoryConfig.Destination.value) => {
        await onGetListLocationAsync({ keyWord: keyWord, limit: limit, page: page, idQuanHuyen: idQuanHuyen, idDanhMuc: idDanhMuc });
    };

    useEffect(() => {
        onSearch().then(_ => { });
    }, []);

    const onChangeSearchText = (e) => {
        setSearchText(e.target.value);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            onSearch(e.target.value, pageSize, page, districtId, categoryId).then((_) => { });
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
    const onDeleteLocation = async () => {
        await api.deleteLocation({
            id: idSelected
        },
            onSearch,
            setLoading
        )
        setIsDeleteModal(false);
    };
    const onChangeQuanHuyen = (value) => {
        setDictrictId(value)
        onSearch("", pageSize, page, value, categoryId).then((_) => { });
    };
    const onChangeDanhMuc = (value) => {
        setCategoryId(value)
        onSearch("", pageSize, page, districtId, value).then((_) => { });
    };
    const onNavigate = (id) => {
        navigate(`${(ROUTE_PATH.VIEW_DESTINATION).replace(`${Constants.UseParams.Id}`, "")}${id}`);
    }
    const listAction = (record) => {
        return (
            <Menu>
                <Menu.Item className='title-action' onClick={() => onNavigate(record.idDiaDiem)}>
                    <div className='text-base weight-600 px-1 py-0-5'>Sửa</div>
                </Menu.Item>
                <Menu.Item className='title-action' onClick={() => onOpenModalDelete(record.idDiaDiem)}>
                    <div className='text-base weight-600 px-1 py-0-5'>Xóa</div>
                </Menu.Item>
            </Menu>
        )
    };
    return (
        <MainLayout breadcrumb={"Quản lý điểm đến"} title={"Danh sách điểm đến"} redirect={""}>
            <div className='flex flex-col header-page'>
                <Row className='mb-4' gutter={[10, 10]} justify={"space-between"} align={"middle"}>
                    <Col xs={24} sm={24} lg={16}>
                        <Row align={"middle"} gutter={[10, 10]}>
                            <Col xs={24} sm={12} lg={8}>
                                <InputSearchCommon
                                    placeholder="Tìm kiếm theo tên..."
                                    value={searchText}
                                    onChange={onChangeSearchText}
                                    disabled={false}
                                />
                            </Col>
                            <Col className='select-search' xs={24} sm={12} lg={8}>
                                <Select
                                    value={districtId != null ? districtId : null}
                                    placeholder={"Chọn quận huyện"}
                                    className="w-100"
                                    onChange={onChangeQuanHuyen}
                                    getPopupContainer={(trigger) => trigger.parentNode}
                                >
                                    {
                                        dataDistrict && dataDistrict.length &&
                                        dataDistrict.map((item, index) => {
                                            return (
                                                <Select.Option
                                                    key={index}
                                                    value={item.idQuanHuyen}
                                                    title={item.tenQuanHuyen}
                                                >
                                                    {item.tenQuanHuyen}
                                                </Select.Option>
                                            );
                                        })
                                    }
                                </Select>
                            </Col>
                            <Col className='select-search' xs={24} sm={12} lg={8}>
                                <Select
                                    value={categoryId != null ? categoryId : null}
                                    placeholder={"Chọn danh mục"}
                                    className="w-100"
                                    onChange={onChangeDanhMuc}
                                    disabled={true}
                                    getPopupContainer={(trigger) => trigger.parentNode}
                                >
                                    {
                                        Constants.CategoryConfig.list && Constants.CategoryConfig.list.length &&
                                        Constants.CategoryConfig.list.map((item, index) => {
                                            return (
                                                <Select.Option
                                                    key={index}
                                                    value={item.value}
                                                    title={item.label}
                                                >
                                                    {item.label}
                                                </Select.Option>
                                            );
                                        })
                                    }
                                </Select>
                            </Col>
                        </Row>

                    </Col>
                    <Col xs={4} sm={4} lg={4}>
                        <ButtonCommon classColor="gradient" onClick={() => navigate(ROUTE_PATH.ADD_DESTINATION)} >Thêm mới</ButtonCommon>
                    </Col>
                </Row>
                <div className='title-page pt-5 pb-7'>Danh sách điểm đến</div>
            </div>
            <div className='flex-1 auto bg-white content-page'>
                <Table
                    dataSource={data}
                    pagination={false}
                    className='table-common'
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
                        title={"Tên điểm đến"}
                        key={"tenDiaDiem"}
                        dataIndex={"tenDiaDiem"}
                        width={"300px"}
                    />
                    <Column
                        title={"Địa chỉ"}
                        key={"diaChi"}
                        dataIndex={"diaChi"}
                        width={"300px"}
                    />
                    <Column
                        title={"Email liên hệ"}
                        key={"emailLienHe"}
                        dataIndex={"emailLienHe"}
                    />
                    <Column
                        title={"SĐT liên hệ"}
                        key={"sdtLienHe"}
                        dataIndex={"sdtLienHe"}
                        width={"200px"}
                    />
                    <Column
                        title={"Giờ mở cửa"}
                        key={"gioDongCua"}
                        dataIndex={"gioDongCua"}
                        width={"200px"}
                        render={(val) => (
                            <div>{(val)} </div>
                        )}
                    />
                    <Column
                        title={"Giờ đóng cửa"}
                        key={"gioMoCua"}
                        dataIndex={"gioMoCua"}
                        width={"200px"}
                        render={(val) => (
                            <div>{(val)} </div>
                        )}
                    />
                    {/* <Column
                        title={"Thời gian ghé"}
                        key={"thoiGianGhe"}
                        dataIndex={"thoiGianGhe"}
                    /> */}
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
                message={"Bạn có muốn xóa điểm đến này ra khỏi hệ thống"}
                titleCancel={"Bỏ qua"}
                titleOk={"Xóa điểm đến"}
                visible={isDeleteModal}
                handleCancel={onCloseModalDelete}
                handleOk={onDeleteLocation}
                title={"Xác nhận"}
            />
            <FullPageLoading isLoading={loading} />
        </MainLayout>
    )
}
