import logo from './logo.svg';
import './App.css';
import { MainLayout } from './infrastucture/common/components/layout/MainLayout';
import { RecoilRoot } from 'recoil';
import RecoilOutsideComponent from "./infrastucture/libs/recoil-outside/recoil.service";
import { ROUTE_PATH } from './core/common/appRouter';
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import { ListUserManagement } from './page/user-management/list';

const RouteRoot = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path={ROUTE_PATH.LOGIN} element={< PrivateRoute component={LoginPage} />} /> */}
        <Route path={ROUTE_PATH.MAINLAYOUT} element={<MainLayout />} />
        <Route path={ROUTE_PATH.USER} element={<ListUserManagement />} />
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
