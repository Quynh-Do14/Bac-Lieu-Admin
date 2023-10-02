import { Button } from 'antd'
import React from 'react'

export const ButtonCommon = (props) => {
    const {
        classColor = "blue" | "gradient" | "grey" ,
        onClick,
        icon
    } = props;
    return (
        <div className='button-common'>
            <Button className={classColor} onClick={onClick} icon={icon}>
                {props.children}
            </Button>
        </div>
    )
}
