import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {GoogleLogin, googleLogout } from "@react-oauth/google"
import { AiOutlineLogout } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { IoMdAdd } from 'react-icons/io'
import { createOrGetUser } from '../utils'

import logo from '../utils/tiktik-logo.png'
import image from '../utils/images3.png'
import { FaBalanceScaleLeft } from 'react-icons/fa'
import useAuthStore from '../store/authStore'

const Navbar = () => { 
    const { userProfile, addUser, removeUser } = useAuthStore()

    const router = useRouter()

    const [searchValue, setSearchValue] = useState()

    const handleSearch = (e: { preventDefault: () => void }) => {
        e.preventDefault()

        if(searchValue) {
            router.push(`/search/${searchValue}`)
        }
    }
  return (
    <div className='w-full flex justify-between items-center 
    border-b-2 border-gray-200 py-3 px-4 xl:px-12' >
        <div className='xl:container xl:mx-auto xl:px-8'>
            <Link href='/'>
                <div className='w-[100px] md:w-[130px]'>
                    <Image 
                        className='cursor-pointer'
                        src={image}
                        height={100}
                        color=''
                        alt='Tiktik'
                        layout='responsive'
                    />
                </div>
            </Link>

            
        </div>
        
        <div className='relative hidden md:block xl:mr-60'>
            <form className='absolute md:static top-10 -left-20 bg-white'
                onSubmit={handleSearch}
            >
                <input 
                    type="text" 
                    value={searchValue}
                    onChange={(e: any) => setSearchValue(e.target.value)}
                    placeholder="Search accounts and videos"
                    className='bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-md'
                />
                <button className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 pl-4 text-2xl text-gray-400'>
                    <BiSearch />
                </button>
            </form>
        </div>

            <div>
                {userProfile ? (
                    <div className='flex gap-5 md:gap-10'>
                        <Link href='/upload'>
                            <button className='border-2 px-2 md:px-4 md:py-3 text-md font-semibold flex items-center gap-2'>
                                <IoMdAdd className='text-xl' />{` `}
                                <span className='hidden md:block'>Upload</span>
                            </button>
                        </Link>
                        {userProfile.image && (
                            <Link href='/'>
                                <>
                                    <Image 
                                        width={40}
                                        height={40}
                                        className="rounded-full cursor-pointer"
                                        src={userProfile.image}
                                        alt="profile photo"
                                    />
                                </>
                            </Link>
                        )}
                        <button type='button' className='px-2'
                            onClick={() => {
                                googleLogout()
                                removeUser()
                            }}
                        >
                            <AiOutlineLogout color='red' fontSize={24}  />
                        </button>
                    </div>
                ) : (
                    <GoogleLogin 
                        onSuccess={(response) => createOrGetUser(response, addUser)}
                        onError={() => console.log('error')}
                    />
                )}
            </div>
    </div>
  )
}

export default Navbar