import React, { Component } from 'react'
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
    // only rerenders on state change
    if (today < startDate) {
      this.setState({gamePart: 'BEFORE'})
    }
    if (today < endDate) {
      this.setState({gamePart: 'DURING'})
    }
    this.setState({gamePart: 'AFTER'})
  }

  render () {
    return (<View>
        {this.state.gamePart === 'BEFORE' && <Before onDone={this.calcGamePart}/>}
        {this.state.gamePart === 'DURING' && <During onDone={this.calcGamePart}/>}
        {this.state.gamePart === 'AFTER' && <After onDone={this.calcGamePart}/>}
      </View>
    )
  }
}

const mapStateToProps = ({currentLanguage}) => {
  const {language} = currentLanguage
  return {language}
}

export default connect(mapStateToProps, null)(InfoRouter)