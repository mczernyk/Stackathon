import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

import {withStyles} from '@material-ui/core/styles'
import {Button} from '@material-ui/core'

const styles = {}

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className="topContainer">
    <div>
      <Link to="/main">
        <Button style={{textDecoration: 'none', color: 'white'}} size="large">
          <h1>
            <i>MEX</i>Trix
          </h1>
        </Button>
      </Link>
    </div>
    <div>
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Button
              variant="outlined"
              style={{textDecoration: 'none', color: 'white'}}
              size="large"
            >
              <a href="#" onClick={handleClick}>
                Logout
              </a>
            </Button>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">
              <Button
                variant="outlined"
                style={{textDecoration: 'none', color: 'white'}}
                size="large"
              >
                {' '}
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button
                variant="outlined"
                style={{textDecoration: 'none', color: 'white'}}
                size="large"
              >
                {' '}
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </nav>
    </div>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
