import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize'

export default class Timer extends Component {

  state = {  }

  componentDidMount() {
    this.start()
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  static getDerivedStateFromProps(props, state) {
    if (typeof state.time === 'undefined' || state.time <= 0 || props.duration !== state.duration) {
      return { startTime: Date.now(), time: props.duration, duration: props.duration }
    }
    return null
  }

  start () {
    this.timer = setInterval(() => this.tick(), 1000)
    if (this.props.onStart) {
      this.props.onStart()
    }
  }

  tick () {
    if (this.props.duration <= ((Date.now() - this.state.startTime) / 1000)) {
      if (this.props.onFinished) {
        this.props.onFinished()
      }
    } else {
      this.setState({ time: Math.ceil(this.props.duration - ((Date.now() - this.state.startTime) / 1000)) }, () => {
        if(this.props.everySecond) {
          this.props.everySecond(this.state.time)
        }
      })
    }
  }

  formatTime (time) {
  	const twoDigits = num => (num <= 9 ? `0${num}` : num)
  	const minutes = twoDigits(Math.floor(time / 60))
  	const seconds = twoDigits(time % 60)
  	return `${minutes}:${seconds}`
  }

  render () {
    return <View style={styles.container}>
      <Text style={styles.text}>{this.formatTime(this.state.time)}</Text>
    </View>
  }
}

const styles = {
  container: {
    width: '50%',
    height: RFValue(40),
    position: 'absolute',
    bottom: RFValue(10),
    left: '25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: RFValue(10)
  },
  text: {
    fontWeight: 'bold',
    lineHeight: RFValue(24),
    fontSize: RFValue(24),
    textAlign: 'center',
    marginTop: RFValue(12),
    color: 'white'
  }
}
