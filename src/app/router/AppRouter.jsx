import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../components/Layout';
import { routes, ROUTE_MAP, PATH_TO_ID } from './routes';
import { PageSkeleton } from '../../components/ui/skeleton';
import { AppErrorBoundary, RouteErrorBoundary } from '../../components/ui/error-boundary';
import { PublicRoute } from '../../routes/PublicRoute';
import { ProtectedRoute } from '../../routes/ProtectedRoute';
import { PermissionRoute } from '../../routes/PermissionRoute';
import { AuthProvider } from '../../contexts/AuthContext';

function RouteWrapper({ Component, type, restricted, permission }) {
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

  const pageElement = (
    <RouteErrorBoundary>
      <Suspense fallback={<PageSkeleton />}>
        <Component setActiveRoute={setActiveRoute} />
      </Suspense>
    </RouteErrorBoundary>
  );

  let wrappedElement = pageElement;

  if (type === 'public') {
    wrappedElement = <PublicRoute restricted={restricted}>{pageElement}</PublicRoute>;
  } else if (type === 'permission') {
    wrappedElement = <PermissionRoute permission={permission}>{pageElement}</PermissionRoute>;
  } else {
    // default to protected
    wrappedElement = <ProtectedRoute>{pageElement}</ProtectedRoute>;
  }

  if (type === 'public' && !restricted && location.pathname === '/') {
     // Landing page doesn't use Layout
     return wrappedElement;
  }
  if (type === 'public' && location.pathname === '/login') {
     // Login page doesn't use Layout
     return wrappedElement;
  }

  // Application pages use layout
  return (
    <Layout activeRoute={activeRouteId} setActiveRoute={setActiveRoute}>
      {wrappedElement}
    </Layout>
  );
}

export default function AppRouter() {
  return (
    <AppErrorBoundary>
      <BrowserRouter>
        <AuthProvider>
          <div className="font-sans text-slate-800 antialiased h-screen flex flex-col bg-slate-50">
            <Routes>
              {routes.map((route, index) => {
                const Component = route.element;
                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={<RouteWrapper Component={Component} type={route.type} restricted={route.restricted} permission={route.permission} />}
                  />
                );
              })}
              {/* Catch-all fallback */}
              <Route
                path="*"
                element={<RouteWrapper Component={routes[0].element} type="public" restricted={false} />}
              />
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </AppErrorBoundary>
  );
}
