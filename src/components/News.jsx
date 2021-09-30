import React, { useState } from 'react'

import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import moment from 'moment'

import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'
import { useGetCryptosQuery } from '../services/cryptoApi'

import Loader from './Loader'

const { Text, Title } = Typography
const { Option } = Select

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')

  const { data } = useGetCryptosQuery(100)

  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: simplified ? 6 : 1000,
  })

  if (!cryptoNews?.value) return <Loader />

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="Cryptocurrency">All Cryptocurrencies</Option>
            {data?.data?.coins.map((coin, i) => (
              <Option key={i} value={coin.name}>
                {coin.name}
              </Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer ">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.name.length > 80 ? `${news.name.substring(0, 80)}...` : news.name}
                </Title>
                <img
                  style={{ maxWidth: '200px', maxHeight: '100px' }}
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                  alt="news"
                />
              </div>

              <p>{news.description.length > 200 ? `${news.description.substring(0, 200)}...` : news.description}</p>

              <div className="provider-container">
                <div>
                  <Avatar
                    style={{ maxWidth: '40px', maxHeight: '40px', minWidth: '30px', minHeight: '30px' }}
                    src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage}
                    alt="avatar"
                  />
                  <Text className="provider-name">{news.provider[0]?.name}</Text>
                </div>
                <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News
