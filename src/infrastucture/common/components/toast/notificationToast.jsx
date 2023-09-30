import { message, notification } from "antd";
import {
  CheckCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';

export const SuccessMessage = (message, description) => {
  notification.open({
    message: <div>{message}</div>,
    description: <div>{description}</div>,
    icon: <CheckCircleOutlined style={{ color: '#108ee9' }} />
  });
}

export const FailMessage = (message, description) => {
  notification.open({
    message: <div>{message}</div>,
    description: <div>{description}</div>,
    icon: <InfoCircleOutlined style={{ color: '#ff4d4f' }} />,
  });
}
export const WarningMessage = (message, description) => {
  notification.open({
    message: <div>{message}</div>,
    description: <div>{description}</div>,
    icon: <InfoCircleOutlined style={{ color: '#ffc107' }} />,
  });
}
