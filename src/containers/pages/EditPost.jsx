import Layout from 'hocs/layout/Layout'
import { useEffect, useState, Fragment } from 'react'
import { Helmet } from 'react-helmet-async'
import { connect } from 'react-redux'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { get_blog } from 'redux/actions/blog/blog'



// Icons
import { AiOutlineEye } from "react-icons/ai"
import { CgArrowsExchangeAlt } from "react-icons/cg"
import { FaPaperPlane, FaUnlockAlt } from "react-icons/fa"

// Others
import axios from 'axios'
import DOMPurify from "dompurify"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import { get_categories } from 'redux/actions/categories/categories'
import { Dialog, Transition } from '@headlessui/react'



function EditPost({
  get_blog,
  post,
  isAuthenticated,
  get_categories,
  categories
}) {

  const [open, setOpen] = useState(false)

    const params = useParams()
    const slug = params.slug
  const navigate = useNavigate()

    


    // Editar Post
    const [loading, setLoading] = useState(false)
    const [updateTitle, setUpdateTitle] = useState(false)
    const [updateSlug, setUpdateSlug] = useState(false)
    const [updateTimeRead, setUpdateTimeRead] = useState(false)
    const [updateDescription, setUpdateDescription] = useState(false)
    const [updateContent, setUpdateContent] = useState(false)
    const [episodeContent, setEpisodeContent] = useState('')
    const [showFullContent, setShowFullContent] = useState(false)
    const [updateCategory, setUpdateCategory] = useState(false)
    const [updateThumbnail, setUpdateThumbnail] = useState(false)
    const [previewImage, setPreviewImage] = useState()
    const [thumbnail, setThumbnail] = useState()
    const [formData, setFormData] = useState({
      title: '',
      new_slug: '',
      descripton: '',
      content: '',
      category: '',
      time_read: ''      
    })


        // Editar imágen
   const fileSelectedHandler = (e) =>{
    const file = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = (e) =>{
      setPreviewImage(reader.result)
    }
    setThumbnail(file)
 }
    
    useEffect(() => {
      window.scrollTo(0,0)
      get_blog(slug)
      get_categories()
    }, [])

  const { 
    title,
    new_slug,
    description,
    category,
    time_read
  } = formData 

  const onChange = e =>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }



  const onSubmit = e =>{
    e.preventDefault()

    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'multipart/form-data',
        'Authorization': `JWT ${localStorage.getItem('access')}`
      }
  };

    const formData = new FormData()
    formData.append('title', title)
    formData.append('slug', slug)
    formData.append('new_slug', new_slug)
    formData.append('description', description)
    formData.append('content', episodeContent)
    formData.append('category', category)
    formData.append('time_read', time_read)
    if(thumbnail){
      formData.append('thumbnail', thumbnail, thumbnail.name)
    }else{
        formData.append('thumbnail', '')

    }

    const fetchData = async()=>{
       setLoading(true)
       try{
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/blog/update`, formData, config)
       
        if(res.status === 200){
          if(new_slug !==''){
            await get_blog(new_slug)
          }else{
            await get_blog(slug)
          }
          setLoading(false)
          setUpdateTitle(false)
          setUpdateSlug(false)
          setUpdateDescription(false)
          setUpdateTimeRead(false)
          setUpdateContent(false)
          setUpdateCategory(false)
          setUpdateThumbnail(false)
          if(thumbnail){
            setThumbnail(null)
            setPreviewImage(null)}
        }else{
          setLoading(false)
          setUpdateTitle(false)
          setUpdateSlug(false)
          setUpdateDescription(false)
          setUpdateTimeRead(false)
          setUpdateContent(false)
          setUpdateCategory(false)
          setUpdateThumbnail(false)
          if(thumbnail){
            setThumbnail(null)
            setPreviewImage(null)}
        }
      }catch(err){
        setLoading(false)
        setUpdateTitle(false)
        setUpdateSlug(false)
        setUpdateDescription(false)
        setUpdateTimeRead(false)
        setUpdateContent(false)
        setUpdateCategory(false)
        setUpdateThumbnail(false)
        if(thumbnail){
          setThumbnail(null)
          setPreviewImage(null)}
        alert('Error al enviar')
       }
    }
    fetchData();
    if(new_slug !==''){
      navigate(`/blog/${new_slug}`)
    }
    

  }


  const onSubmitDraft = e =>{
    e.preventDefault()

    const config = {
      headers: {
        'Accept': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`
      }
  };

    const formData = new FormData()
    formData.append('slug', slug)

    const fetchData = async()=>{
       setLoading(true)
       try{
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/blog/draft`, formData, config)
       
        if(res.status === 200){
          if(new_slug !==''){
            await get_blog(new_slug)
          }else{
            await get_blog(slug)
          }
          setFormData({ 
            title:'',
            new_slug:'',
            description:'',
            content:'',
        })
          setLoading(false)
          if(thumbnail){
            setThumbnail(null)
            setPreviewImage(null)}
        }else{
          setOpen(false)
          setLoading(false)
          if(thumbnail){
            setThumbnail(null)
            setPreviewImage(null)}
        }
      }catch(err){
        setOpen(false)
        setLoading(false)
        setLoading(false)
        setUpdateTitle(false)
        setUpdateSlug(false)
        setUpdateDescription(false)
        setUpdateContent(false)
        setUpdateCategory(false)
        setUpdateThumbnail(false)
        if(thumbnail){
          setThumbnail(null)
          setPreviewImage(null)}
        alert('Error al enviar')
       }
    }
    fetchData();
    if(new_slug !==''){
      navigate(`/blog/${new_slug}`)
    }
    

  }


  const onSubmitPublish = e =>{
    e.preventDefault()

    const config = {
      headers: {
        'Accept': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`
      }
  };

    const formData = new FormData()
    formData.append('slug', slug)

    const fetchData = async()=>{
       setLoading(true)
       try{
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/blog/published`, formData, config)
       
        if(res.status === 200){
          if(new_slug !==''){
            await get_blog(new_slug)
          }else{
            await get_blog(slug)
          }
          setFormData({ 
            title:'',
            new_slug:'',
            description:'',
            content:'',
        })
          setLoading(false)
          if(thumbnail){
            setThumbnail(null)
            setPreviewImage(null)}
        }else{
          setOpen(false)
          setLoading(false)
          if(thumbnail){
            setThumbnail(null)
            setPreviewImage(null)}
        }
      }catch(err){
        setOpen(false)
        setLoading(false)
        setLoading(false)
        setUpdateTitle(false)
        setUpdateSlug(false)
        setUpdateDescription(false)
        setUpdateContent(false)
        setUpdateCategory(false)
        setUpdateThumbnail(false)
        if(thumbnail){
          setThumbnail(null)
          setPreviewImage(null)}
        alert('Error al enviar')
       }
    }
    fetchData();
    if(new_slug !==''){
      navigate(`/blog/${new_slug}`)
    }
    

  }

if(!isAuthenticated){
  return <Navigate to="/" />
}

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
        <div className="ml-4 ">
         {/*  <h3 className="text-2xl font-medium leading-6 text-gray-900">Edit Post</h3> */}
          <p className="mt-2 text-2xl text-gray-500">
           {post&&post.title? <>{post.title}</>:<></>}
            </p>
            {post&& isAuthenticated ? 
          <div className='flex mt-6'>

            <h2 className=' font-semibold text-gray-600'>Status:</h2>
           
           {
            post.status == 'published' ? 
            <span className='flex mx-2 px-2 py-0.5 text-xs bg-green-400 text-white font-semibold rounded-md items-center'>
            published
            </span>
            :
            <span className='mx-2 px-2 py-0.5 text-xs bg-red-400 text-white font-semibold rounded-md '>
              draft
              </span>
           }
           <button 
           onClick={
            e=>setOpen(true)
           }
           >
           <CgArrowsExchangeAlt className=' my-0.5 text-xl'/>
           </button>
          </div>
          :<></>}
        </div>

      </div>
    </div>
    {
        post&& isAuthenticated ?
        <>      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">Applicant Information</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
      </div>
             {/* Title */}
      <div className="mt-5 border-t border-gray-200">
        <dl className="divide-y divide-gray-200">
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">Title</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {
                updateTitle ? <>
                <form onSubmit={e=>onSubmit(e)} className='w-full'>
                  <div className='inline-flex w-11/12'>
                  <input type="text"
                  name='title'
                  value={title}
                  onChange={e=>{onChange(e)}}
                  required
                  placeholder='' className='w-5/6 bg-white border border-gray-200'/>
                  </div>
                <button
                  type="submit"
                  className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none">
                  Save
                </button>

                </form>
                <button
                  onClick={()=>setUpdateTitle(false)}
                  type="button"
                  className=" rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
                >
                  Cancel
                </button>
                </>:<>
                {
                post.title ?              
                <span className="flex-grow">
                  {post.title}
                  </span>
                :
                <span className="flex-grow italic text-gray-400">
                  Cree un título
                  </span>
              }
              <span className="ml-4 flex-shrink-0">
                <button
                onClick={()=>{setUpdateTitle(true)
                  if(post.title){
                    setFormData({...formData, title: post.title})
                  }
                }}
                  type="button"
                  className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Update
                </button>
              </span>
                </>
              }
            </dd>
          </div>
        </dl>
      </div>

              {/* Slug */}
      <div className="mt-5 border-t border-gray-200">
        <dl className="divide-y divide-gray-200">
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">Slug</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {
                updateSlug ? <>
                <form onSubmit={e=>onSubmit(e)} className='w-full'>
                  <div className='inline-flex w-11/12'>
                  <input type="text"
                  value={new_slug}
                  name='new_slug'
                  onChange={e=>{onChange(e)}}
                  required
                  placeholder='' className='w-5/6 bg-white border border-gray-200'/>
                  </div>
                <button
                  type="submit"
                  className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none">
                  Save
                </button>

                </form>
                <button
                  onClick={()=>setUpdateSlug(false)}
                  type="button"
                  className=" rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
                >
                  Cancel
                </button>
                </>:<>
                <span className="flex-grow">{post.slug}</span>
              <span className="ml-4 flex-shrink-0">
                <button
                onClick={()=>{setUpdateSlug(true)
                setFormData({...formData, new_slug: post.slug})
                }}
                  type="button"
                  className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Update
                </button>
              </span>
                </>
              }
            </dd>
          </div>
        </dl>
      </div>

              {/* Description */}
      <div className="mt-5 border-t border-gray-200">
        <dl className="divide-y divide-gray-200">
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">Description</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {
                updateDescription ? <>
                <form onSubmit={e=>onSubmit(e)} className='w-full'>
                  <div className='flex items-center'>
                  <textarea type="text"
                  name='description'
                  value={description}
                  onChange={e=>{onChange(e)}}
                  required
                  placeholder='' className='appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none'/>
                 

                <button
                  type="submit"
                  className="font-medium flex-shrink-0 border-transparent border-4 text-indigo-500 hover:text-teal-800 text-sm py-1 px-2 rounded">
                  Save
                </button>

                <button
                  onClick={()=>{setUpdateDescription(false)
                  
                  }}
                  type="button"
                  className=" rounded-md bg-white font-medium text-indigo-500 hover:text-indigo-500 focus:outline-none"
                >
                  Cancel
                </button>
                </div>
                </form>
                </>:<>
                {
                  post.description ?
                  <span className="flex-grow">{post.description}</span>
                  :
                  <span className="flex-grow text-gray-500 italic">Cree una descripción</span>
                }
              <span className="ml-4 flex-shrink-0">
                <button
                onClick={()=>{setUpdateDescription(true)
                  if(post.description){
                setFormData({...formData, description: post.description})}
                }}
                  type="button"
                  className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Update
                </button>
              </span>
                </>
              }
            </dd>
          </div>
        </dl>
      </div>

             {/* Thumbnail */}
             <div className="mt-5 border-t border-gray-200">
        <dl className="divide-y divide-gray-200">
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">Thumbnail</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {
                updateThumbnail ? <>
                  <div className=''>
                <form onSubmit={e=>onSubmit(e)} className=''>
                  <div className=''>
                    <div className='h-72 w-full block'>
                    {
                      previewImage ?
                      <img className="absolute -z-10 h-72 w-3/7 object-cover bg-white opacity-60 blur-sm" src={previewImage}/>

                      :
                      <img className="absolute -z-10 h-72 w-3/7 object-cover bg-white opacity-60 blur-sm" src={post.thumbnail}/>

                    }

                  <input type="file" name="thumbnail" id="" className='w-full mt-32 mx-44 text-xs' required
                  onChange={e=>fileSelectedHandler(e)}
                  />
                    </div>
                <button
                  type="submit"
                  className="mt-4 mr-3 ml-10 rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none">
                  Save
                </button>
                <button
                  onClick={()=>{setUpdateThumbnail(false)
                  setThumbnail(null)
                  setPreviewImage(null)}
                  }
                  type="button"
                  className="mt-4 rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
                  >
                  Cancel
                </button>
                  </div>
                </form>
                </div>
                </>:<>
                <img className="h-72 w-full object-cover" src={post.thumbnail}/>
              <span className="ml-4 flex-shrink-0">
               <div className=''>
                <button
                onClick={()=>{setUpdateThumbnail(true)
                }}
                  type="button"
                  className="col-span-1 rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Update
                </button>
                </div>
              </span>
                </>
              }
            </dd>
          </div>
        </dl>
      </div>

              {/* Content */}
      <div className="mt-5 border-t border-gray-200">
        <dl className="divide-y divide-gray-200">
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">Content</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {
                updateContent ? <>
                <form onSubmit={e=>onSubmit(e)} className='w-full'>
                  <div className='flex items-center'>
                    <div className='w-10/12'>
                <CKEditor 
                editor = {ClassicEditor}
                data = {post.content}
                onChange={(event, editor) =>{
                  const data = editor.getData()
                  setEpisodeContent(data)
                }
                
                }
                />
                </div>
                <button
                  type="submit"
                  className="font-medium flex-shrink-0 border-transparent border-4 text-indigo-500 hover:text-teal-800 text-sm py-1 px-2 rounded">
                  Save
                </button>

                <button
                  onClick={()=>setUpdateContent(false)}
                  type="button"
                  className=" rounded-md bg-white font-medium text-indigo-500 hover:text-indigo-500 focus:outline-none"
                >
                  Cancel
                </button>
                </div>
                </form>
                </>:<>
                {
                  post.content ?
                  <div className=' prose prose-sm prose-orange w-full'>
                
                  {showFullContent ? 
                  <>
                  <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post.content) 
                }} className="flex-grow"/>
                <button 
                onClick={()=>setShowFullContent(false)}
                className='flex text-teal-500 font-semibold text-sm'><AiOutlineEye className='text-teal-500 text-lg mt-0.5 mr-1'/> Mostrar menos </button>
                </>
                  :
                  <>
                  <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post.content.length) > 220 ? 
                DOMPurify.sanitize(post.content).slice(0,226)+'...':
                DOMPurify.sanitize(post.content)  
                }} className="flex-grow"/>
                  {
                  post.content.length > 220 ?
                  <button 
                  onClick={()=>setShowFullContent(true)}
                  className='flex text-teal-500 font-semibold text-sm'>
                    
                    <AiOutlineEye className='text-teal-500 text-lg mt-0.5 mr-1'/> Mostrar más </button>
                    :
                    <>
                    
                    </>
                  }
                  </>
                  }
                  
                  </div>
                  :
                <span className="flex-grow text-gray-500 italic w-full">Cree un contenido</span>
                }


              <span className="ml-32 flex-shrink-0">
                <button
                onClick={()=>{setUpdateContent(true)
                }}
                  type="button"
                  className=" rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Update
                </button>
              </span>
                </>
              }
            </dd>
          </div>
        </dl>
      </div>

              {/* Time Read */}
      <div className="mt-5 border-t border-gray-200">
        <dl className="divide-y divide-gray-200">
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">Time Read</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {
                updateTimeRead ? <>
                <form onSubmit={e=>onSubmit(e)} className='w-full'>
                  <div className='inline-flex w-11/12'>
                  <input type="number"
                  name='time_read'
                  value={time_read}
                  onChange={e=>{onChange(e)}}
                  required
                  placeholder='' className='w-5/6 bg-white border border-gray-200'/>
                  </div>
                <button
                  type="submit"
                  className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none">
                  Save
                </button>

                </form>
                <button
                  onClick={()=>setUpdateTimeRead(false)}
                  type="button"
                  className=" rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
                >
                  Cancel
                </button>
                </>:<>
                {
                post.time_read ?              
                <span className="flex-grow">
                  {post.time_read} minutos
                  </span>
                :
                <span className="flex-grow italic text-gray-400">
                  Agrega un tiempo de lectura
                  </span>
              }
              <span className="ml-4 flex-shrink-0">
                <button
                onClick={()=>{setUpdateTimeRead(true)
                  if(post.time_read){
                    setFormData({...formData, time_read: post.time_read})
                  }
                }}
                  type="button"
                  className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Update
                </button>
              </span>
                </>
              }
            </dd>
          </div>
        </dl>
      </div>

                    {/* Cateories */}
                    <div className="mt-5 border-t border-gray-200">
        <dl className="divide-y divide-gray-200">
          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
            <dt className="text-sm font-medium text-gray-500">Category</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              {
                updateCategory ? <>
                <form onSubmit={e=>onSubmit(e)} className='w-full'>
                  <div className='flex w-full'>
                  <div className='w-11/12 flex items-center'>
                  {
                                        categories &&
                                        categories !== null &&
                                        categories !== undefined &&
                                        categories.map(category=>{
                                            if(category.sub_categories.length === 0){
                                                return(
                                                    <div key={category.id} className='flex items-center h-5 ml-3'>
                                                    <input
                                                        onChange={e => onChange(e)}
                                                        value={category.id.toString()}
                                                        name='category'
                                                        type='radio'
                                                        required
                                                        className='h-[16px] w-[16px] appearance-none text-teal-500 border-gray-300 rounded-full transition duration-300'
                                                    />
                                                    <label className="ml-2 text-lg dark:text-dark-txt text-gray-900 font-light">
                                                        {category.name}
                                                    </label>
                                                    </div>
                                                )
                                            }else{

                                                let result = []
                                                result.push(
                                                    <div key={category.id} className='flex items-center h-5 mt-2 ml-3'>
                                                    <input
                                                        onChange={e => onChange(e)}
                                                        value={category.id.toString()}
                                                        name='category'
                                                        type='radio'
                                                        required
                                                        className='h-[16px] w-[16px] appearance-none text-teal-500 border-gray-300 rounded-full transition duration-300'
                                                    />
                                                    <label className="ml-3 text-lg dark:text-dark-txt text-gray-900 font-regular">
                                                        {category.name}
                                                    </label>
                                                    </div>
                                                )

                                                category.sub_categories.map(sub_category=>{
                                                    result.push(
                                                        <div key={sub_category.id} className='flex items-center h-5 ml-2 mt-1 '>
                                                        <input
                                                            onChange={e => onChange(e)}
                                                            value={sub_category.id.toString()}
                                                            name='category'
                                                            type='radio'
                                                            className='h-[16px] w-[16px] appearance-none text-teal-500 border-gray-300 rounded-full transition duration-300'
                                                        />
                                                        <label className="ml-3 text-lg dark:text-dark-txt text-gray-900 font-light">
                                                            {sub_category.name}
                                                        </label>
                                                        </div>
                                                    )
                                                })
                                                return result
                                            }

                                        })
                                    }
                                    </div>
                <div className='flex'>
                <button
                  type="submit"
                  className="font-medium flex-shrink-0 border-transparent border-4 text-indigo-500 hover:text-teal-800 text-sm py-1 px-2 rounded">
                  Save
                </button>

                <button
                  onClick={()=>{setUpdateCategory(false)
                  
                  }}
                  type="button"
                  className=" rounded-md bg-white font-medium text-indigo-500 hover:text-indigo-500 focus:outline-none"
                >
                  Cancel
                </button>
                </div>
                </div>
                </form>
                </>:<>
                {
                  post.category ? 
                  <span className="flex-grow">{post.category.name}</span>
                  :
                  <span className="flex-grow text-gray-500 italic">Ponle una categoría</span>
                }
              <span className="ml-4 flex-shrink-0">
                <button
                onClick={()=>{setUpdateCategory(true)
                }}
                  type="button"
                  className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Update
                </button>
              </span>
                </>
              }
            </dd>
          </div>
        </dl>
      </div>
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
                    
                    {
                      post.title && post.description && post.slug && post.content && post.thumbnail && post.time_read ?
                      <>
                      {post.status == 'draft' ? 
                      <FaPaperPlane className="h-6 w-6 text-green-400" aria-hidden="true" />
                      :
                      <FaUnlockAlt className="h-6 w-6 text-red-400" aria-hidden="true" />
                      }
                      </>
                      :
                      <FaPaperPlane className="h-6 w-6 text-rose-400" aria-hidden="true" />
                    }
                    
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    {
                      post.status == 'published' ?
                      <span>¿Quieres poner este post en privado?</span>
                      
                      :
                      <span>¿Quieres publicar este post?</span>

                        }
              
                    
                    </Dialog.Title>
                    <div className="mt-2">

                    {
                      post.title && post.description && post.slug && post.content && post.thumbnail && post.time_read ?
                      <p className="text-sm text-gray-500">
                        Tienes todos los campos completos. Tu posts está listo para publicarse.
                      </p>                      
                      :
                      <p className="text-sm text-gray-500">
                        Tu post todavía no esta listo para publicarse. Asegúrate de
                        tener todos los campos completos.
                      </p>                    }
                    


                    </div>
                  </div>
                </div>
                {
                 post.title && post.description && post.slug && post.content && post.thumbnail && post.time_read ?
                  <>
                  {
  post.status == 'published' ?
                <form onSubmit={e=>onSubmitDraft(e)} className="mt-5 sm:mt-6">
<button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-rose-500 px-4 py-2 text-base font-medium text-white shadow-sm sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    
                      <span>
                        Draft
                      </span>
                      
                  </button>             

                </form>
                :
                <form onSubmit={e=>onSubmitPublish(e)} className="mt-5 sm:mt-6">
<button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-base font-medium text-white shadow-sm sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    
                      <span>
                        Publish
                      </span>
                      
                  </button>             

                </form>
                }
                  </>
                  :
                  <>
                  </>

                }

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
      </>
      :
      <>Loading...</>
    }
    


    </Layout>
  )
}

const mapStateToProps = state =>({
  post: state.blog.post,
  isAuthenticated: state.auth.isAuthenticated,
  categories: state.categories.categories
})

export default connect(mapStateToProps,{
  get_blog,
  get_categories
})(EditPost)