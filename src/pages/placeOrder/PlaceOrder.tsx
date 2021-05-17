import React from 'react';
import styles from './PlaceOrder.module.css';
import { MainLayout } from '../../layouts';
import { Row, Col } from 'antd';
import { useSelector } from '../../redux/hooks';
import { placeOrder } from '../../redux/order/slice';
import { useDispatch } from 'react-redux';

export const PlaceOrder: React.FC = () => {
    const jwt = useSelector(s => s.user.token)
    const loading = useSelector(s => s.order.loading)
    const order = useSelector(s => s.order.currentOrder)
    const dispatch = useDispatch()

    return (
        <MainLayout>
            <Row>
                <Col span={12}>信用卡支付组件</Col>
                <Col span={12}>
                    订单摘要
                </Col>
            </Row>
        </MainLayout>
    )
}