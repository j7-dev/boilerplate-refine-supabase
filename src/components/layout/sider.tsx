import React, { useState, CSSProperties } from "react";
import {
  useTranslate,
  useLogout,
  useTitle,
  CanAccess,
  ITreeMenu,
  useIsExistAuthentication,
  useRouterContext,
  useMenu,
  useRefineContext,
  useLink,
  useRouterType,
  useActiveAuthProvider,
  pickNotDeprecated,
} from "@refinedev/core";
import { Title as DefaultTitle } from "./title";
import {
  DashboardOutlined,
  LogoutOutlined,
  UnorderedListOutlined,
  BarsOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Grid, ConfigProvider, Drawer, Button } from "antd";
import type { RefineLayoutSiderProps } from "@refinedev/antd";
import { useColor } from "hooks";
import packageJson from "../../../package.json";

const drawerButtonStyles: CSSProperties = {
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  position: "fixed",
  top: 64,
  zIndex: 999,
};

const { SubMenu } = Menu;

export const Sider: React.FC<RefineLayoutSiderProps> = ({
  Title: TitleFromProps,
  render,
  meta,
}) => {
  const { colorPrimary } = useColor();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const isExistAuthentication = useIsExistAuthentication();
  const routerType = useRouterType();
  const NewLink = useLink();
  const { Link: LegacyLink } = useRouterContext();
  const Link = routerType === "legacy" ? LegacyLink : NewLink;
  const TitleFromContext = useTitle();
  const translate = useTranslate();
  const { menuItems, selectedKey, defaultOpenKeys } = useMenu({ meta });
  const breakpoint = Grid.useBreakpoint();
  const { hasDashboard } = useRefineContext();
  const authProvider = useActiveAuthProvider();
  const { mutate: mutateLogout } = useLogout({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const isMobile =
    typeof breakpoint.lg === "undefined" ? false : !breakpoint.lg;

  const RenderToTitle = TitleFromProps ?? TitleFromContext ?? DefaultTitle;

  const renderTreeView = (tree: ITreeMenu[], selectedKey?: string) => {
    return tree.map((item: ITreeMenu) => {
      const {
        icon,
        label,
        route,
        key,
        name,
        children,
        parentName,
        meta,
        options,
      } = item;

      if (children.length > 0) {
        return (
          <CanAccess
            key={item.key}
            resource={name.toLowerCase()}
            action="list"
            params={{
              resource: item,
            }}
          >
            <SubMenu
              key={item.key}
              icon={icon ?? <UnorderedListOutlined />}
              title={label}
            >
              {renderTreeView(children, selectedKey)}
            </SubMenu>
          </CanAccess>
        );
      }
      const isSelected = key === selectedKey;
      const isRoute = !(
        pickNotDeprecated(meta?.parent, options?.parent, parentName) !==
          undefined && children.length === 0
      );
      return (
        <CanAccess
          key={item.key}
          resource={name.toLowerCase()}
          action="list"
          params={{
            resource: item,
          }}
        >
          <Menu.Item
            key={item.key}
            style={{
              fontWeight: isSelected ? "bold" : "normal",
            }}
            icon={icon ?? (isRoute && <UnorderedListOutlined />)}
          >
            <Link to={route ?? ""}>{label}</Link>
            {!collapsed && isSelected && (
              <div className="ant-menu-tree-arrow" />
            )}
          </Menu.Item>
        </CanAccess>
      );
    });
  };

  const logout = isExistAuthentication && (
    <Menu.Item
      key="logout"
      onClick={() => mutateLogout()}
      icon={<LogoutOutlined />}
    >
      {translate("buttons.logout", "Logout")}
    </Menu.Item>
  );

  const dashboard = hasDashboard ? (
    <Menu.Item
      key="dashboard"
      style={{
        fontWeight: selectedKey === "/" ? "bold" : "normal",
      }}
      icon={<DashboardOutlined />}
    >
      <Link to="/">{translate("dashboard.title", "Dashboard")}</Link>
      {!collapsed && selectedKey === "/" && (
        <div className="ant-menu-tree-arrow" />
      )}
    </Menu.Item>
  ) : null;

  const items = renderTreeView(menuItems, selectedKey);

  const renderSider = () => {
    if (render) {
      return render({
        dashboard,
        items,
        logout,
        collapsed,
      });
    }
    return (
      <>
        {dashboard}
        {items}
        {/* {logout} */}
      </>
    );
  };

  const renderMenu = () => {
    return (
      <Menu
        className="mt-4"
        selectedKeys={[selectedKey]}
        defaultOpenKeys={defaultOpenKeys}
        mode="inline"
        onClick={() => {
          setDrawerOpen(false);
          if (!breakpoint.lg) {
            setCollapsed(true);
          }
        }}
      >
        {renderSider()}
      </Menu>
    );
  };

  const renderDrawerSider = () => {
    return (
      <>
        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          placement="left"
          closable={false}
          width={280}
          bodyStyle={{
            padding: 0,
            overflow: "hidden",
          }}
          maskClosable={true}
        >
          <Layout>
            <Layout.Sider
              width={280}
              style={{
                overflow: "auto",
                height: "100vh",
                position: "fixed",
                left: 0,
                top: 0,
                bottom: 0,
                backgroundColor: colorPrimary,
              }}
            >
              <RenderToTitle collapsed={false} />
              {renderMenu()}
            </Layout.Sider>
          </Layout>
        </Drawer>
        <Button
          style={drawerButtonStyles}
          size="large"
          onClick={() => setDrawerOpen(true)}
          icon={<BarsOutlined />}
        ></Button>
      </>
    );
  };

  const renderContent = () => {
    if (isMobile) {
      return renderDrawerSider();
    }

    return (
      <>
        <Layout.Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
          width={280}
          collapsedWidth={80}
          breakpoint="lg"
          style={{
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            backgroundColor: colorPrimary,
            zIndex: 10,
          }}
          trigger={null}
        >
          <RenderToTitle collapsed={collapsed} />
          {renderMenu()}
          <p className="text-white fixed bottom-0 left-4 italic">
            {`v ${packageJson.version}`}
          </p>
          <Button
            shape="circle"
            size="small"
            onClick={() => setCollapsed(!collapsed)}
            className="absolute top-32 -right-3 z-20 shadow-lg"
            icon={
              <>
                {collapsed ? (
                  <RightOutlined className="text-[10px] relative -top-[1px] left-[1px]" />
                ) : (
                  <LeftOutlined className="text-[10px] relative -top-[1px] left-[0px]" />
                )}
              </>
            }
          ></Button>
        </Layout.Sider>

        <Layout.Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(collapsed: boolean): void => setCollapsed(collapsed)}
          width={280}
          collapsedWidth={80}
          breakpoint="lg"
          style={{
            overflow: "auto",
            height: "100vh",
            opacity: 0,
          }}
          trigger={null}
        />
      </>
    );
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            colorItemBg: "transparent",
            colorItemText: "#fff",
            colorItemTextSelected: "#fff",
            colorItemBgSelected: "transparent",
            colorItemTextHover: "#fff",
          },
        },
      }}
    >
      {renderContent()}
    </ConfigProvider>
  );
};
