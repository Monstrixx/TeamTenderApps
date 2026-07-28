import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../components/Layout';
import { routes, ROUTE_MAP, PATH_TO_ID } from './routes';
import { PageSkeleton } from '../../components/ui/skeleton';
import { AppErrorBoundary, RouteErrorBoundary } from '../../components/ui/error-boundary';
import { PublicRoute } from '../../routes/PublicRoute';
import { ProtectedRoute } from '../../routes/ProtectedRoute';
import { PermissionRoute } from '../../routes/PermissionRoute';
import { AuthProvider } from '../../contexts/AuthContext';
import { WORKSPACE_ROUTES } from '../../config/routes/workspaceRoutes';

// Lazy load workspace layout and modules
const WorkspaceLayout = lazy(() => import('../../layouts/WorkspaceLayout/WorkspaceLayout'));
const WorkspaceHomePage = lazy(() => import('../../modules/workspace/pages/WorkspaceHomePage'));
const CompanyPage = lazy(() => import('../../modules/company/pages/CompanyPage'));
const PersonnelPage = lazy(() => import('../../modules/personnel/pages/PersonnelPage'));
const EquipmentPage = lazy(() => import('../../modules/equipment/pages/EquipmentPage'));
const SupplierPage = lazy(() => import('../../modules/supplier/pages/SupplierPage'));
const DocumentsPage = lazy(() => import('../../modules/documents/pages/DocumentsPage'));
const AnalyticsPage = lazy(() => import('../../modules/analytics/pages/AnalyticsPage'));
const AICenterPage = lazy(() => import('../../modules/ai/pages/AICenterPage'));
const WorkspaceSettingsPage = lazy(() => import('../../modules/workspace/pages/WorkspaceSettingsPage'));
const WorkspaceMembersPage = lazy(() => import('../../modules/workspace/pages/WorkspaceMembersPage'));
const TenderExecutionWorkspace = lazy(() => import('../../modules/tender/pages/TenderExecutionWorkspace'));
const PublicCompanyPage = lazy(() => import('../../modules/company/pages/PublicCompanyPage'));

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
                <Route path="/company/:slug" element={
                  <Suspense fallback={<PageSkeleton />}>
                    <PublicCompanyPage />
                  </Suspense>
                } />
                
                {/* Workspace Shell Nested Routing */}
              <Route path="/workspace/:workspaceId" element={
                <ProtectedRoute>
                  <Suspense fallback={<PageSkeleton />}>
                    <WorkspaceLayout />
                  </Suspense>
                </ProtectedRoute>
              }>
                <Route path={WORKSPACE_ROUTES.HOME} element={<WorkspaceHomePage />} />
                <Route path={WORKSPACE_ROUTES.COMPANY} element={<CompanyPage />} />
                <Route path={WORKSPACE_ROUTES.PERSONNEL} element={<PersonnelPage />} />
                <Route path={WORKSPACE_ROUTES.EQUIPMENT} element={<EquipmentPage />} />
                <Route path={WORKSPACE_ROUTES.SUPPLIER} element={<SupplierPage />} />
                <Route path={WORKSPACE_ROUTES.TENDER} element={<TenderExecutionWorkspace />} />
                <Route path={WORKSPACE_ROUTES.DOCUMENTS} element={<DocumentsPage />} />
                <Route path={WORKSPACE_ROUTES.ANALYTICS} element={<AnalyticsPage />} />
                <Route path={WORKSPACE_ROUTES.AI_CENTER} element={<AICenterPage />} />
                <Route path={WORKSPACE_ROUTES.SETTINGS} element={<WorkspaceSettingsPage />} />
                <Route path={WORKSPACE_ROUTES.MEMBERS} element={<WorkspaceMembersPage />} />
              </Route>

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
