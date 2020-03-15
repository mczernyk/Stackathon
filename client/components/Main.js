import React from 'react'
import Websocket from 'react-websocket'
import {Orderbook, LiquidationList, LiquidationBubble} from '.'
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
    // this.handleData = this.handleData.bind(this)
  }
  // handleData() {
  handleData(apiData) {
    let data = JSON.parse(apiData)
    // console.log('rawdata', data)

    // let data =
    //   {
    //   table: 'orderBook10',
    //   data:
    //     [{
    //       symbol: "XBTUSD",
    //       timestamp: "2020-03-12T05:16:54.535Z",
    //       asks: [[4500, 3000], [4510, 20000], [4520, 4000], [4530, 50000], [4540, 3000], [4550, 20000], [4560, 4000], [4570, 50000], [4580, 3000], [4590, 20000]],
    //       bids: [[4500, 3000], [4510, 20000], [4520, 4000], [4530, 50000], [4540, 3000], [4550, 20000], [4560, 4000], [4570, 50000], [4580, 3000], [4590, 20000]]
    //     }]
    //   }
    // let data = {
    //   table: 'liquidation',
    //   action: 'insert',
    //   data:
    //     {time: "2020-03-14 6:51:44", side: "Buy",
    //     price: 5277.5,
    //     quantity: 5301}
    //   },
    //   {
    //   table: 'orderBook10',
    //   data:
    //     {
    //       symbol: "XBTUSD",
    //       timestamp: "2020-03-12T05:16:54.535Z",
    //       asks: [[4500, 3000], [4510, 20000], [4520, 4000], [4530, 50000], [4540, 3000], [4550, 20000], [4560, 4000], [4570, 50000], [4580, 3000], [4590, 20000]],
    //       bids: [[4500, 3000], [4510, 20000], [4520, 4000], [4530, 50000], [4540, 3000], [4550, 20000], [4560, 4000], [4570, 50000], [4580, 3000], [4590, 20000]]
    //     }
    //   }

    // console.log('data', data)
    // console.log('table', data.table)
    if (data.table === 'liquidation' && data.action === 'insert') {
      let liqData = data.data[0]
      // side = "Sell" = liq long /"Buy"= liq short
      let liqSide = liqData.side
      let liqPrice = liqData.price
      let liqQty = liqData.leavesQty
      const day = dateFormat(new Date(), 'yyyy-mm-dd h:MM:ss')

      let liquidationObj = {
        time: day,
        side: liqSide,
        price: liqPrice,
        quantity: liqQty
      }

      if (this.state.liquidations.length < 13) {
        this.setState(prevState => ({
          liquidations: [liquidationObj, ...prevState.liquidations]
        }))
      } else {
        let newState = this.state.liquidations.slice(0, -1)
        this.setState({
          liquidations: [liquidationObj, ...newState]
        })
      }

      console.log('liqobj', liquidationObj)
      console.log('liq', this.state.liquidations)
    }

    if (data.table === 'orderBook10') {
      if (!data.data) {
        console.log('no data')
        return
      }
      let orderData = data.data[0]
      // console.log('order', orderData)

      // get each ask price/amount from array; convert to obj for askOrders array
      let time = dateFormat(orderData.timestamp, 'yyyy-mm-dd h:MM:ss')
      let askOrders = orderData.asks.map(ask => {
        return {
          time: time,
          price: ask[0],
          quantity: ask[1]
        }
      })
      // get each bid price/amount from array; convert to obj for bidOrders array
      let bidOrders = orderData.bids.map(bid => {
        return {
          time: time,
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
      <div className="mainContainer">
        <Websocket
          url="wss://www.bitmex.com/realtime?subscribe=liquidation:XBTUSD,orderBook10:XBTUSD"
          onMessage={this.handleData.bind(this)}
        />

        <div className="topContainer">
          <div className="section">
            <h2>{this.state.instrument} Liquidations</h2>
            <div className="llContainer">
              <LiquidationList liquidations={this.state.liquidations} />
              <br />
            </div>
          </div>
          <div className="section">
            <h2>{this.state.instrument} Orderbook</h2>
            <div className="obContainer">
              <Orderbook
                askOrders={this.state.askOrders}
                bidOrders={this.state.bidOrders}
              />
            </div>
          </div>
        </div>
        <div className="bottomContainer">
          <h2>{this.state.instrument} Liquidation & Whale Tracker</h2>

          <div className="lbContainer">
            <LiquidationBubble
              liquidations={this.state.liquidations}
              askOrders={this.state.askOrders}
              bidOrders={this.state.bidOrders}
            />
            <br />
            <br />
          </div>
        </div>
      </div>
    )
  }
}

export default Main
