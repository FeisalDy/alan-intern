'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { MdChevronLeft, MdChevronRight } from 'react-icons/md'
import { BsFillPersonLinesFill } from 'react-icons/bs'
import { PiListPlus } from 'react-icons/pi'
import { toast } from 'react-toastify'
import { ComponentToPrint } from '@/components/ComponentToPrint'
import { useReactToPrint } from 'react-to-print'
import ChargePopup from '@/components/ChargePopup'

const Home = () => {
  const [menu, setMenu] = useState([])
  const [jenisMenu, setJenisMenu] = useState([])
  const [cart, setCart] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)
  const [showChargePopup, setShowChargePopup] = useState(false)

  const handleCharge = amountPaid => {
    // Perform any necessary logic when the charge is successful, e.g., save the sale.
    console.log('Amount paid:', amountPaid)
    // You can reset the cart after successful charge, if needed.
    toast('Payment Successful')
    setCart([])
  }

  const toggleChargePopup = () => {
    setShowChargePopup(prev => !prev)
  }

  useEffect(() => {
    const getMenuData = async () => {
      try {
        const [menuRes, jenisMenuRes] = await Promise.all([
          fetch('http://localhost:8000/api/menu'),
          fetch('http://localhost:8000/api/jenis_menu')
        ])

        const [menuData, jenisMenuData] = await Promise.all([
          menuRes.json(),
          jenisMenuRes.json()
        ])

        // Combine the data based on jenis_menu_id
        const combinedData = menuData.map(menuItem => {
          const jenisMenu = jenisMenuData.find(
            jenisMenu => jenisMenu.id === menuItem.jenis_menu_id
          )

          return {
            ...menuItem,
            jenis_menu: jenisMenu // Attach the jenis_menu data to each menu item
          }
        })

        // Sort the data by the id of jenis_menu
        combinedData.sort((a, b) => a.jenis_menu.id - b.jenis_menu.id)

        setMenu(combinedData)
        setJenisMenu(jenisMenuData)
      } catch (error) {
        console.error('Error fetching menu data:', error)
      }
    }
    getMenuData()
  }, [])

  const slideLeft = sliderId => {
    const slider = document.getElementById(sliderId)
    if (slider) {
      slider.scrollLeft -= 100
    }
  }
  const slideRight = sliderId => {
    const slider = document.getElementById(sliderId)
    if (slider) {
      slider.scrollLeft += 100
    }
  }

  const addProductToCart = async data => {
    console.log(data)
    let findProduct = await cart.find(product => product.id === data.id)
    if (findProduct) {
      let newCart = []
      let newItem

      cart.forEach(product => {
        if (product.id === data.id) {
          newItem = {
            ...product,
            qty: product.qty + 1,
            total: product.harga * (product.qty + 1)
          }
          newCart.push(newItem)
        } else {
          newCart.push(product)
        }
      })
      setCart(newCart)
    } else {
      let addingProduct = {
        ...data,
        qty: 1,
        total: data.harga
      }
      setCart([...cart, addingProduct])
    }
  }

  const removeItem = () => {
    const newCart = []
    setCart(newCart)
  }

  useEffect(() => {
    let newTotalAmount = 0
    cart.forEach(icart => {
      newTotalAmount = newTotalAmount + parseInt(icart.total)
    })
    setTotalAmount(newTotalAmount)
  }, [cart])

  const saveCart = () => {
    toast('Bill Saved')
  }

  const componentRef = useRef()

  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current
  })

  const handlePrint = () => {
    handleReactToPrint()
  }

  return (
    <div className='flex w-screen h-screen p-4'>
      <div className='w-1/2 h-full text-xs'>
        <div className='flex items-center w-full'>
          <MdChevronLeft
            className='opacity-50 cursor-pointer hover:opacity-100'
            size={40}
            onClick={() => slideLeft('slider')}
          />
          <div
            id='slider'
            className='flex w-full h-full gap-4 overflow-auto whitespace-nowrap scroll-smooth scrollbar-hide'
          >
            {menu
              ?.filter(data => data.jenis_menu_id === 1)
              .map(data => (
                <div
                  key={data.nama}
                  className='my-4 bg-white min-w-max'
                  onClick={() => addProductToCart(data)}
                >
                  <div className='relative w-40 h-40'>
                    <Image
                      src='https://images.pexels.com/photos/15767257/pexels-photo-15767257/free-photo-of-a-woman-standing-by-a-wall.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
                      alt='example'
                      fill={true}
                      className='cursor-pointer'
                    />
                  </div>
                  <div className='flex justify-center'>{data.nama}</div>
                </div>
              ))}
          </div>
          <MdChevronRight
            className='opacity-50 cursor-pointer hover:opacity-100'
            size={40}
            onClick={() => slideRight('slider')}
          />
        </div>

        <div className='relative flex items-center w-full '>
          <MdChevronLeft
            className='opacity-50 cursor-pointer hover:opacity-100'
            size={40}
            onClick={() => slideLeft('slider2')}
          />
          <div
            id='slider2'
            className='flex w-full h-full gap-4 overflow-auto whitespace-nowrap scroll-smooth scrollbar-hide'
          >
            {menu
              ?.filter(data => data.jenis_menu_id === 2)
              .map(data => (
                <div
                  key={data.id}
                  className='my-4 bg-white min-w-max'
                  onClick={() => addProductToCart(data)}
                >
                  <div className='relative w-40 h-40 cursor-pointer'>
                    <Image
                      src='https://images.pexels.com/photos/15767257/pexels-photo-15767257/free-photo-of-a-woman-standing-by-a-wall.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
                      alt='example'
                      fill={true}
                      className=''
                    />
                  </div>
                  <div className='flex justify-center'>{data.nama}</div>
                </div>
              ))}
          </div>
          <MdChevronRight
            className='opacity-50 cursor-pointer hover:opacity-100'
            size={40}
            onClick={() => slideRight('slider2')}
          />
        </div>

        <div className='relative flex items-center w-full'>
          <MdChevronLeft
            className='opacity-50 cursor-pointer hover:opacity-100'
            size={40}
            onClick={() => slideLeft('slider3')}
          />
          <div
            id='slider3'
            className='flex w-full h-full gap-4 overflow-auto whitespace-nowrap scroll-smooth scrollbar-hide'
          >
            {menu
              ?.filter(data => data.jenis_menu_id === 3)
              .map(data => (
                <div
                  key={data.nama}
                  className='my-4 bg-white min-w-max'
                  onClick={() => addProductToCart(data)}
                >
                  <div className='relative w-40 h-40'>
                    <Image
                      src='https://images.pexels.com/photos/15767257/pexels-photo-15767257/free-photo-of-a-woman-standing-by-a-wall.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
                      alt='example'
                      fill={true}
                      className='cursor-pointer'
                    />
                  </div>
                  <div className='flex justify-center'>{data.nama}</div>
                </div>
              ))}
          </div>
          <MdChevronRight
            className='opacity-50 cursor-pointer hover:opacity-100'
            size={40}
            onClick={() => slideRight('slider3')}
          />
        </div>

        <div className='relative flex items-center w-full'>
          <MdChevronLeft
            className='opacity-50 cursor-pointer hover:opacity-100'
            size={40}
            onClick={() => slideLeft('slider4')}
          />
          <div
            id='slider4'
            className='flex w-full h-full gap-4 overflow-auto whitespace-nowrap scroll-smooth scrollbar-hide'
          >
            {menu
              ?.filter(data => data.jenis_menu_id === 4)
              .map(data => (
                <div
                  key={data.nama}
                  className='my-4 bg-white min-w-max'
                  onClick={() => addProductToCart(data)}
                >
                  <div className='relative w-40 h-40'>
                    <Image
                      src='https://images.pexels.com/photos/15767257/pexels-photo-15767257/free-photo-of-a-woman-standing-by-a-wall.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
                      alt='example'
                      fill={true}
                      className='cursor-pointer'
                    />
                  </div>
                  <div className='flex justify-center'>{data.nama}</div>
                </div>
              ))}
          </div>
          <MdChevronRight
            className='opacity-50 cursor-pointer hover:opacity-100'
            size={40}
            onClick={() => slideRight('slider4')}
          />
        </div>

        <div className='relative flex items-center w-full '>
          <MdChevronLeft
            className='opacity-50 cursor-pointer hover:opacity-100'
            size={40}
            onClick={() => slideLeft('slider5')}
          />
          <div
            id='slider5'
            className='flex w-full h-full gap-4 overflow-auto whitespace-nowrap scroll-smooth scrollbar-hide'
          >
            {menu
              ?.filter(data => data.diskon !== '')
              .map(data => (
                <div
                  key={data.nama}
                  className='my-4 bg-white min-w-max'
                  onClick={() => addProductToCart(data)}
                >
                  <div className='relative w-40 h-40'>
                    <Image
                      src='https://images.pexels.com/photos/15767257/pexels-photo-15767257/free-photo-of-a-woman-standing-by-a-wall.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
                      alt='example'
                      fill={true}
                      className='cursor-pointer'
                    />
                  </div>
                  <div className='flex justify-center'>{data.nama}</div>
                </div>
              ))}
          </div>
          <MdChevronRight
            className='opacity-50 cursor-pointer hover:opacity-100'
            size={40}
            onClick={() => slideRight('slider5')}
          />
        </div>
      </div>

      <div className='w-2/12 h-5/6'>
        <div className='flex flex-col items-center text-xs'>
          {jenisMenu?.map(data => (
            <div key={data.id} className='my-4 min-w-max'>
              <div className='relative w-40 h-40'>
                <Image
                  src='https://images.pexels.com/photos/15767257/pexels-photo-15767257/free-photo-of-a-woman-standing-by-a-wall.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
                  alt='example'
                  fill={true}
                  className=''
                />
              </div>
              <div className='flex justify-center bg-white'>{data.nama}</div>
            </div>
          ))}
          <div className='flex flex-col my-4'>
            <div className='relative w-40 h-40'>
              <Image
                src='https://images.pexels.com/photos/15767257/pexels-photo-15767257/free-photo-of-a-woman-standing-by-a-wall.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load'
                alt='example'
                fill={true}
                className=''
              />
            </div>
            <div className='flex justify-center bg-white'>Happy Hour</div>
          </div>
        </div>
      </div>

      <div className='w-4/12 p-2 bg-white border h-5/6'>
        <div style={{ display: 'none' }}>
          <ComponentToPrint
            cart={cart}
            totalAmount={totalAmount}
            ref={componentRef}
          />
        </div>
        <div className='flex justify-between pb-6'>
          <div>
            <BsFillPersonLinesFill size={40} />
          </div>
          <div className='text-2xl'>New Customer</div>
          <div>
            <PiListPlus size={40} />
          </div>
        </div>
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
        <div className='grid'>
          <div
            className='py-4 mb-4 text-center cursor-pointer text-whit hover:bg-gray-400 hover:text-black '
            onClick={data => removeItem()}
          >
            Clear Sale
          </div>
        </div>
        <div className='grid grid-cols-2'>
          <div
            className='py-4 text-center bg-gray-400 cursor-pointer hover:bg-blue-300'
            onClick={() => saveCart()}
          >
            Save Bill
          </div>
          <div
            className='py-4 text-center bg-gray-400 cursor-pointer hover:bg-blue-300'
            onClick={() => handlePrint()}
          >
            Print Bill
          </div>
        </div>

        <div className='grid'>
          <div
            className='py-4 my-4 text-center text-white bg-blue-600 cursor-pointer hover:bg-blue-400 hover:text-black '
            onClick={toggleChargePopup}
          >
            Charge Rp. {totalAmount}
          </div>
        </div>

        {showChargePopup && (
          <ChargePopup
            totalAmount={totalAmount}
            onClose={toggleChargePopup}
            onCharge={handleCharge}
          />
        )}
      </div>
    </div>
  )
}

export default Home
