import React, { useState } from 'react'

const ChargePopup = ({ totalAmount, onClose, onCharge }) => {
  const [amountPaid, setAmountPaid] = useState('')
  const change = amountPaid - totalAmount

  const handleCharge = () => {
    if (change >= 0) {
      onCharge(amountPaid)
      onClose()
    }
  }

  return (
    <div className='fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-gray-500 bg-opacity-75'>
      <div className='p-6 bg-white rounded-lg shadow-lg'>
        <div className='mb-4 text-2xl font-semibold'>
          Total Charge: Rp. {totalAmount}
        </div>
        <input
          type='number'
          className='w-full p-2 mb-4 border rounded-lg'
          placeholder='Amount Paid'
          value={amountPaid}
          onChange={e => setAmountPaid(parseFloat(e.target.value))}
        />
        {change >= 0 ? (
          <div className='mb-4 text-xl font-semibold'>Change: Rp. {change}</div>
        ) : (
          <div className='mb-4 text-xl text-red-600'>
            Insufficient amount paid
          </div>
        )}
        <div className='grid grid-cols-2 gap-4'>
          <button
            className='p-2 text-white bg-gray-400 rounded-lg hover:bg-blue-300'
            onClick={handleCharge}
          >
            OK
          </button>
          <button
            className='p-2 text-white bg-gray-400 rounded-lg hover:bg-red-300'
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default ChargePopup
