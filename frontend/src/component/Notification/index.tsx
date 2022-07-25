import { notification } from 'antd';
import { IconType } from 'antd/lib/notification';

export enum IconTypeNotification {
  success = 'success',
  info = 'info',
  error = 'error',
  warning = 'warning',
}

export const openNotification = (
  type: IconType,
  message: string,
  description = ''
) => {
  notification[type]({
    message,
    description,
  });
};
