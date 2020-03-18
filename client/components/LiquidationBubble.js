import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'

// import Box from 'components/Box'
// import SyntaxHighlighter from 'components/SyntaxHighlighter'
import {Chart} from 'react-charts'

export const LiquidationBubble = props => {
  const {whaleAndLiq} = props

  var replaced = {'-': '', ' ': '', ':': ''}

  // const [ourData, setData] = useState(orderData)

  // // useEffect(() => {
  // //   if (orderData.length) {
  // //     orderData.map(each => {
  // //       setData(currentData => [...currentData, each])
  // //     })
  // //   }
  // // }, [])

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
        data: whaleAndLiq
          .filter(order => order.type === 'whale' && order.side === 'Sell')
          .map(order => [
            +order.time.replace(/[- :]/g, m => replaced[m]),
            order.price,
            order.quantity / 50000
          ])
      },
      {
        label: `Liquidation`,
        data: whaleAndLiq
          .filter(order => order.type === 'liquidation')
          .map(order => [
            +order.time.replace(/[- :]/g, m => replaced[m]),
            order.price,
            order.quantity / 1000
          ])
      },
      {
        label: `Whale Buy`,
        data: whaleAndLiq
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

LiquidationBubble.propTypes = {
  time: PropTypes.string,
  side: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number
}

export default LiquidationBubble
