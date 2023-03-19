import React from "react";
import { LoginPageProps, LoginFormTypes } from "@refinedev/core";
import {
  Row,
  Col,
  Layout,
  Card,
  Button,
  CardProps,
  LayoutProps,
  FormProps,
} from "antd";
import { useLogin } from "@refinedev/core";
import { GoogleOutlined } from "@ant-design/icons";
import logo from "assets/images/logo.png";

type LoginProps = LoginPageProps<LayoutProps, CardProps, FormProps>;

/**
 * **refine** has a default login page form which is served on `/login` route when the `authProvider` configuration is provided.
 *
 * @see {@link https://refine.dev/docs/ui-frameworks/antd/components/antd-auth-page/#login} for more details.
 */
export const LoginPage: React.FC<LoginProps> = ({
  providers,
  registerLink,
  forgotPasswordLink,
  rememberMe,
  contentProps,
  wrapperProps,
  renderContent,
  formProps,
}) => {
  const { mutate: login } = useLogin<LoginFormTypes>();

  const renderProviders = () => {
    if (providers && providers.length > 0) {
      return (
        <>
          {providers.map((provider) => {
            return (
              <Button
                size="large"
                key={provider.name}
                type="primary"
                block
                icon={provider.icon}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  marginBottom: "0px",
                }}
                onClick={() =>
                  login({
                    providerName: provider.name,
                  })
                }
              >
                <GoogleOutlined className="mr-2" />
                {provider.label}
              </Button>
            );
          })}
        </>
      );
    }
    return null;
  };

  const CardContent = (
    <Card
      className="bg-white/80 py-2 rounded-2xl shadow-2xl text-center"
      {...(contentProps ?? {})}
    >
      <img src={logo} className="w-full" alt="logo" />
      {renderProviders()}
    </Card>
  );

  return (
    <Layout {...(wrapperProps ?? {})}>
      <Row
        justify="center"
        align="middle"
        style={{
          height: "100vh",
        }}
      >
        <Col className="max-w-sm" xs={20}>
          {renderContent ? renderContent(CardContent) : CardContent}
        </Col>
      </Row>
    </Layout>
  );
};
