import React from "react";
import styles from "./UserLayout.module.css";
import logo from "../../assets/logo.svg";
import { Link } from "react-router-dom";
import { CaretDownOutlined } from "@ant-design/icons";
import { Layout, Menu, Dropdown, Button } from "antd";
const { Header, Footer, Content } = Layout;

export const UserLayout: React.FC = ({children}) => {
  const menu = (
    <Menu>
      <Menu.Item>中文</Menu.Item>
      <Menu.Item>English</Menu.Item>
    </Menu>
  );

  return (
    <Layout className={styles["user-layout-container"]}>
      <Header className={styles["header"]}>
        <div className={styles["lang"]}>
          <Dropdown overlay={menu}>
            <Button>
              {" "}
              选择语言 <CaretDownOutlined />
            </Button>
          </Dropdown>
        </div>
      </Header>
      <Content className={styles["content"]}>
        <div className={styles["top"]}>
          <div className={styles["content-header"]}>
            <Link to="/">
              <img alt="logo" className={styles["logo"]} src={logo} />
              <span className={styles["title"]}>茜妮一个 旅游网</span>
            </Link>
          </div>
          <div className={styles["desc"]}>
            汤老师 是我毕生追寻的梦想 她引导着我走向光明
          </div>
          {children}
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>因为有你，我才见的五彩的世界</Footer>
    </Layout>
  );
};
