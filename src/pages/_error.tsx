import {AppLoader} from '@crema';
import dynamic, {DynamicOptions} from 'next/dynamic';

export default dynamic(() => import('../modules/errorPages/Error404/index'), {
  loading: () => <AppLoader />,
});
