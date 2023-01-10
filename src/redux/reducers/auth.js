import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_CONFIRM_SUCCESS,
    RESET_PASSWORD_CONFIRM_FAIL,
    SET_AUTH_LOADING,
    REMOVE_AUTH_LOADING,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    REFRESH_SUCCESS,
    REFRESH_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    LOGOUT
 } from "redux/actions/auth/types";

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null,
    loading: false,
    user_loading: true
}

export default function auth(state = initialState, action){
    const {type, payload} = action

    switch(type){
        // Login correcto
        case LOGIN_SUCCESS:
            localStorage.setItem('access', payload.access)            
            localStorage.setItem('refresh', payload.refresh)
            return{
                ...state,
                isAuthenticated: true,
                access: localStorage.getItem('accesss'),
                refresh: localStorage.getItem('refresh')
            }
        

        // Autenticación
        case AUTHENTICATED_SUCCESS:
            return{
                ...state,
                isAuthenticated: true
            }
        
        case AUTHENTICATED_FAIL:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return{
                ...state,
                access: null,                    
                refresh: null,
                isAuthenticated: false,
            }

        // Restaurar contraseña 
        case RESET_PASSWORD_SUCCESS:
        case RESET_PASSWORD_FAIL:
        case RESET_PASSWORD_CONFIRM_SUCCESS:
        case RESET_PASSWORD_CONFIRM_FAIL:
            return {
                ...state
            }


        // Refresh correcto
        case REFRESH_SUCCESS:
            localStorage.setItem('access', payload.access)
            return{
                ...state,
                access: localStorage.getItem('access')
            }
        
            
            // Fallo en el Login
        case REFRESH_FAIL:
        case LOGIN_FAIL:
        case LOGOUT:
                localStorage.removeItem('access')
                localStorage.removeItem('refresh')
                return{
                    ...state,
                    access: null,                    
                    refresh: null,
                    isAuthenticated: false,
                    user: null,
                }
                 
        // Loading de autenticación
        case SET_AUTH_LOADING:
            return{
                ...state,
                loading: true
            }
        case REMOVE_AUTH_LOADING:
            return{
                ...state,
                loading: false
            }
        
        // Carga de usuario
        case USER_LOADED_SUCCESS:
            return{
                ...state,
                user: payload,
                user_loading: false
            }
        
        case USER_LOADED_FAIL:
            return{
                ...state,
                user: payload,
                user_loading: false
            }

        default:
            return state
    }
}