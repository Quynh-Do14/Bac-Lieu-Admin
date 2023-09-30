import { Navigate } from 'react-router-dom';
import { ROUTE_PATH } from '../../../../core/common/appRouter';
import Constants from '../../../../core/common/constant';

export const PrivateRoute = ({ component: RouteComponent, roles }) => {
    let storage = sessionStorage.getItem(Constants.TOKEN);

    if (storage) {
        return <RouteComponent />
    }

    return <Navigate to={ROUTE_PATH.LOGIN} />
}