import React from 'react'
import PropTypes from 'prop-types'

class Bids extends React.Component {
  fillPercent() {
    const {max, total} = this.props

    return (max ? total / max : 0) * 100
  }

  render() {
    const {price, quantity, total} = this.props

    return (
      <tr className="bid">
        <td className="column">{total}</td>
        <td className="column">{quantity}</td>
        <td
          className="bids"
          style={{backgroundSize: this.fillPercent() + '% 100%'}}
        >
          ${price}
        </td>
      </tr>
    )
  }
}

Bids.propTypes = {
  quantity: PropTypes.number,
  price: PropTypes.number,
  max: PropTypes.number,
  total: PropTypes.number
}

export default Bids
