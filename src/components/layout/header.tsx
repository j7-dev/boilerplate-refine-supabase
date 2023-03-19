import React, { useContext } from "react";
import {
  useActiveAuthProvider,
  useGetIdentity,
  useLogout,
  useGetLocale,
  useSetLocale,
} from "@refinedev/core";
import { Avatar, Layout as AntdLayout, Space, Dropdown } from "antd";
import type { RefineLayoutHeaderProps } from "@refinedev/antd";
import type { MenuProps } from "antd";
import {
  LoginOutlined,
  UserOutlined,
  TranslationOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import { useColor } from "hooks";
import { useTranslation } from "react-i18next";
import { ColorModeContext } from "contexts/color-mode";

export const Header: React.FC<RefineLayoutHeaderProps> = () => {
  const { i18n } = useTranslation();
  const locale = useGetLocale();
  const changeLanguage = useSetLocale();
  const currentLocale = locale();

  const authProvider = useActiveAuthProvider();
  const { data: user } = useGetIdentity({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const shouldRenderHeader = user && (user.name || user.avatar);

  const { colorPrimary, colorSuccess } = useColor();
  const { mutate: logout } = useLogout();
  const { mode, setMode } = useContext(ColorModeContext);

  const userOptions: MenuProps["items"] = [
    {
      key: "userName",
      label: user?.name,
      icon: <UserOutlined className="w-4" />,
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "mode",
      label: (
        <p
          className="m-0"
          onClick={() => setMode(mode === "light" ? "dark" : "light")}
        >
          {mode === "light" ? "Dark Mode" : "Light Mode"}
        </p>
      ),
      icon: (
        <div className="inline-block w-4">{mode === "light" ? "🌛" : "🔆"}</div>
      ),
    },
    {
      key: "languages",
      label: "Languages",
      icon: <TranslationOutlined className="w-4" />,
      children: [...(i18n.languages || [])].sort().map((lang: string) => {
        return {
          key: lang,
          label: (
            <p
              className="m-0 flex justify-between w-24"
              onClick={() => changeLanguage(lang)}
            >
              {lang === "en" ? "English" : "German"}
              {lang === currentLocale && (
                <CheckOutlined style={{ color: colorSuccess }} />
              )}
            </p>
          ),
          icon: <Avatar size={16} src={`/images/flags/${lang}.svg`} />,
        };
      }),
    },
    {
      type: "divider",
    },
    {
      key: "logOut",
      label: (
        <p className="m-0" onClick={() => logout()}>
          Log Out
        </p>
      ),
      icon: <LoginOutlined className="w-4" />,
    },
  ];

  return shouldRenderHeader ? (
    <AntdLayout.Header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
        padding: "0px 24px",
        height: "64px",
        backgroundColor: colorPrimary,
      }}
    >
      <Space style={{ marginLeft: "8px" }}>
        <Dropdown menu={{ items: userOptions }}>
          <Avatar
            className="cursor-pointer"
            style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}
          >
            {user?.name?.charAt(0).toUpperCase()}
          </Avatar>
        </Dropdown>
      </Space>
    </AntdLayout.Header>
  ) : null;
};
