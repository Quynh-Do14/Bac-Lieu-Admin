import { Breadcrumb } from 'antd';
import React from 'react'
import "../../../../assets/css/breadcumb.css"
import { useNavigate } from 'react-router-dom';
import { RightOutlined } from '@ant-design/icons';
export const BreadcrumbCommon = (props) => {
  const { title, breadcrumb, redirect } = props;
  const navigate = useNavigate();
  const onNavigate = () => {
    navigate(redirect);
  }
  return (
    <div>
      <div className='breadcumb-container px-5 py-3'>
        <Breadcrumb separator={<RightOutlined />} className='flex align-center'>
          <Breadcrumb.Item onClick={onNavigate} className='breadcumb pointer'>{breadcrumb}</Breadcrumb.Item>
          <Breadcrumb.Item className='breadcumb-title'>{title}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </div>
  )
}
