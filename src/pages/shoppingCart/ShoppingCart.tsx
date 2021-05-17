import React from 'react';
import styles from './ShoppingCart.module.css';
import { MainLayout } from '../../layouts';
import { Row, Col, Affix } from 'antd';
import { ProductList, PaymentCart } from '../../components';
import { useSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import { clearShoppingCart, checkout } from '../../redux/shoppingCart/slice';
import { useHistory } from 'react-router-dom';

export const ShoppingCart: React.FC = () => {
    const shoppingCartLoading = useSelector(s => s.shoppingCart.loading)
    const shoppingCartItems = useSelector(s => s.shoppingCart.items)
    const jwt = useSelector(s => s.user.token) as string
    const dispatch = useDispatch()
    const history = useHistory()

    return (
        <MainLayout>
            <Row>
                {/* 购物车清单 */}
                <Col span={16}>
                    <div>
                        {/* <ProductList data={shoppingCartItems.map(v => v.touristRoute)} /> */}
                    </div>
                </Col>
                {/* 支付卡组件 */}
                <Col span={8}>
                    <Affix>
                        <div>
                            {/* orginalPrice 原价 / price 折扣价 / onCheckout 下单按钮事件处理 / onShoppingCartClear 删除购物车信息 */}
                            {/* <PaymentCart
                                loading={shoppingCartLoading}
                                orginalPrice={shoppingCartItems.map(v => v.orginalPrice).reduce((a, b) => a + b, 0)}
                                price={shoppingCartItems.map(v => v.orginalPrice * (v.discountPresent ? v.discountPresent : 1)).reduce((a, b) => a + b, 0)}
                                onCheckout={() => { }}
                                onShoppingCartClear={() => { dispatch(clearShoppingCart({jwt, itemIds: shoppingCartItems.map(v=>v.id)})) }} /> */}

                            {/* mock 假数据 */}
                            <PaymentCart
                                loading={shoppingCartLoading}
                                orginalPrice={10}
                                price={8}
                                onCheckout={() => { }}
                                onShoppingCartClear={() => { }} />
                        </div>
                    </Affix>
                </Col>
            </Row>
        </MainLayout>
    )
}