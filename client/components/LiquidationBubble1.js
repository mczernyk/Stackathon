import React from 'react'
import PropTypes from 'prop-types'
// import Box from 'components/Box'
// import SyntaxHighlighter from 'components/SyntaxHighlighter'
import {Chart} from 'react-charts'

export const LiquidationBubble1 = props => {
  const {liquidations, whaleOrders} = props

  const whaleOrdersTest = [
    {
      type: 'whale',
      time: '2020-03-13 11:19:27',
      price: 4500,
      quantity: 510000,
      side: 'Sell'
    },
    {
      type: 'whale',
      time: '2020-03-13 10:19:27',
      price: 4523.5,
      quantity: 530000,
      side: 'Sell'
    },
    {
      type: 'whale',
      time: '2020-03-13 09:19:27',
      price: 4425,
      quantity: 600000,
      side: 'Sell'
    },
    {
      type: 'whale',
      time: '2020-03-13 08:19:27',
      price: 4480,
      quantity: 500001,
      side: 'Sell'
    },
    {
      type: 'whale',
      time: '2020-03-13 07:19:27',
      price: 4396,
      quantity: 1000000,
      side: 'Sell'
    },
    {
      type: 'whale',
      time: '2020-03-13 11:19:27',
      price: 4550,
      quantity: 700000,
      side: 'Buy'
    },
    {
      type: 'whale',
      time: '2020-03-13 10:19:27',
      price: 4511.5,
      quantity: 530000,
      side: 'Buy'
    },
    {
      type: 'whale',
      time: '2020-03-13 09:19:27',
      price: 4427,
      quantity: 1100000,
      side: 'Buy'
    },
    {
      type: 'whale',
      time: '2020-03-13 08:19:27',
      price: 4458.5,
      quantity: 900000,
      side: 'Buy'
    },
    {
      type: 'whale',
      time: '2020-03-13 07:19:27',
      price: 4400,
      quantity: 500100,
      side: 'Buy'
    }
  ]

  const liquidationsTest = [
    {
      type: 'liquidation',
      time: '2020-03-13 09:19:27',
      price: 4421.5,
      quantity: 20000,
      side: 'Sell'
    },
    {
      type: 'liquidation',
      time: '2020-03-13 07:19:27',
      price: 4510.5,
      quantity: 10000,
      side: 'Buy'
    }
  ]

  const orderData = [...whaleOrdersTest, ...liquidationsTest]
  var replaced = {'-': '', ' ': '', ':': ''}
  // const [ourData, setData] = useState([])

  // useEffect(() => {
  //   orderData.map(each => {
  //     setData(currentData => [...currentData, each])
  //   })

  // }, [])

  const series = React.useMemo(
    () => ({
      type: 'bubble',
      showPoints: false
    }),
    []
  )
  const axes = React.useMemo(
    () => [
      {primary: true, type: 'linear', position: 'bottom'},
      {type: 'linear', position: 'left'}
    ],
    []
  )
  const data = React.useMemo(
    () => [
      {
        label: `Whale Sell`,
        data: orderData
          .filter(order => order.type === 'whale' && order.side === 'Sell')
          .map(order => [
            +order.time.replace(/[- :]/g, m => replaced[m]),
            order.price,
            order.quantity / 50000
          ])
      },
      {
        label: `Liquidation`,
        data: orderData
          .filter(order => order.type === 'liquidation')
          .map(order => [
            +order.time.replace(/[- :]/g, m => replaced[m]),
            order.price,
            order.quantity / 1000
          ])
      },
      {
        label: `Whale Buy`,
        data: orderData
          .filter(order => order.type === 'whale' && order.side === 'Buy')
          .map(order => [
            +order.time.replace(/[- :]/g, m => replaced[m]),
            order.price,
            order.quantity / 50000
          ])
      }
    ],
    []
  )

  return (
    <div className="lbChart">
      <Chart
        data={data}
        series={series}
        axes={axes}
        grouping="single"
        tooltip
        dark
      />
    </div>
  )
}

LiquidationBubble1.propTypes = {
  time: PropTypes.string,
  side: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number
}

export default LiquidationBubble1
