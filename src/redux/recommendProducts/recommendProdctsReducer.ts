import { FETCH_RECOMMEND_PRODUCTS_START, FETCH_RECOMMEND_RPODUCTS_SUCCESS, FETCH_RECOMMEND_RPODUCTS_FAIL, RecommendProductsAction } from './recommendProdctsActions';

interface RecommentdProductsState {
    productList: any[]
    error: string | null
    loading: boolean
}

const defaultState: RecommentdProductsState = {
    productList: [],
    error: null,
    loading: true
}

export default (state = defaultState, action: RecommendProductsAction) => {
    switch (action.type) {
        case FETCH_RECOMMEND_PRODUCTS_START:
            return {...state, loading: true};
        case FETCH_RECOMMEND_RPODUCTS_SUCCESS:
            return { ...state, loading: false, productList: action.paylaod };
        case FETCH_RECOMMEND_RPODUCTS_FAIL:
            return { ...state, loading: false, error: action.paylaod };
        default:
            return state;
    }
}