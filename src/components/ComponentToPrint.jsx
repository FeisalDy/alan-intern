import React from 'react'
import Image from 'next/image'

export class ComponentToPrint extends React.PureComponent {
  render () {
    const { cart, totalAmount } = this.props

    return (
      <div className='w-full h-full p-2 bg-white border'>
        <Image
          src='https://alan.co.id/wp-content/uploads/2022/09/Logo-Alan-Creative-1536x360-1.png'
          alt='logo'
          width={1536}
          height={360}
        />

        <div className=''>
          {cart?.map(data => (
            <div key={data.id} className='grid grid-cols-3 mx-5'>
              <div className='py-2'>{data.nama}</div>
              {data.qty === 1 ? (
                <div className='justify-self-end'></div>
              ) : (
                <div className='justify-self-end'>x{data.qty}</div>
              )}
              <div className='justify-self-end'>Rp. {data.total}</div>
            </div>
          ))}
          <div className='grid grid-cols-2 py-2 mx-5'>
            <div className=''>Total :</div>
            <div className='text-end'>Rp. {totalAmount}</div>
          </div>
        </div>
      </div>
    )
  }
}
