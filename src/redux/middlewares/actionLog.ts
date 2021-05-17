import { Middleware } from 'redux';
import i18n from 'i18next';

export const actionLog: Middleware = store => next => action => {
    console.log("state 当前", store.getState());
    console.log("fire action", action);
    if (action.type == 'change_language') i18n.changeLanguage(action.payload)
    // i18n.changeLanguage(action.payload)
    next(action) // dispatch(action)  更改数据
    console.log("state 更新后", store.getState());
}