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

const RouteRoot = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTE_PATH.LOGIN} element={<LoginPage />} />
        <Route path={ROUTE_PATH.MAINLAYOUT} element={< PrivateRoute component={MainLayout} />} />

        <Route path={ROUTE_PATH.USER} element={<PrivateRoute component={ListUserManagement} />} />
        <Route path={ROUTE_PATH.VIEW_USER} element={<PrivateRoute component={ViewUserManagement} />} />
        <Route path={ROUTE_PATH.ADD_USER} element={<PrivateRoute component={AddUserManagement} />} />
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
