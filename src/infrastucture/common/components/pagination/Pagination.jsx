import React from 'react'
import Constants from '../../../../core/common/constant';
import { Button, Pagination, Select } from "antd";

export const PaginationCommon = (props) => {
    const { total, currentPage = 1, onChangePage, pageSize = Constants.PaginationConfigs.Size, onChangeSize = () => { }, disabled = false, } = props
    return (
        <div className="w-100 flex justify-between gap-2 container-pagination">
            <Pagination current={currentPage} total={total} showSizeChanger={false} pageSize={pageSize} onChange={onChangePage} />
            <div className="flex align-center gap-2">
                <div className="show-title mr-4">Số bản ghi mỗi trang</div>
                <div className="select-page-size">
                    <Select
                        value={pageSize}
                        showSearch
                        className="w-full"
                        onChange={onChangeSize}
                        disabled={disabled}
                        getPopupContainer={(trigger) => trigger.parentNode}

                    >
                        {
                            Constants.PaginationConfigs.PageSizeList.map((item, index) => {
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
                </div>
                {/* <div className="m-auto text-15" style={{ color: "#1E2028" }}>{`${currentPage * pageSize - pageSize + 1} - ${currentPage * pageSize > total ? pageSize : (currentPage * pageSize)} of ${total}`}</div> */}

            </div>
        </div>
    );
};

