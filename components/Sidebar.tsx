import React, { useState } from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
import GoogleLogin from 'react-google-login'
import { AiFillHome, AiOutlineMenu } from 'react-icons/ai'
import { BsCameraVideo } from 'react-icons/bs'
import { ImCancelCircle } from 'react-icons/im'
import { HiOutlineUsers } from 'react-icons/hi'

import useAuthStore from '../store/authStore'
import { createOrGetUser } from '../utils'
import Discover from './Dicover'
import SuggestedAccounts from './SuggestedAccounts'
import Footer from './Footer'

const Sidebar = () => {
    const [showSidebar, setShowSidebar] = useState(true)
    const { userProfile, addUser, removeUser } = useAuthStore()

    // const userProfile = false

    const normalLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded'
    const unclickedLink = 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-black rounded'
  return (
    <div>
        <div className="block xl:hidden m-2 ml-4 mt-3 text-xl"
            onClick={() => setShowSidebar(prevState => !prevState)}
        >
            {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
        </div>
        {showSidebar && (
            <div className="xl:w-400 w-20 flex flex-col justify-start
            mb-10 border-r-2 border-gray-100 xl:border-0 p-3">
                <div className="xl:border-b-2 border-gray-200 xl:pb-4">
                    <Link href='/'>
                        <div className={normalLink}>
                            <p className='text-2xl'>
                                <AiFillHome />
                            </p>
                            <span className='text-xl hidden xl:block'>
                                For You
                            </span>
                        </div>
                    </Link>
                    <Link href=''>
                        <div className={unclickedLink}>
                            <p className='text-2xl'>
                                <HiOutlineUsers />
                            </p>
                            <span className='text-xl hidden xl:block'>
                                Following
                            </span>
                        </div>
                    </Link>
                    <Link href=''>
                        <div className={unclickedLink}>
                            <p className='text-2xl'>
                                <BsCameraVideo />
                            </p>
                            <span className='text-xl hidden xl:block'>
                                LIVE
                            </span>
                        </div>
                    </Link>
                </div>
                {!userProfile && (
                    <div className='px-2 py-4 hidden xl:block'>
                        <p className='text-gray-400'>Log in to like and comment on videos</p>
                        <div className='pr-4'>
                            {/* <GoogleLogin 
                                clientId=''
                                render={(renderProps) => (
                                    <button 
                                    className='bg-white text-lg text-[#F51997] cursor-pointer
                                    font-semibold border-[1px] border-[#F51997] px-6 py-3 rounded-md outline-none w-full mt-3 
                                    hover:text-white hover:bg-[#F51997] transition duration-300'
                                    onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                        Login
                                    </button>
                                )}
                                onSuccess={() => {}}
                                onFailure={() => {}}
                                cookiePolicy='single_host_origin'
                            /> */}
                            <GoogleLogin 
                                render={(renderProps) => (
                                    <button 
                                    className='bg-white text-lg text-[#F51997] cursor-pointer
                                    font-semibold border-[1px] border-[#F51997] px-6 py-3 rounded-md outline-none w-full mt-3 
                                    hover:text-white hover:bg-[#F51997] transition duration-300'
                                    onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                        Login
                                    </button>
                                )}
                                onSuccess={(response) => createOrGetUser(response, addUser)}
                                onError={() => console.log('error')}
                            />
                        </div>
                    </div>
                )}
                <Discover />
                <SuggestedAccounts />
                <Footer />
            </div>
        )}
    </div>
  )
}

export default Sidebar