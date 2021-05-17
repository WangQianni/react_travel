import React from 'react';
import styles from './SideMenu.module.css';
import { sideMenuList } from './mockup';
import { Menu } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
// import { useTranslation } from 'react-i18next';

export const SideMenu: React.FC = (props) => {
    // const { t } = useTranslation()
    return (
        <Menu mode={"vertical"} className={styles['side-menu']}>
            {
                sideMenuList.map((v, i) => (
                    <Menu.SubMenu key={`side-menu-${i}`} title={<span><GlobalOutlined />{v.title}</span>}>
                        {v.subMenu.map((item, index) => (
                            <Menu.SubMenu key={`sub-menu-${index}`} title={<span><GlobalOutlined />{item.title}</span>}>
                                {
                                    item.subMenu.map((m, mindex) => (
                                        <Menu.Item key={`sub-sub-${mindex}`}>
                                            <span><GlobalOutlined />{m}</span>
                                        </Menu.Item>
                                    ))
                                }
                            </Menu.SubMenu>
                        ))}
                    </Menu.SubMenu>
                ))
            }
        </Menu>
    )
}