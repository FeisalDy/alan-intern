'use client'
import React from 'react'
import { Table, Row, Col, Tooltip, User, Text } from '@nextui-org/react'
import { IconButton } from '@/components/IconButton'
import { EyeIcon } from '@/components/EyeIcon'
import { EditIcon } from '@/components/EditIcon'
import { DeleteIcon } from '@/components/DeleteIcon'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Page = () => {
  const [menu, setMenu] = useState([])
  const [jenisMenu, setJenisMenu] = useState([])
  const router = useRouter()

  const handleViewMenu = id => {
    router.push(`/admin/show//${id}`)
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
    console.log(menu)
    getMenuData()
  }, [])

  const columns = [
    { name: 'Nama', uid: 'nama' },
    { name: 'Harga', uid: 'harga' },
    { name: 'Diskon', uid: 'diskon' },
    { name: 'ACTIONS', uid: 'actions' }
  ]

  const handleDeleteMenu = async id => {
    try {
      const response = await fetch('http://localhost:8000/api/menu/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      })

      if (response.ok) {
        setMenu(prevMenu => prevMenu.filter(item => item.id !== id))
        console.log('Menu deleted successfully')
      } else {
        const errorData = await response.json()
        console.error('Error deleting menu:', errorData)
      }
    } catch (error) {
      console.error('Error deleting menu:', error)
    }
  }

  const renderCell = (menu, columnKey) => {
    const cellValue = menu[columnKey]
    switch (columnKey) {
      case 'nama':
        return (
          <User
            squared
            src='https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
            name={cellValue}
            css={{ p: 0 }}
          >
            {menu.jenis_menu.nama}
          </User>
        )
      case 'harga':
        return <Text type={menu.harga}>Rp. {cellValue}</Text>
      case 'diskon':
        return <Text type={menu.diskon}>{cellValue}%</Text>

      case 'actions':
        return (
          <Row justify='center' align='center'>
            <Col css={{ d: 'flex' }}>
              <Tooltip content='Details'>
                <IconButton onClick={() => handleViewMenu(menu.id)}>
                  <EyeIcon size={20} fill='#979797' />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: 'flex' }}>
              <Tooltip content='Edit user'>
                <IconButton onClick={() => console.log('Edit user', menu.id)}>
                  <EditIcon size={20} fill='#979797' />
                </IconButton>
              </Tooltip>
            </Col>
            <Col css={{ d: 'flex' }}>
              <Tooltip
                content='Delete menu'
                color='error'
                onClick={() => handleDeleteMenu(menu.id)}
              >
                <IconButton>
                  <DeleteIcon size={20} fill='#FF0080' />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        )
      default:
        return cellValue
    }
  }
  return (
    <Table
      aria-label='Example table with custom cells'
      css={{
        height: 'auto',
        minWidth: '100%'
      }}
      selectionMode='none'
    >
      <Table.Header columns={columns}>
        {column => (
          <Table.Column
            key={column.uid}
            hideHeader={column.uid === 'actions'}
            align={column.uid === 'actions' ? 'center' : 'start'}
          >
            {column.name}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={menu}>
        {item => (
          <Table.Row>
            {columnKey => (
              <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
            )}
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  )
}

export default Page
