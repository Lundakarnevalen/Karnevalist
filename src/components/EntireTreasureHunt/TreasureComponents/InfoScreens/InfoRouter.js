import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { Before } from './Before'
import { During } from './During'
import { After } from './After'
import { endDate, startDate } from '../../assets/Constants'

class InfoRouter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      gamePart: 'BEFORE'
    }
    this.calcGamePart = this.calcGamePart.bind(this)
  }

  componentDidMount () {
    this.calcGamePart()
    this.interval = setInterval(() => this.calcGamePart(), 1000)
  }

  componentWillUnmount () {
    clearInterval(this.interval)
  }

  calcGamePart () {
    const today = new Date()
    if (startDate - today > 0) {
      return this.setState({gamePart: 'BEFORE'})
    }

    if (endDate - today > 0) {
      return this.setState({gamePart: 'DURING'})
    }
    return this.setState({gamePart: 'AFTER'})
  }

  render () {
    return (<View>
        {this.state.gamePart === 'BEFORE' && <Before language={this.props.language}/>}
        {this.state.gamePart === 'DURING' &&
        <During language={this.props.language} navigation={this.props.navigation}/>}
        {this.state.gamePart === 'AFTER' && <After language={this.props.language}/>}
      </View>
    )
  }
}

InfoRouter.propTypes = {
  language: PropTypes.string.isRequired
}

const mapStateToProps = ({currentLanguage}) => {
  const {language} = currentLanguage
  return {language}
}

export default connect(mapStateToProps, null)(InfoRouter)