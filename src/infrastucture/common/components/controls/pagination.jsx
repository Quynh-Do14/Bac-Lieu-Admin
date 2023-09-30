import { Button, Col, Row, Select } from 'antd'
import React from 'react'
import "../../../../assets/css/common/pagination.css"
import { CaretDownOutlined, LeftOutlined, RightOutlined, VerticalLeftOutlined, VerticalRightOutlined } from '@ant-design/icons'
import Constants from '../../../../core/common/constant'
export const PaginationCommon = (props) => {
    const {
        title,
        currentPage,
        isLastPage,
        onSelect,
        onFirstPage,
        onPreviousPage,
        onNextPage,
        onLastPage
    } = props;
    return (
        <div className='pagination'>
            <Row align={"middle"} justify={"end"}>
                <Col xs={12} sm={5} lg={5} xl={4} className='title-pagination'>{title}</Col>
                <Col xs={12} sm={2} lg={2} xl={2}>
                    <Select className='custom-select w-100'
                        suffixIcon={<CaretDownOutlined />}
                        onChange={onSelect}
                        showSearch
                        defaultValue={Constants.PaginationConfigs.Size}
                        getPopupContainer={(trigger) => trigger.parentNode}
                    >
                        {Constants.PaginationConfigs.PageSizeList.map((it, index) => (
                            <Select.Option
                                className="select-pagination"
                                key={index}
                                value={it.value}
                                title={it.label}
                            >
                                {it.label}
                            </Select.Option>
                        ))}
                    </Select>
                </Col>
                <Col xs={24} sm={12} lg={6} xl={6}>
                    <Row align={"middle"} justify={"end"}>
                        <Col xs={3} sm={3} lg={4} xl={4} >
                            <Button
                                className='btn-on-page'
                                onClick={onFirstPage}
                                disabled={currentPage == 1}
                            >
                                <VerticalRightOutlined />
                            </Button>
                        </Col>
                        <Col xs={3} sm={3} lg={4} xl={4} >
                            <Button
                                className='btn-on-page'
                                onClick={onPreviousPage}
                                disabled={currentPage == 1}
                            >
                                <LeftOutlined />
                            </Button>
                        </Col>
                        <Col xs={3} sm={3} lg={4} xl={4}>
                            {currentPage}
                        </Col>
                        <Col xs={3} sm={3} lg={4} xl={4} >
                            <Button
                                className='btn-on-page'
                                onClick={onNextPage}
                                disabled={isLastPage}
                            >
                                <RightOutlined />
                            </Button>
                        </Col>
                        <Col xs={3} sm={3} lg={4} xl={4} >
                            <Button
                                className='btn-on-page'
                                onClick={onLastPage}
                                disabled={isLastPage}
                            >
                                <VerticalLeftOutlined />
                            </Button>
                        </Col>
                    </Row>
                </Col>
            </Row >
        </div >
    )
}

