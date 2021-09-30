// React Components
import React from 'react'
import { Link } from 'react-router-dom'
import millify from 'millify'

import { Cryptocurrencies, News } from '../components'

import Loader from './Loader'

// Api calls with Redux
import { useGetCryptosQuery } from '../services/cryptoApi'

// Ant Design
import { Typography, Row, Col, Statistic } from 'antd'
import BlockchainNews from './BloclchainNews'

const { Title } = Typography // For don't type Typography.Title all the time

// Redux at 37min
const HomePage = () => {
  const { data, isFetching } = useGetCryptosQuery(10)

  const globalStats = data?.data?.stats

  if (isFetching) return <Loader />

  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total Crytocurrencies" value={globalStats.total} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Markets" value={millify(globalStats.totalMarkets)} />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latests Cryptocurrencies News
        </Title>
        <Title level={3} className="show-more">
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified />
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latests Blockchain News
        </Title>
        <Title level={3} className="show-more">
          <Link to="/blockchain-news">Show More</Link>
        </Title>
      </div>
      <BlockchainNews simplified />
    </>
  )
}

export default HomePage
