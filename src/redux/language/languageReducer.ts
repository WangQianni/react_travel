import i18n from 'i18next';
import { CHANGE_LANGUAGE, ADD_LANGUAGE, LanguageActionTypes } from './languageActions';

interface LanguageState {
    language: 'en' | 'zh';
    languageList: { name: string, code: string }[]
}

const defaultState: LanguageState = {
    language: 'zh',
    languageList: [
        { name: '中文', code: 'zh' },
        { name: 'Englist', code: 'en' }
    ]
}

export default (state = defaultState, action: LanguageActionTypes) => {
    switch (action.type) {
        case CHANGE_LANGUAGE:
            // i18n.changeLanguage(action.payload) // 这种写法不是纯函数写法，违背了redux的初衷
            return { ...state, language: action.payload }
        case ADD_LANGUAGE:
            return { ...state, languageList: [...state.languageList, action.payload] }
        default:
            return state;
    }
}