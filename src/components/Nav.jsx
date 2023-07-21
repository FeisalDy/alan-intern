import React from 'react'
import Image from 'next/image'

const Nav = () => {
  return (
    <nav className='w-full mx-10 mt-4 flex-between'>
      <Image
        src='https://alan.co.id/wp-content/uploads/2022/09/Logo-Alan-Creative-1536x360-1.png'
        alt='logo'
        width={153}
        height={36}
      />
    </nav>
  )
}

export default Nav
