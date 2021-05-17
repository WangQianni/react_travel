import React from 'react';
import styles from './Footer.module.css';
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";
import {useTranslation} from 'react-i18next';

export const Footer:React.FC = (props) => {
    const { t } = useTranslation()
    return (
        <Layout.Footer>
            <Typography.Title level={3} style={{ textAlign: 'center' }}>{t('footer.detail')}</Typography.Title>
        </Layout.Footer>
    )
}