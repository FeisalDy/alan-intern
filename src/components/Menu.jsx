import React from 'react'
import MenuCard from './MenuCard'

const Menu = ({ data }) => {
  return (
    <div className=''>
      {data.map(menu => (
        <MenuCard key={menu.id} menu={menu} handleTagClick={() => {}} />
      ))}
    </div>
  )
}

export default Menu
