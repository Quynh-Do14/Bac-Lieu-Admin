import React from 'react';
import Constants from '../../../../core/common/constant';
import '../../../../assets/css/common/status.css';
export const StatusUser = (status) => {
    switch (status) {
        case Constants.StatusUser.ADMIN.value:
            return (
                <div className='pointer p-2 status-admin'>{Constants.StatusUser.ADMIN.label} </div>
            )
        case Constants.StatusUser.COMMITTEE.value:
            return (
                <div className='pointer p-2 status-committee'>{Constants.StatusUser.COMMITTEE.label} </div>
            )
        case Constants.StatusUser.DEPARTMENT.value:
            return (
                <div className='pointer p-2 status-department'>{Constants.StatusUser.DEPARTMENT.label} </div>
            )
        case Constants.StatusUser.USER.value:
            return (
                <div className='pointer p-2 status-user'>{Constants.StatusUser.USER.label} </div>
            )
    }
    return status
}
