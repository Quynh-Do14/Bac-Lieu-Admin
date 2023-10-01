import { Button } from 'antd'
import React from 'react'

export const ButtonCommon = (props) => {
    const {
        classColor = "blue" | "gradient" | "grey",
        onClick
    } = props;
    return (
        <div className='button-common'>
            <Button className={classColor} onClick={onClick}>
                {props.children}
            </Button>
        </div>
    )
}
