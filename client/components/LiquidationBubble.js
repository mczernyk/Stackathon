import React from 'react'
import PropTypes from 'prop-types'
// import Box from 'components/Box'
// import SyntaxHighlighter from 'components/SyntaxHighlighter'
import {Chart} from 'react-charts'

export const LiquidationBubble = props => {
  const {liquidations, askOrders, bidOrders} = props
  // const data = React.useMemo( () => liquidations.map(liquidation => (
  //   {
  //     label: 'Series 1',
  //     data: [[+liquidation.time, liquidation.price, (liquidation.quantity / 100)]]
  //   }
  // )), [])

  const testSellArray = [
    {time: '2020-03-13 11:19:27', price: 4500, quantity: 30000},
    {time: '2020-03-13 10:19:27', price: 4501.5, quantity: 5000},
    {time: '2020-03-13 09:19:27', price: 4505, quantity: 3000},
    {time: '2020-03-13 08:19:27', price: 4498.5, quantity: 50000},
    {time: '2020-03-13 07:19:27', price: 4496, quantity: 40000}
  ]

  const testLiqArray = [
    {time: '2020-03-13 09:19:27', price: 4501.5, quantity: 20000, side: 'Sell'},
    {time: '2020-03-13 07:19:27', price: 4500.5, quantity: 10000, side: 'Buy'}
  ]

  const testBuyArray = [
    {time: '2020-03-13 11:19:27', price: 4500, quantity: 10000},
    {time: '2020-03-13 10:19:27', price: 4501.5, quantity: 35000},
    {time: '2020-03-13 09:19:27', price: 4500, quantity: 32000},
    {time: '2020-03-13 08:19:27', price: 4498.5, quantity: 9000},
    {time: '2020-03-13 07:19:27', price: 4496, quantity: 5000}
  ]

  var replaced = {'-': '', ' ': '', ':': ''}

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
        label: 'Big Sell',
        data: testSellArray
          .filter(order => order.quantity > 30000)
          .map(order => [
            +order.time.replace(/[- :]/g, m => replaced[m]),
            order.price,
            order.quantity / 1000
          ])
      },
      {
        label: `Liquidation`,
        data: testLiqArray.map(liquidation => [
          +liquidation.time.replace(/[- :]/g, m => replaced[m]),
          liquidation.price,
          liquidation.quantity / 1000
        ])
      },
      {
        label: 'Big Buy',
        data: testBuyArray
          .filter(order => order.quantity > 30000)
          .map(order => [
            +order.time.replace(/[- :]/g, m => replaced[m]),
            order.price,
            order.quantity / 1000
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

LiquidationBubble.propTypes = {
  time: PropTypes.string,
  side: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number
}

export default LiquidationBubble
