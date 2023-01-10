import BlogList from 'components/blog/BlogList'
import Layout from 'hocs/layout/Layout'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { connect } from 'react-redux'
import { get_author_blog_list, get_author_blog_list_page } from 'redux/actions/blog/blog'
import { get_categories } from 'redux/actions/categories/categories'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'


function Blog({
  get_author_blog_list,
  get_author_blog_list_page,
  get_categories,
  posts,
  count,
}) {

  const navigate = useNavigate()
  useEffect(() => {
    get_author_blog_list()
    get_categories()
  }, [])

  return (
    <Layout>
      <Helmet>
        <title>Viperpy | Dashboard Blog</title>
        <meta
          name="description"
          content="Viperpy Agency, Diseño Web con Inteligencia Artificial"
        />
        <meta
          name="keywords"
          content="agencia de marketing, agencia de software, creacion de paginas web, creacion de inteligencia artificial"
        />
        <link rel="canonical" href="https://www.viperpy.com/" />
        <meta name="robots" content="all" />
        <meta name="author" content="Viperpy" />
        <meta name="publisher" content="Viperpy" />
      </Helmet>

      <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
      <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="ml-4 mt-4">
          <h3 className="text-2xl font-medium leading-6 text-gray-900">Blog</h3>
          <p className="mt-3 text-sm text-gray-500">
            Crea un nuevo post o edita alguno anterior.
            </p>
        </div>
        <div className="ml-4 mt-4 flex-shrink-0">
          <button
          onClick={e=>{
            const config = {
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`
              }
          }

          const body = JSON.stringify({

          })

          const fetchData = async()=>{
            try{
              const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/blog/create`, body, config)
           
              if(res.status === 200){
                console.log(`/blog/${res.data.slug}`)
                return navigate(`/blog/${res.data.slug}`)
              }
           
            }catch(err){
              alert('Error al crear: '+ err)
            }
          }
          fetchData();
          
          }}
            type="button"
            className="relative inline-flex items-center rounded-md border border-transparent bg-orange-cus px-4 py-2 mr-8 text-sm font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Crear un Post
          </button>
        </div>
      </div>
    </div>

        <BlogList 
  posts={posts}
  get_blog_list_page={get_author_blog_list_page}
  count={count}
/>



    </Layout>
  )
}

const mapStateToProps = state =>({
  posts: state.blog.author_blog_list,
  categories: state.categories.categories,
  count: state.blog.count,
  next: state.blog.next,
  previous: state.blog.previous
})

export default connect(mapStateToProps,{
  get_author_blog_list,
  get_author_blog_list_page,
  get_categories
})(Blog)