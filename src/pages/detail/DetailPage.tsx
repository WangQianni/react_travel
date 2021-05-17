import React, { useState, useEffect } from 'react';
import { RouteComponentProps, useParams } from 'react-router-dom';
import axios from 'axios';
import { Spin, Row, Col, DatePicker, Divider, Typography, Anchor, Menu, Button } from 'antd';
import { ProductIntro, ProductComments } from '../../components';
import styles from './DetailPage.module.css';
import { commentMockData } from './mockup';
import { productDetailSlice, getProductDetail } from '../../redux/productDetail/slice';
import { useSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import { MainLayout } from '../../layouts';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { addShoppingCart } from '../../redux/shoppingCart/slice';

interface MatchParams {
    touristRouteId: string
}

export const DetailPage: React.FC<RouteComponentProps<MatchParams>> = (props) => {
    const { RangePicker } = DatePicker;
    // console.log(props.match);
    // console.log(props.history);
    // console.log(props.location);
    const { touristRouteId } = useParams<MatchParams>()
    // const [loading, setLoading] = useState<boolean>(true)
    // const [product, setProduct] = useState<any>(null)
    // const [error, setError] = useState<string | null>(null)
    const loading = useSelector(state => state.productDetail.loading)
    const error = useSelector(state => state.productDetail.error)
    const product = useSelector(state => state.productDetail.data)
    const dispatch = useDispatch()

    const jwt = useSelector(state => state.user.token) as string
    const shoppingCartLoading = useSelector(state => state.user.loading)

    // useEffect(() => { // MVC设计模式写法
    //     const fetchData = async () => {
    //         setLoading(true)
    //         try {
    //             const res = await axios.get(`http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`)
    //             setLoading(false)
    //             setProduct(res.data)
    //         } catch (err) {
    //             setError(err.message)
    //             setLoading(false)
    //         }
    //     }
    //     fetchData()
    // }, []);

    // useEffect(() => { // 没在redux-toolkit使用异步
    //     const fetchData = async () => {
    //         dispatch(productDetailSlice.actions.fetchStart())
    //         try {
    //             const res = await axios.get(`http://123.56.149.216:8080/api/touristRoutes/${touristRouteId}`)
    //             dispatch(productDetailSlice.actions.fetchSuccess(res.data))
    //         } catch (err) {
    //             dispatch(productDetailSlice.actions.fetchFail(err.message))
    //         }
    //     }
    //     fetchData()
    // }, []);

    useEffect(() => { // 在redux-toolkit使用异步
        dispatch(getProductDetail(touristRouteId))
    }, []);


    if (loading) { // 处理数据为空的时候转菊花
        return <Spin size='large' style={{ margin: "48vh auto", width: "100%" }} />
    }

    // if (error) { // 处理网络请求错误
    //     return <div>网站错误:{error}</div>
    // }

    return (
        <MainLayout>
            {/* 产品简介 与 日期选择 */}
            <div className={styles['product-intro-container']}>
                <Row>
                    <Col span={13}>
                        {
                            !product ? <div style={{ height: 280, padding: 24 }}>产品简介 空数据</div> : <ProductIntro title={product.title}
                                shortDescription={product.shortDescription}
                                price={product.originalPrice}
                                coupons={product.coupons}
                                points={product.points}
                                discount={product.discount}
                                rating={product.rating}
                                pictures={product.touristRoutePictures.map(v => v.url)} />
                        }
                    </Col>
                    <Col span={11}>
                        {/* <Button type="primary" danger onClick={() => dispatch(addShoppingCart({ jwt, touristRouteId: product.id }))} loading={shoppingCartLoading} style={{ marginTop: 50, marginBottom: 30, display: "block" }}> */}
                        <Button type="primary" danger onClick={() => dispatch(addShoppingCart({ jwt, touristRouteId }))} loading={shoppingCartLoading} style={{ marginTop: 50, marginBottom: 30, display: "block" }}>
                            <ShoppingCartOutlined />放入购物车
                        </Button>
                        <RangePicker style={{ marginTop: 20 }} />
                    </Col>
                </Row>
            </div>
            {/* 锚点菜单 */}
            <Anchor className={styles['product-detail-anchor']}>
                <Menu mode='horizontal'>
                    <Menu.Item key={1}>
                        <Anchor.Link href="#feature" title="产品特色"></Anchor.Link>
                    </Menu.Item>
                    <Menu.Item key={2}>
                        <Anchor.Link href="#fees" title="费用"></Anchor.Link>
                    </Menu.Item>
                    <Menu.Item key={3}>
                        <Anchor.Link href="#notes" title="预定须知"></Anchor.Link>
                    </Menu.Item>
                    <Menu.Item key={4}>
                        <Anchor.Link href="#comments" title="商品评价"></Anchor.Link>
                    </Menu.Item>
                </Menu>
            </Anchor>
            {/* 产品特色 */}
            <div id='feature' className={styles['product-detail-container']}>
                <Divider orientation={'center'}>
                    <Typography.Title level={3}>产品特色</Typography.Title>
                </Divider>
                {
                    !product ? <div style={{ height: 280, padding: 24 }}>产品特色 暂无数据</div> : <div dangerouslySetInnerHTML={{ __html: product.feature }} style={{ margin: 50 }}></div>
                }
            </div>
            {/* 费用 */}
            <div id='fees' className={styles['product-detail-container']}>
                <Divider orientation={'center'}>
                    <Typography.Title level={3}>费用</Typography.Title>
                </Divider>
                {
                    !product ? <div style={{ height: 280, padding: 24 }}>费用 暂无数据</div> : <div dangerouslySetInnerHTML={{ __html: product.fees }} style={{ margin: 50 }}></div>
                }
            </div>
            {/* 预定须知 */}
            <div id='notes' className={styles['product-detail-container']}>
                <Divider orientation={'center'}>
                    <Typography.Title level={3}>预定须知</Typography.Title>
                </Divider>
                {
                    !product ? <div style={{ height: 280, padding: 24 }}>预定须知 暂无数据</div> : <div dangerouslySetInnerHTML={{ __html: product.notes }} style={{ margin: 50 }}></div>
                }
            </div>
            {/* 商品评价 */}
            <div id='comments' className={styles['product-detail-container']}>
                <Divider orientation={'center'}>
                    <Typography.Title level={3}>商品评价</Typography.Title>
                </Divider>
                {
                    !commentMockData ? <div style={{ height: 280, padding: 24 }}>商品评价 暂无数据</div> :
                        <div style={{ margin: 40 }}>
                            <ProductComments data={commentMockData} />
                        </div>
                }
            </div>
        </MainLayout>
    )
}