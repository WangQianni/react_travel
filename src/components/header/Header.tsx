import React, { useEffect, useState } from 'react';
import styles from './Header.module.css'
import logo from '../../assets/logo.svg';
import { Layout, Typography, Input, Menu, Button, Dropdown } from "antd";
import { GlobalOutlined } from '@ant-design/icons';
import { useHistory, useLocation, useParams, useRouteMatch } from 'react-router-dom';
import { useSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import { addLanguageActionCreate, changeLanguageActionCreate } from '../../redux/language/languageActions';
import { useTranslation } from 'react-i18next';
import jwt_decode, { JwtPayload as DefaultJwtPayload } from 'jwt-decode';
import { userSlice } from '../../redux/user/slice';

interface JwtPayload extends DefaultJwtPayload {
    username: string
}

export const Header: React.FC = (props) => {
    const history = useHistory()
    const location = useLocation()
    const params = useParams()
    const match = useRouteMatch()
    const language = useSelector(state => state.language.language)
    const languageList = useSelector(state => state.language.languageList)
    const dispatch = useDispatch()
    const { t } = useTranslation()
    // console.log(history, location, params, match);

    const jwt = useSelector(state => state.user.token)
    const [username, setUsername] = useState<string>()

    const shoppingCartItems = useSelector(state => state.shoppingCart.items)
    const shoppingCartLoading = useSelector(state => state.shoppingCart.loading)

    useEffect(() => {
        if (jwt) {
            // const token = jwt_decode<JwtPayload>(jwt) // jwt_decode 解码 JWT
            // setUsername(token.username) // 拿到jwt中的 username

            const JWT = Object.keys(JSON.parse(jwt))[0]// mock 数据
            setUsername(JWT) // mock 数据
        }
    }, [jwt])

    const menuClickHandler = e => {
        if (e.key === 'new') {
            // 处理新语言添加 action
            dispatch(addLanguageActionCreate('新语言', 'new_lang'))
        } else {
            dispatch(changeLanguageActionCreate(e.key))
        }
    }

    const onLogout = () => { // 登出
        dispatch(userSlice.actions.logOut())
        history.push('/')
    }

    return (
        <div className={styles['app-header']}>
            {/* top-header */}
            <div className={styles['top-header']}>
                <div className={styles.inner}>
                    <Typography.Text>{t('header.slogan')}</Typography.Text>
                    <Dropdown.Button style={{ marginLeft: 15 }} overlay={
                        <Menu onClick={menuClickHandler}>
                            {languageList.map(v => (
                                <Menu.Item key={v.code}>{v.name}</Menu.Item>
                            ))}
                            <Menu.Item key={'new'}>{t('header.add_new_language')}</Menu.Item>
                        </Menu>
                    }
                        icon={<GlobalOutlined />}
                    >
                        {language == 'zh' ? "中文" : language == 'en' ? '英文' : ''}
                    </Dropdown.Button>
                    {
                        jwt ? <Button.Group className={styles['button-group']}>
                            <span style={{ marginRight: 18 }}>{t("header.welcome")}<Typography.Text strong>{username}</Typography.Text></span>
                            <Button loading={shoppingCartLoading} onClick={() => history.push('/shoppingCart')}>
                                {t('header.shoppingCart')}({shoppingCartItems.length})
                            </Button>
                            <Button onClick={onLogout}>{t('header.signOut')}</Button>
                        </Button.Group> :
                            <Button.Group className={styles['button-group']}>
                                <Button onClick={() => history.push('/register')}>{t('header.register')}</Button>
                                <Button onClick={() => history.push('/signIn')}>{t('header.signin')}</Button>
                            </Button.Group>
                    }
                </div>
            </div>
            {/* antd自带的头部 */}
            <Layout.Header className={styles['main-header']}>
                <span onClick={() => history.push('/')}>
                    <img src={logo} className={styles['App-logo']} alt="" />
                    {/* antd自带的Title */}
                    <Typography.Title level={3} className={styles.title}>{t('header.title')}</Typography.Title>
                </span>
                {/* antd自带的Input */}
                <Input.Search onSearch={keywords => history.push('/search')} className={styles['search-input']} placeholder={t('header.search_placeholder')}></Input.Search>
            </Layout.Header>
            <Menu mode={"horizontal"} className={styles['main-menu']}>
                <Menu.Item key={1}>{t('header.home_page')}</Menu.Item>
                <Menu.Item key={2}>{t('header.weekend')}</Menu.Item>
                <Menu.Item key={3}>{t('header.group')}</Menu.Item>
                <Menu.Item key={4}>{t('header.backpack')}</Menu.Item>
                <Menu.Item key={5}>{t('header.private')}</Menu.Item>
                <Menu.Item key={6}>{t('header.cruise')}</Menu.Item>
                <Menu.Item key={7}>{t('header.hotel')}</Menu.Item>
                <Menu.Item key={8}>{t('header.local')}</Menu.Item>
                <Menu.Item key={9}>{t('header.theme')}</Menu.Item>
                <Menu.Item key={10}>{t('header.custom')}</Menu.Item>
                <Menu.Item key={11}>{t('header.study')}</Menu.Item>
                <Menu.Item key={12}>{t('header.visa')}</Menu.Item>
                <Menu.Item key={13}>{t('header.enterprise')}</Menu.Item>
                <Menu.Item key={14}>{t('header.high_end')}</Menu.Item>
                <Menu.Item key={15}>{t('header.outdoor')}</Menu.Item>
                <Menu.Item key={16}>{t('header.insurance')}</Menu.Item>
            </Menu>
        </div>
    )
}