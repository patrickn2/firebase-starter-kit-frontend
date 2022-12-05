import { AppLoader } from '@crema';
import dynamic from 'next/dynamic';

export default dynamic(() => import('../modules/errorPages/Error404/index'), {
  loading: () => <AppLoader />,
});
