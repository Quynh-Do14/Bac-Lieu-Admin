import { Layout, Menu, Row, Col } from 'antd';
import { DoubleLeftOutlined, DoubleRightOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react';
import "../../../../assets/css/MainLayout.css"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../../../core/common/appRouter';
import { FullPageLoading } from '../controls/loading';
import DialogConfirmCommon from '../modal/dialogConfirm';
import avatar from "../../../../assets/images/avatar.png"
import logo from "../../../../assets/images/logo.png"
import logoutIcon from "../../../../assets/images/logout-icon.png"
import Constants from '../../../../core/common/constant';
import api from '../../../api';
import { useRecoilState } from 'recoil';
import { CategoryState } from '../../../../core/common/atoms/category/categoryState';
import { DistrictState } from '../../../../core/common/atoms/district/districtState';
import { BreadcrumbCommon } from './Breabcumb';
const { Header, Content, Sider } = Layout;


export const MainLayout = ({ ...props }) => {
  const { title, breadcrumb, redirect } = props
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpenModalLogout, setIsOpenModalLogout] = useState(false);

  const [dataCategory, setDataCategory] = useRecoilState(CategoryState);
  const [dataDistrict, setDataDistrict] = useRecoilState(DistrictState);

  const navigate = useNavigate();
  const location = useLocation();
  const onLogout = () => {
    sessionStorage.clear();
    navigate(ROUTE_PATH.LOGIN);
  }
  const openModalLogout = () => {
    setIsOpenModalLogout(true);
  };

  const closeModalLogout = () => {
    setIsOpenModalLogout(false);
  };

  const onGetListCategoryAsync = async () => {
    const response = await api.getAllCategory(
      "",
      () => { }
    )
    if (response.data.danhMucs?.length > 0) {
      setDataCategory(response.data.danhMucs);
    }
  };

  useEffect(() => {
    onGetListCategoryAsync();
  }, [])

  const onGetListDistrictAsync = async () => {
    const response = await api.getAllDistrict(
      "",
      () => { }
    )
    if (response.data.quanHuyens?.length > 0) {
      setDataDistrict(response.data.quanHuyens);
    }
  };

  useEffect(() => {
    onGetListDistrictAsync();
  }, []);

  return (
    <div className="main-layout">
      <Layout>
        <Row className='header px-6' justify={"space-between"} align={"middle"}>
          <Col className='flex align-center'>
            <img src={logo} alt='' width={100}/>
          </Col>
          <Col>
            <Row align={"middle"} >
              <Col className='mr-6'>
                <div className='user-name'>
                  User name
                </div>
                <div className='role'>
                  Admin
                </div>
              </Col>
              <Col>
                <img className='avatar pointer' width={56} height={56} src={avatar} alt='' />
              </Col>
              <div onClick={openModalLogout} align={"middle"} className='logout pointer ml-4 p-2-5 flex align-center'>
                <img src={logoutIcon} alt='' />
                <div className='ml-1'>Đăng xuất</div>
              </div>
            </Row>
          </Col>
        </Row>
        <Layout>
          <Sider className='sider' trigger={null} collapsible collapsed={collapsed}>
            <Menu className='menu'>
              {Constants.Menu.List.map((it, index) => {
                return (
                  <Menu.Item className={`${location.pathname.includes(it.link) ? "menu-title active" : "menu-title"}`} key={index} icon={it.icon}>
                    <Link to={it.link}>
                      {it.label}
                    </Link>
                  </Menu.Item>
                )
              })}
            </Menu>
            <div className='btn-collap flex align-center justify-center pointer'
              onClick={() => setCollapsed(!collapsed)}
            > {collapsed ?
              <DoubleRightOutlined />
              :
              <DoubleLeftOutlined />
              }
            </div>
          </Sider>
          <Layout className='bg-white'>
            <div className='flex flex-col m-6'>
              <BreadcrumbCommon
                breadcrumb={breadcrumb}
                title={title}
                redirect={redirect}
              />
            </div>
            <Content className='content flex flex-col p-5 mx-6 mb-6 bg-white'>
              {props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
      <DialogConfirmCommon
        message={"Bạn có muốn đăng xuất khỏi hệ thống"}
        titleCancel={"Bỏ qua"}
        titleOk={"Đăng xuất"}
        visible={isOpenModalLogout}
        handleCancel={closeModalLogout}
        handleOk={onLogout}
        title={"Xác nhận"}
      />
      <FullPageLoading isLoading={loading} />
    </div >
  )
}
