import { 
    GET_AUTHOR_BLOG_LIST_SUCCESS,
    GET_AUTHOR_BLOG_LIST_FAIL,
    GET_BLOG_SUCCESS,
    GET_BLOG_FAIL

 } from "redux/actions/blog/types";


 const initialState = {
    post: null,
    author_blog_list: null,
    blog_list_category : null,
    search_blog_list : null,
    count: null,
    next: null,
    previous: null
}


export default function blog(state=initialState, action){
    const {type, payload} = action

    switch(type){

        // Lista de Posts
        case GET_AUTHOR_BLOG_LIST_SUCCESS:
            return{
                ...state,
                author_blog_list: payload.results.posts,
                count: payload.count,
                next: payload.next,
                previous: payload.previous
            }
        case GET_AUTHOR_BLOG_LIST_FAIL:
            return{
                ...state,
                author_blog_list: null,
                count: null,
                next: null,
                previous: null
            }          


        // Post Único
        case GET_BLOG_SUCCESS:
            return{
                ...state,
                post: payload.post
            }
        case GET_BLOG_FAIL:
            return{
                ...state,
                post: null
            }

/*
        // Lista de Posts por Categoría
        case GET_BLOG_LIST_CATEGORIES_SUCCESS:
            return{
                ...state,
                blog_list_category: payload.results.posts,
                count: payload.count,
                next: payload.next,
                previous: payload.previous
            }
        case GET_BLOG_LIST_CATEGORIES_FAIL:
            return{
                ...state,
                blog_list_category: null,
                count: null,
                next: null,
                previous: null
            }  
            
            
        // Lista de Posts por término de Búsqueda
        case GET_SEARCH_BLOG_SUCCESS:
            return{
                ...state,
                search_blog_list: payload.results.filtered_posts,
                count: payload.count,
                next: payload.next,
                previous: payload.previous
            }
        case GET_SEARCH_BLOG_FAIL:
            return{
                ...state,
                search_blog_list: null,
                count: null,
                next: null,
                previous: null
            }    

         */
        // Default
        default:
            return state
    }
}