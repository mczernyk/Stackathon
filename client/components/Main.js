import React from 'react'
import Websocket from 'react-websocket'
import {Orderbook} from '.'
import dateFormat from 'dateformat'

class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      instrument: 'XBTUSD',
      askOrders: [],
      bidOrders: [],
      liquidations: []
    }
  }

  handleData(apiData) {
    let data = JSON.parse(apiData)
    // console.log('rawdata' data)

    if (data.table === 'liquidation' && data.action === 'insert') {
      let liqData = data.data[0]
      let liqTime = liqData.timestamp
      // side = "Sell" = liq long /"Buy"= liq short
      let liqSide = liqData.side
      let liqPrice = liqData.price
      let liqQty = liqData.leavesQty
      const day = dateFormat(new Date(), 'yyyy-mm-dd h:MM:ss')

      let liquidations = {
        time: day,
        side: liqSide,
        price: liqPrice,
        quantity: liqQty
      }

      this.setState({
        liquidations: liquidations
      })

      console.log('liqobj', liqData)
      console.log('liq', liquidations)
    }

    if (data.table === 'orderBook10') {
      if (!data.data) {
        console.log('no data')
        return
      }
      let orderData = data.data[0]
      // console.log('orderData', orderData)

      // get each ask price/amount from array; convert to obj for askOrders array
      let askOrders = orderData.asks.map(ask => {
        return {
          price: ask[0],
          quantity: ask[1]
        }
      })

      // get each bid price/amount from array; convert to obj for bidOrders array
      let bidOrders = orderData.bids.map(bid => {
        return {
          price: bid[0],
          quantity: bid[1]
        }
      })

      // set state with askOrders/bidOrders arrays of ask/bid objects

      this.setState({
        askOrders: askOrders,
        bidOrders: bidOrders
      })
    }
  }

  render() {
    return (
      <div>
        <h1>{this.state.instrument} Order Book</h1>
        <Websocket
          url="wss://www.bitmex.com/realtime?subscribe=liquidation:XBTUSD,orderBook10:XBTUSD"
          onMessage={this.handleData.bind(this)}
        />
        <Orderbook
          askOrders={this.state.askOrders}
          bidOrders={this.state.bidOrders}
        />
      </div>
    )
  }
}

export default Main
