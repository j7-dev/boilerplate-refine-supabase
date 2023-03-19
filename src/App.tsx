import { Refine } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import "./assets/scss/style.scss";

import { notificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import routerBindings, {
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { dataProvider, liveProvider } from "@refinedev/supabase";
import { mocksProvider } from "mocks/mocksProvider";

import { useTranslation } from "react-i18next";
import { BrowserRouter } from "react-router-dom";
import { supabaseClient } from "utils";
import authProvider from "./authProvider";
import { ColorModeContextProvider } from "./contexts/color-mode";
import resources from "./resources";
import AppRoutes from "./Routes";

function App() {
  const { t, i18n } = useTranslation();

  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };

  const defaultDataProvider =
    process.env.REACT_APP_MOCK_API === "true"
      ? mocksProvider
      : dataProvider(supabaseClient);

  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <Refine
            dataProvider={{
              default: defaultDataProvider,
            }}
            liveProvider={liveProvider(supabaseClient)}
            authProvider={authProvider}
            routerProvider={routerBindings}
            notificationProvider={notificationProvider}
            i18nProvider={i18nProvider}
            resources={resources}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
            }}
          >
            <AppRoutes />

            <RefineKbar />
            <UnsavedChangesNotifier />
          </Refine>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
