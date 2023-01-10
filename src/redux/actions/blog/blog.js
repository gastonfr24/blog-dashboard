import axios from "axios";
import { 
    GET_AUTHOR_BLOG_LIST_SUCCESS,
    GET_AUTHOR_BLOG_LIST_FAIL,
    GET_BLOG_SUCCESS,
    GET_BLOG_FAIL
 } from "./types";


// Dashboard
export const get_author_blog_list = () => async dispatch =>{
    const config = {
        headers:{
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`
        }
    }

    try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/author-bloglist`, config)
        
        if(res.status === 200){
            dispatch({
                type: GET_AUTHOR_BLOG_LIST_SUCCESS,
                payload : res.data
            })
        }else {
            dispatch({
                type: GET_AUTHOR_BLOG_LIST_FAIL
            })
        }

    }catch(err){
        dispatch({
            type: GET_AUTHOR_BLOG_LIST_FAIL
        })
    }
}


export const get_author_blog_list_page = (page) => async dispatch =>{
    const config = {
        headers:{
            'Accept': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`

        }
    }

    try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/author-bloglist?p=${page}`, config)
        
        if(res.status === 200){
            dispatch({
                type: GET_AUTHOR_BLOG_LIST_SUCCESS,
                payload : res.data
            })
        }else {
            dispatch({
                type: GET_AUTHOR_BLOG_LIST_FAIL
            })
        }

    }catch(err){
        dispatch({
            type: GET_AUTHOR_BLOG_LIST_FAIL
        })
    }
}


export const get_blog = (slug) => async dispatch => {
    const config = {
        headers:{
            'Accept': 'application/json'
        }
    }

    try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/blog/author-detail/${slug}`, config)
        
        if(res.status === 200){
            dispatch({
                type: GET_BLOG_SUCCESS,
                payload : res.data
            })
        }else {
            dispatch({
                type: GET_BLOG_FAIL
            })
        }}catch(err){
            dispatch({
                type: GET_BLOG_FAIL
            })
        }
}