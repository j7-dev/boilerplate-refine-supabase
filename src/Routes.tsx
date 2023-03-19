import { Authenticated } from "@refinedev/core";
import { ErrorComponent } from "@refinedev/antd";
import { AuthPage } from "pages/auth";
import "@refinedev/antd/dist/reset.css";
import {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router-v6";
import { Outlet, Route, Routes } from "react-router-dom";
import { Layout } from "./components/layout";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "pages/categories";
import {
  ProductCreate,
  ProductEdit,
  ProductList,
  ProductShow,
} from "pages/products";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        element={
          <Authenticated fallback={<CatchAllNavigate to="/login" />}>
            <Layout>
              <Outlet />
            </Layout>
          </Authenticated>
        }
      >
        <Route index element={<NavigateToResource resource="products" />} />
        <Route path="/products">
          <Route index element={<ProductList />} />
          <Route path="create" element={<ProductCreate />} />
          <Route path="edit/:id" element={<ProductEdit />} />
          <Route path="show/:id" element={<ProductShow />} />
        </Route>
        <Route path="/categories">
          <Route index element={<CategoryList />} />
          <Route path="create" element={<CategoryCreate />} />
          <Route path="edit/:id" element={<CategoryEdit />} />
          <Route path="show/:id" element={<CategoryShow />} />
        </Route>
      </Route>
      <Route
        element={
          <Authenticated fallback={<Outlet />}>
            <NavigateToResource />
          </Authenticated>
        }
      >
        <Route
          path="/login"
          element={
            <AuthPage
              type="login"
              providers={[
                {
                  name: "google",
                  label: "Sign in with Google",
                },
              ]}
              wrapperProps={{
                style: {
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1508108712903-49b7ef9b1df8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2669&q=80)",
                  backgroundSize: "cover",
                  minHeight: "100vh",
                },
              }}
            />
          }
        />
      </Route>
      <Route
        element={
          <Authenticated>
            <Layout>
              <Outlet />
            </Layout>
          </Authenticated>
        }
      >
        <Route path="*" element={<ErrorComponent />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
