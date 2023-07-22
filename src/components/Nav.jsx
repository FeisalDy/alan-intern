import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Nav = () => {
  return (
    <nav className='flex justify-between mt-4 ml-10'>
      <div>
        <Link href='/'>
          <Image
            src='https://alan.co.id/wp-content/uploads/2022/09/Logo-Alan-Creative-1536x360-1.png'
            alt='logo'
            width={153}
            height={36}
          />
        </Link>
      </div>
      <div>
        <Link href='/admin'>
          <h1>Admin</h1>
        </Link>
      </div>
    </nav>
  )
}

export default Nav
