import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'
import { Camera } from 'expo-camera'

import { INSTRUCTIONS } from '../config'

export default class VideoInstructor extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      hasPermission: null,
      type: Camera.Constants.Type.back,
      index: 0
    }
  }

  componentDidMount() {
    (async () => {
        const { status } = await Camera.requestPermissionsAsync()
        this.setState({ hasPermission: status === 'granted' })
      })()

    this.startRecording()
  }

  async startRecording() {
    if (this.camera && !this.camera.isRecording()) {
      const { uri } = await this.camera.recordAsync()
      this.videoFile = uri
    }
  }

  next() {
    if (this.state.index === INSTRUCTIONS.length - 1) {
      this.camera.stopRecording()
      console.log(videoFile)
    } else {
      this.setState({ index: this.state.index + 1 })
    }
  }
  
  render() {
    if (this.state.hasPermission === null) {
      return <View />
    }
    if (this.state.hasPermission === false) {
      return <Text>No access to camera</Text>
    }

    return (
      <View style={styles.container}>
        <Camera style={styles.camera} type={this.state.type} ref={ref => { this.camera = ref }}>
        </Camera>
        <Button title='next' style={styles.button}></Button>
      </View>
    )
  }
}

const styles = {
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    display: 'flex'
  },
  camera: {
    height: '100%'
  },
  button: {

  },
  instruction: {

  }
}
