import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Button, Menu, Typography, Avatar } from 'antd'
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  BlockOutlined,
  MenuOutlined,
} from '@ant-design/icons'

import icon from '../images/cryptocurrency.png'

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true)
  const [screenSize, setScreenSize] = useState(null)

  useEffect(() => {
    const handleRedize = () => {
      setScreenSize(window.innerWidth)
    }
    window.addEventListener('resize', handleRedize)

    handleRedize()

    return () => window.removeEventListener('resize', handleRedize)
  }, [])

  useEffect(() => {
    if (screenSize < 768) {
      setActiveMenu(false)
    } else {
      setActiveMenu(true)
    }
  }, [screenSize])

  const hamburguerMenu = () => {
    if (!activeMenu) {
      setActiveMenu(true)
    } else {
      setActiveMenu(false)
    }
  }

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">Cryptoverse</Link>
        </Typography.Title>
        <Button className="menu-control-container" onClick={hamburguerMenu}>
          <MenuOutlined />
        </Button>
      </div>
      {activeMenu && (
        <Menu theme="dark">
          <Menu.Item icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item icon={<FundOutlined />}>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          </Menu.Item>
          <Menu.Item icon={<MoneyCollectOutlined />}>
            <Link to="/exchanges">Exchanges</Link>
          </Menu.Item>
          <Menu.Item icon={<BulbOutlined />}>
            <Link to="/news">Crypto News</Link>
          </Menu.Item>
          <Menu.Item icon={<BlockOutlined />}>
            <Link to="/blockchain-news">Blockchain News</Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  )
}

export default Navbar
