import { LockClosedIcon } from '@heroicons/react/20/solid'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import { login } from 'redux/actions/auth/auth'
import { check_authenticated, load_user, refresh } from "redux/actions/auth/auth"
import { Navigate } from 'react-router-dom'

// Images
import logo from "assets/img/s.png"


function Home({
  login,
  isAuthenticated,
  loading,
  check_authenticated,
  load_user,
  refresh,
  user_loading,
  user
}) {

  const [formData, setFormData] = useState(
{    email:'',
    password:''}
  )

  const {email, password} = formData

  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value})

  const onSubmit = e => {
    e.preventDefault()
    login(email, password)
    
  }

  useEffect(() => {
    isAuthenticated ? <></>:<>
      {refresh()}
      {check_authenticated()}
      {load_user()}
    </>
  }, [])

  if(isAuthenticated){
    return <Navigate to='/dashboard'/>
  }

  return (
    <>
      {/*
        This example requires updating your template:
        ```
        <html class="h-full bg-gray-50">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-16 w-auto"
              src={logo}
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl tracking-tight text-gray-900">
              Sign in to your account
            </h2>

          </div>
          <form onSubmit={e=>{onSubmit(e)}} className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  value={email}
                  type="email"
                  onChange={e=>onChange(e)}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  value={password}
                  type="password"
                  onChange={e=>onChange(e)}
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link to="/reset-password" className="font-medium text-orange-500 hover:text-orange-400">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-orange-500 py-2 px-4 text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-orange-400 group-hover:text-orange-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

const mapStateToPros = state =>({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  user_loading: state.auth.user_loading,
  user: state.auth.user
})

export default connect(mapStateToPros,{
  login,
  check_authenticated,
  load_user,
  refresh
})(Home)