import { Link } from "react-router-dom";
import moment from "moment";
import { Fragment, useState } from 'react'
import img from "assets/img/z.jpg";

// Icons
import { AiOutlineEye } from "react-icons/ai"
import { BiPencil } from "react-icons/bi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import axios from "axios";
import { get_author_blog_list } from "redux/actions/blog/blog";
import { connect } from "react-redux";

function HorizontalCard({ data, get_author_blog_list }) {

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSubmitDelete = (e, slug) =>{
    e.preventDefault()

    const config = {
      headers: {
        'Accept': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`
      }
  };



    const fetchData = async()=>{
       setLoading(true)
       setOpen(false)
       try{
        const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/blog/delete/${slug}`, config)
       
        if(res.status === 200){
          get_author_blog_list()
        }
      }catch(err){

      }
    }
    fetchData();
}


  return (
    <div className="hover:drop-shadow-xl transition duration-300">
   <div className="grid lg:grid-cols-11 my-12 group bg-white"> 
<div className="col-span-5"> 
  <div className="my-2 px-3">
                      {
                        data.thumbnail ?
                        <img className="rounded-lg h-60 lg:w-100 w-full object-cover" src={data.thumbnail} />
                        :
                        <img className="rounded-lg h-60 lg:w-100 w-full object-cover" src={img} />
                      }
                     <div className="grid grid-cols-5">
                      <div className="mt-2 ml-8 col-span-4">
                      <span className="mx-1 font-medium text-green-500 text-xs">{data.views} views</span> <span className="text-gray-300"></span> 
                        <span className="mt-2 ml-2 mr-1 font-medium text-gray-500 text-xs">{moment(data.published).format('LL')}</span> <span className="text-gray-300"></span>
                      {
                        data.time_read ?
                        <span className="mt-2 mx-2 font-medium text-gray-500 text-xs">{data.time_read} min read</span> 
                        :
                        <span className="mt-2 mx-2 font-medium text-gray-500 text-xs">0 min read</span> 

                      }  
                      
                      </div>
                      <div className="flex mt-2 justify-end object-center  pt-0.5 rounded-lg">
                               {
                                  data.status == 'published' ? 
                                  <span className='flex mx-2 px-2 py-0.5 text-xs bg-green-400 text-white font-semibold  items-center'>
                                  published
                                  </span>
                                  :
                                  <span className='mx-2 px-2 py-0.5 text-xs bg-rose-400 text-white font-semibold  '>
                                    draft
                                    </span>
                                }
                        </div>
                      </div>
                    </div>
                    </div>
<div className="col-span-5" >
  {
    data.title ?
  <h2 className="flex text-2xl pt-2 mx-2 group-hover:text-orange-cus transition duration-300">
  {data.title}
  </h2>
  :
  <h2 className="flex text-2xl pt-2 mx-2 group-hover:text-orange-cus transition duration-300">
  {data.slug}
  </h2>
    
  }
{
  data.category ? 
  <span className="mx-1 font-medium text-orange-cus text-sm">{data.category.name}</span>   
  :
  <span className="mx-1 font-medium text-orange-400 text-sm italic">
  sin categoría  
  </span>   
}


{
data.description ? 
<p className="text-sm mx-2 pt-6">
{data.description}
</p>
:
<p className="text-xl mx-2 pt-6 italic text-gray-500">
Sin descripción
</p>
}
</div>
<div>
<div className="mt-2 inline-flex lg:inline-block">

<a href={`${process.env.REACT_APP_URL}/blog/${data.slug}`} target='_blank'><AiOutlineEye className=" my-1 text-xl lg:ml-8 ml-2 text-teal-600 hover:text-green-500 transition duration-500 ease-in-out"/></a>
       <Link to={`/blog/${data.slug}`}><BiPencil className="my-1 text-xl lg:ml-8 ml-2 text-teal-600 hover:text-indigo-500 transition duration-500 ease-in-out"/></Link>
      <button 
      className=""
      onClick={e=>{
        setOpen(true)
      }}
      >
         <RiDeleteBin6Line className=" my-1 text-xl lg:ml-8 ml-2 text-teal-600 hover:text-red-500 transition duration-500 ease-in-out"/>
         </button>       
      </div>               
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-6">
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    {
                      
                    }
                    
                    <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                      ¿Estas seguro de que quieres eliminar {data.title}?
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                      Se eliminará de forma permanente.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                <form onSubmit={e=>onSubmitDelete(e, data.slug)}>
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md  bg-rose-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-rose-700 focus:outline-none sm:text-sm"
                  >
                    ELiminar
                  </button>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>

{/* <div>
  <h2 className="text-center text-orange-cus">
  Preview
  </h2>
  <div className=" mx-22 border-2 border-gray-200 p-2 rounded-lg">
    <h2 className="-mb-2 font-semibold">
    {data.title}

    </h2>
    <div className="mb-[2px]">
                      <span className="font-medium text-green-500 text-[10px]">{data.views} views</span> <span className="text-gray-300"></span> 
                        <span className=" font-medium text-gray-500 text-[10px]">{moment(data.published).format('LL')}</span>
                        <span className=" font-medium text-gray-500 text-[10px]">{data.time_read} min read</span> 
                      </div>

    <h2 className="font-light text-[11px]">
    {data.description}
    </h2>
    <div className="h-20">
    <img className="h-full w-full object-cover" src={img} />
    </div>

  </div>
</div> */}


   </div>
   </div>
  );
}
const mapStateToProps = state =>({

})
export default connect(mapStateToProps,{
  get_author_blog_list,

})(HorizontalCard)

