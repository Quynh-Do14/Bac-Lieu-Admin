import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { SpinSize } from "antd/lib/spin";
/**
 * Full page loading
 */


export const FullPageLoading = (props) => {
    const { isLoading } = props;
    return (
        <>
            {isLoading === true ? (
                <div className={"full-page-loading"}>
                    <LoadingRegion size={"large"} tip={null} />
                </div>
            ) : null}
        </>
    );
};

/**
 * Loading spin
 */

export const LoadingRegion = (props) => {
    const { tip, size, color } = props;

    return (
        <>
            <Spin
                tip={tip}
                // size={size}
                style={{ color: color }}
                indicator={<LoadingOutlined spin />}
            />
            {/* <p style={{ color: color }}>Loading</p> */}
        </>
    );
};
