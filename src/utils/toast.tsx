import { toast } from 'react-hot-toast';

import CustomToast from '@pm/components/ui/CustomToast';

export const appToast = {
  success: (title: string, description?: string) =>
    toast.custom(t => <CustomToast t={t} title={title} description={description} type="success" />),
  error: (title: string, description?: string) =>
    toast.custom(t => <CustomToast t={t} title={title} description={description} type="error" />),
  info: (title: string, description?: string) =>
    toast.custom(t => <CustomToast t={t} title={title} description={description} type="info" />),
  warning: (title: string, description?: string) =>
    toast.custom(t => <CustomToast t={t} title={title} description={description} type="warning" />),
};
