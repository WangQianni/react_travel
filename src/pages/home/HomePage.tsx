import React from 'react';
import { SideMenu, Carousel, PorductCollection } from '../../components';
import { Row, Col, Typography, Spin } from "antd";
import { productList1, productList2, productList3 } from './mockups'; // 假数据
import sideImage1 from '../../assets/images/sider_2019_02-04.png';
import sideImage2 from '../../assets/images/sider_2019_12-09.png';
import sideImage3 from '../../assets/images/sider_2019_02-04-2.png';
import { withTranslation, WithTranslation } from 'react-i18next'; // 小写的是高阶组件，大写的是类型定义
import { connect } from 'react-redux';
import { RootState } from '../../redux/store';
import { giveMeDataActionCreator } from '../../redux/recommendProducts/recommendProdctsActions';
import { MainLayout } from '../../layouts';


const mapStateToProps = (state: RootState) => {
    return {
        loading: state.recommendProdcts.loading,
        error: state.recommendProdcts.error,
        productList: state.recommendProdcts.productList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        giveMeData: () => {
            dispatch(giveMeDataActionCreator())
        }
    }
}

type PropsType = WithTranslation & ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

class HomePageComponent extends React.Component<PropsType> {
    componentDidCatch() { // 请求真实数据
        this.props.giveMeData()
    }

    render() {
        const { t } = this.props
        const { productList, loading, error } = this.props
        // if (loading) { // 处理数据为空的时候转菊花
        //     return <Spin size='large' style={{ margin: "48vh auto", width: "100%" }} />
        // }

        if (error) { // 处理网络请求错误
            return <div>网站错误:{error}</div>
        }

        return (
            <MainLayout>
                <Row style={{ marginTop: 20 }}>
                    <Col span={6}>
                        <SideMenu />
                    </Col>
                    <Col span={18}>
                        <Carousel />
                    </Col>
                </Row>
                <PorductCollection
                    title={<Typography.Title level={3} type="warning">{t('home_page.hot_recommended')}</Typography.Title>}
                    sideImage={sideImage1}
                    // 假数据
                    products={productList1}
                // 真实数据
                // products={productList[0].touristRoutes}
                />
                <PorductCollection
                    title={<Typography.Title level={3} type="warning">{t('home_page.new_arrival')}</Typography.Title>}
                    sideImage={sideImage2}
                    products={productList2}
                // products={productList[1].touristRoutes}
                />
                <PorductCollection
                    title={<Typography.Title level={3} type="success">{t('home_page.domestic_travel')}</Typography.Title>}
                    sideImage={sideImage3}
                    products={productList3}
                // products={productList[2].touristRoutes}
                />

            </MainLayout>
        )
    }
}
export const HomePage = connect(mapStateToProps, mapDispatchToProps)(withTranslation()(HomePageComponent)) // 第一个小括号是语言命名空间，可以理解为高阶函数的高阶函数