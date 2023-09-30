import { Breadcrumb } from 'antd';
import React from 'react'
import "../../../../assets/css/MainLayout.css"
import { useNavigate } from 'react-router-dom';
export const HeaderMainLayout = (props) => {
  const { title, breadcrumb, redirect } = props;
  const navigate = useNavigate();
  const onNavigate = () => {
    navigate(redirect);
  }
  return (
    <div>
      <div className='header-main-layout bg-white p-4'>
        <div className='title py-4'>{title}</div>
        <Breadcrumb>
          <Breadcrumb.Item onClick={onNavigate} className='breadcumb pointer'>{breadcrumb}</Breadcrumb.Item>
          <Breadcrumb.Item className='breadcumb-title'>{title}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </div>
  )
}
