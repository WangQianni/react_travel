import React from 'react';
import styles from './PaymentCart.module.css';
import { useSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import { checkout } from '../../redux/shoppingCart/slice';
import { useHistory } from 'react-router-dom';
interface PropsType {
    loading: boolean
    orginalPrice: number | string
    price: number | string
    onCheckout: () => void
    onShoppingCartClear: () => void
}

export const PaymentCart: React.FC<PropsType> = () => {
    const shoppingCartItems = useSelector((s => s.shoppingCart.items))
    const jwt = useSelector(s => s.user.token) as string
    const history = useHistory()
    const dispatch = useDispatch()
    return (
        <div>
            支付卡组件
            <button onClick={() => {
                if (shoppingCartItems.length <= 0) return
                dispatch(checkout(jwt))
                history.push("/placeOrder")
            }}>下单</button>
        </div>
    )
}