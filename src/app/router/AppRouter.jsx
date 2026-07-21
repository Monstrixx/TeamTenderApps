import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../components/Layout';
import { routes, ROUTE_MAP, PATH_TO_ID } from './routes';

function RouteWrapper({ Component, isPublic }) {
  const navigate = useNavigate();
  const location = useLocation();

  const activeRouteId = PATH_TO_ID[location.pathname] || 'landing';

  const setActiveRoute = (target) => {
    if (!target) return;
    if (ROUTE_MAP[target]) {
      navigate(ROUTE_MAP[target]);
    } else if (target.startsWith('/')) {
      navigate(target);
    } else {
      navigate('/');
    }
  };

  const pageElement = <Component setActiveRoute={setActiveRoute} />;

  if (isPublic) {
    return pageElement;
  }

  return (
    <Layout activeRoute={activeRouteId} setActiveRoute={setActiveRoute}>
      {pageElement}
    </Layout>
  );
}

export default function AppRouter() {
  return (
    <div className="font-sans text-slate-800 antialiased h-screen flex flex-col bg-slate-50">
      <BrowserRouter>
        <Routes>
          {routes.map((route, index) => {
            const Component = route.element;
            return (
              <Route
                key={index}
                path={route.path}
                element={<RouteWrapper Component={Component} isPublic={route.isPublic} />}
              />
            );
          })}
          {/* Catch-all fallback */}
          <Route
            path="*"
            element={<RouteWrapper Component={routes[0].element} isPublic={true} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
