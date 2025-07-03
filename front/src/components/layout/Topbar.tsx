import React from 'react'
import { HeartIcon, LogoIcon } from '../icons'
import SearchInput from './SearchInput'

const Topbar = () => {
  return (
    <div className='py-6 px-4 md:hidden sticky top-0 left-0 right-0 z-30 bg-ig-primary-background border-b border-b-ig-stroke'>
        <div className='flex justify-between items-center'>
            <LogoIcon />
            <div className='flex gap-4 items-center'>
                <SearchInput />
                <HeartIcon />
            </div>
        </div>
    </div>
  )
}

export default Topbar