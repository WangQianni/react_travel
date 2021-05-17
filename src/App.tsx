import React, { useEffect } from 'react';
import styles from './App.module.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomePage, SignInPage, RegisterPage, DetailPage, SearchPage, ShoppingCart, PlaceOrder } from './pages';
import { Redirect } from 'react-router-dom';
import { useSelector } from './redux/hooks';
import { useDispatch } from 'react-redux';
import { getShoppingCart } from './redux/shoppingCart/slice';

const PrivateRoute = ({ component, isAuthenticated, ...rest }) => { // 搭建购物车私有路由
    const routeComponent = props => isAuthenticated ? React.createElement(component, props) : <Redirect to={{ pathname: '/signIn' }} />
    return <Route render={routeComponent} {...rest} />
}

export const App: React.FC = () => {
    const jwt = useSelector(state => state.user.token)
    const dispatch = useDispatch()

    useEffect(() => {
        if(jwt) {
            dispatch(getShoppingCart(jwt))
        }
    }, [jwt])

    return (
        <div className={styles.App}>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route path='/signIn' component={SignInPage} />
                    <Route path='/register' component={RegisterPage} />
                    <Route path='/detail/:touristRouteId' component={DetailPage} />
                    <Route path='/search/:keywords?' component={SearchPage} />
                    {/* 购物车路由跳转组件，只有用户登录了才可以进入 */}
                    <PrivateRoute isAuthenticated={jwt !== null} path='/shoppingCart' component={ShoppingCart} />
                    <PrivateRoute isAuthenticated={jwt !== null} path='/placeOrder' component={PlaceOrder} />
                    {/* 当找不到正确路由的时候 */}
                    <Route render={() => <h1>404 not found 页面被贪吃的胖墩吞了！</h1>} />
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
