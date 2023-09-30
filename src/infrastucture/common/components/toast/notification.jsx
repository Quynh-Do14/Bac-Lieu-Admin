import { Alert, Snackbar } from '@mui/material'
import React, { useState } from 'react'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const NotificationComon = (props) => {
    const { message, open, duration, severity, handleClose } = props
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={duration}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                onClose={handleClose}
                action={
                    <React.Fragment>
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        sx={{ p: 0.5 }}
                        onClick={handleClose}
                      >
                        <CloseIcon />
                      </IconButton>
                    </React.Fragment>
                  }
            >
                <Alert severity={`${severity}`} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default NotificationComon