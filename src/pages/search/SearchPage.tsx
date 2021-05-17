import React, { useEffect } from 'react';
import styles from './SearchPage.module.css';
import { FilterArea, ProductList } from '../../components';
import { useParams, useLocation, useRouteMatch } from 'react-router-dom';
import { Spin } from 'antd';
import { searchProduct } from '../../redux/productSearch/slice';
import { useSelector } from '../../redux/hooks';
import { useDispatch } from 'react-redux';
import { MainLayout } from '../../layouts';

interface MatchParams {
    keywords: string
}

export const SearchPage: React.FC = () => {
    const { keywords } = useParams<MatchParams>()
    const loading = useSelector(state => state.productSearch.loading)
    const error = useSelector(state => state.productSearch.error)
    const pagination = useSelector(state => state.productSearch.pagination)
    const productList = useSelector(state => state.productSearch.data)
    const dispatch = useDispatch()
    const location = useLocation()

    useEffect(() => { // 监听url的变化
        dispatch(searchProduct({
            nextPage: 1,
            pageSize: 10,
            keywords
        }))
    }, [location])

    const onPageChange = (nextPage, pageSize) => {
        dispatch(searchProduct({
            nextPage,
            pageSize,
            keywords
        }))
    }

    // if (loading) { // 处理数据为空的时候转菊花
    //     return <Spin size='large' style={{ margin: "48vh auto", width: "100%" }} />
    // }

    if (error) { // 处理网络请求错误
        return <div>网站错误:{error}</div>
    }

    return (
        <MainLayout>
            {/* 分类过滤器 */}
            <div className={styles['product-list-container']}> <FilterArea /> </div>
            {/* 产品列表 */}
            <div className={styles['product-list-container']}>
                {
                    !productList ? <div>产品列表 暂无数据</div> :
                        <ProductList
                            data={productList}
                            paging={pagination}
                            onPageChange={onPageChange} />
                }
            </div>
        </MainLayout>
    )
}