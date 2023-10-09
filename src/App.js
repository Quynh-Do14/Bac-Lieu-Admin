import logo from './logo.svg';
import './App.css';
import { MainLayout } from './infrastucture/common/components/layout/MainLayout';
import { RecoilRoot } from 'recoil';
import RecoilOutsideComponent from "./infrastucture/libs/recoil-outside/recoil.service";
import { ROUTE_PATH } from './core/common/appRouter';
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { ListUserManagement } from './page/user-management/list';
import { LoginPage } from './page/Auth/Login/Login';
import { PrivateRoute } from './infrastucture/common/components/router/private-router';
import { ViewUserManagement } from './page/user-management/view';
import { AddUserManagement } from './page/user-management/add';
import { ListDistrictManagement } from './page/district-management/list';
import { ViewDistrictManagement } from './page/district-management/view';
import { AddDistrictManagement } from './page/district-management/add';
import { ListFestivalManagement } from './page/festival-management/list';
import { ViewFestivalManagement } from './page/festival-management/view';
import { AddFestivalManagement } from './page/festival-management/add';
import { ListSpecialtyManagement } from './page/specialty-management/list';
import { ViewSpecialtyManagement } from './page/specialty-management/view';
import { AddSpecialtyManagement } from './page/specialty-management/add';
import { ListNewsManagement } from './page/news-management/list';
import { ViewNewsManagement } from './page/news-management/view';
import { AddNewsManagement } from './page/news-management/add';
import { ListTourManagement } from './page/tour-management/list';
import { ViewTourManagement } from './page/tour-management/view';
import { AddTourManagement } from './page/tour-management/add';
import { ListCategoryNewsManagement } from './page/category-news-management/list';
import { ViewCategoryNewsManagement } from './page/category-news-management/view';
import { AddCategoryNewsManagement } from './page/category-news-management/add';
import { ListCategoryServiceManagement } from './page/category-service-management/list';
import { ViewCategoryServiceManagement } from './page/category-service-management/view';
import { AddCategoryServiceManagement } from './page/category-service-management/add';
import { ListDestinationManagement } from './page/destination-management/list';
import { AddDestinationManagement } from './page/destination-management/add';
import { ViewDestinationlManagement } from './page/destination-management/view'
const RouteRoot = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTE_PATH.LOGIN} element={<LoginPage />} />
        <Route path={ROUTE_PATH.MAINLAYOUT} element={< PrivateRoute component={MainLayout} />} />

        <Route path={ROUTE_PATH.USER} element={<PrivateRoute component={ListUserManagement} />} />
        <Route path={ROUTE_PATH.VIEW_USER} element={<PrivateRoute component={ViewUserManagement} />} />
        <Route path={ROUTE_PATH.ADD_USER} element={<PrivateRoute component={AddUserManagement} />} />

        <Route path={ROUTE_PATH.CATEGORY_NEWS} element={<PrivateRoute component={ListCategoryNewsManagement} />} />
        <Route path={ROUTE_PATH.VIEW_CATEGORY_NEWS} element={<PrivateRoute component={ViewCategoryNewsManagement} />} />
        <Route path={ROUTE_PATH.ADD_CATEGORY_NEWS} element={<PrivateRoute component={AddCategoryNewsManagement} />} />

        <Route path={ROUTE_PATH.CATEGORY_SERVICE} element={<PrivateRoute component={ListCategoryServiceManagement} />} />
        <Route path={ROUTE_PATH.VIEW_CATEGORY_SERVICE} element={<PrivateRoute component={ViewCategoryServiceManagement} />} />
        <Route path={ROUTE_PATH.ADD_CATEGORY_SERVICE} element={<PrivateRoute component={AddCategoryServiceManagement} />} />

        <Route path={ROUTE_PATH.DISTRICT} element={<PrivateRoute component={ListDistrictManagement} />} />
        <Route path={ROUTE_PATH.VIEW_DISTRICT} element={<PrivateRoute component={ViewDistrictManagement} />} />
        <Route path={ROUTE_PATH.ADD_DISTRICT} element={<PrivateRoute component={AddDistrictManagement} />} />

        <Route path={ROUTE_PATH.DESTINATION} element={<PrivateRoute component={ListDestinationManagement} />} />
        <Route path={ROUTE_PATH.VIEW_DESTINATION} element={<PrivateRoute component={ViewDestinationlManagement} />} />
        <Route path={ROUTE_PATH.ADD_DESTINATION} element={<PrivateRoute component={AddDestinationManagement} />} />

        <Route path={ROUTE_PATH.FESTIVAL} element={<PrivateRoute component={ListFestivalManagement} />} />
        <Route path={ROUTE_PATH.VIEW_FESTIVAL} element={<PrivateRoute component={ViewFestivalManagement} />} />
        <Route path={ROUTE_PATH.ADD_FESTIVAL} element={<PrivateRoute component={AddFestivalManagement} />} />


        <Route path={ROUTE_PATH.SPECIALTY} element={<PrivateRoute component={ListSpecialtyManagement} />} />
        <Route path={ROUTE_PATH.VIEW_SPECIALTY} element={<PrivateRoute component={ViewSpecialtyManagement} />} />
        <Route path={ROUTE_PATH.ADD_SPECIALTY} element={<PrivateRoute component={AddSpecialtyManagement} />} />

        <Route path={ROUTE_PATH.NEWS} element={<PrivateRoute component={ListNewsManagement} />} />
        <Route path={ROUTE_PATH.VIEW_NEWS} element={<PrivateRoute component={ViewNewsManagement} />} />
        <Route path={ROUTE_PATH.ADD_NEWS} element={<PrivateRoute component={AddNewsManagement} />} />

        <Route path={ROUTE_PATH.TOUR} element={<PrivateRoute component={ListTourManagement} />} />
        <Route path={ROUTE_PATH.VIEW_TOUR} element={<PrivateRoute component={ViewTourManagement} />} />
        <Route path={ROUTE_PATH.ADD_TOUR} element={<PrivateRoute component={AddTourManagement} />} />
      </Routes>
    </BrowserRouter>
  )
};

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <RecoilOutsideComponent />
        <RouteRoot />
      </RecoilRoot>
    </div>
  );
}

export default App;
