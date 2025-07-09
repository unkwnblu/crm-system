import { Authenticated, GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { authProvider, dataProvider, liveProvider } from "./providers";
import { Home , ForgotPassword, Login, Register } from "./pages";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { App as AntdApp } from "antd";
import { createClient } from "graphql-ws";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import Layout from "./components/layout";
import { resources } from "./config/resources";
import Create from "./pages/company/create";
import { CompanyList } from "./pages/company/list";
import EditPage from "./pages/company/edit";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
               dataProvider={dataProvider}
               liveProvider={liveProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={resources}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "hkgHp0-TJ3hsD-YFRLRe",
                  liveMode: "auto",
                }}
              >
                <Routes>
                  
                  <Route path="/register" index element={<Register />} />
                  <Route path="/login" index element={<Login />} />
                  <Route path="/forgot-password" index element={<ForgotPassword />} />
                
                  <Route
                  element={
                  <Authenticated 
                  key="authenticated-layout"
                  fallback={<CatchAllNavigate to="/login"/>}
                  > 
                    <Layout>
                      <Outlet  />
                    </Layout>
                  </Authenticated>}
                  >
                        <Route index element={<Home />} />
                        <Route path="/companies">
                          <Route index element={<CompanyList />} />
                          <Route path="new" element={<Create />} />
                          <Route path="edit/:id" element={<EditPage />} />
                        </Route>
                  </Route>
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
