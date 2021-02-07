import * as React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Button } from 'react-native'
import * as Permissions from 'expo-permissions'
import { Camera } from 'expo-camera'
import * as ScreenOrientation from 'expo-screen-orientation'
import { RFValue } from 'react-native-responsive-fontsize'

import Timer from './timer'

import config from '../config'
import { processVideo } from '../logic/video_processing'
import { playSound } from '../logic/sounds'
import i18n from '../logic/i18n'

export default class VideoInstructor extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    isRecording: false,
    instructionIndex: 0,
    instructions: []
  }

  async componentDidMount() {
    const cameraPermissionStatus = (await Permissions.askAsync(Permissions.CAMERA)).status
    const audioPermissionStatus = (await Permissions.askAsync(Permissions.AUDIO_RECORDING)).status
    this.setState({
      hasCameraPermission:
        cameraPermissionStatus === 'granted' && audioPermissionStatus === 'granted',
      instructions: config.INSTRUCTIONS[this.props.route.params.team.program]
    })
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
  }

  start = async () => {
    if (this.camera) {
      if (!this.state.isRecording) {
        this.setState({ isRecording: true })
        let video = await this.camera.recordAsync()
        await processVideo(video)
        this.setState({ isRecording: false })
        this.props.navigation.navigate('TNK_YOU')
      }
    }
  }

  next() {
    if (this.state.instructionIndex === this.state.instructions.length - 1) {
      if (this.state.isRecording) {
        this.camera.stopRecording()
      }
    } else {
      this.setState({ instructionIndex: this.state.instructionIndex + 1 })
    }
  }

  render() {
    const { hasCameraPermission } = this.state
    if (hasCameraPermission === null) {
      return <View />
    } else if (hasCameraPermission === false) {
      return (
        <View style={styles.error.container}>
          <Text style={styles.error.text}>{i18n.t('needs_camera_permissions')}</Text>
        </View>
      )
    } else {
      const instruction = this.state.instructions[this.state.instructionIndex]

      const overlayComponent = (() => {
        if (!this.state.isRecording) {
          return (
            <View style={styles.startButton}>
              <Button title={i18n.t('start')} onPress={() => this.start()} color="#0b487c"></Button>
            </View>
          )
        }
        if (instruction.end === 'timer') {
          return (
            <Timer
              duration={instruction.time}
              everySecond={async time => {
                if (instruction.sounds && instruction.sounds[`${time}secs`]) {
                  playSound(instruction.sounds[`${time}secs`])
                }
              }}
              onFinished={async () => {
                if (instruction.sounds && instruction.sounds.end) {
                  playSound(instruction.sounds.end)
                }
                const nextInstruction = this.state.instructions[this.state.instructionIndex + 1]
                if (nextInstruction && nextInstruction.sounds && nextInstruction.sounds.start) {
                  playSound(nextInstruction.sounds.start)
                }
                this.next()
              }}
            />
          )
        }
        if (instruction.end === 'button') {
          return (
            <View style={styles.button}>
              <Button
                title={instruction.buttonText || i18n.t('next')}
                onPress={() => this.next()}
                color="#0b487c"
              ></Button>
            </View>
          )
        }
        return <View />
      })()

      return (
        <View style={styles.container}>
          {this.state.isRecording ? (
            <View style={styles.instructionsContainer}>
              <Text style={styles.instruction}>{instruction.text}</Text>
            </View>
          ) : (
            <View />
          )}
          <Camera
            style={styles.camera}
            type={this.state.type}
            ref={ref => {
              this.camera = ref
            }}
          ></Camera>
          {overlayComponent}
        </View>
      )
    }
  }
}

const styles = {
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    display: 'flex'
  },
  error: {
    container: {
      height: '100%',
      width: '100%',
      backgroundColor: 'whitesmoke',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      fontWeight: 'bold',
      fontSize: RFValue(20),
      textAlign: 'center',
      marginTop: 24,
      color: '#881111'
    }
  },
  camera: {
    height: '100%',
    width: '100%'
  },
  instructionsContainer: {
    width: '100%',
    height: RFValue(60),
    backgroundColor: 'whitesmoke'
  },
  instruction: {
    fontWeight: 'bold',
    fontSize: RFValue(24),
    textAlign: 'center',
    marginTop: 24
  },
  button: {
    width: '25%',
    height: RFValue(60),
    position: 'absolute',
    bottom: RFValue(5),
    left: RFValue(10)
  },
  startButton: {
    width: '80%',
    height: RFValue(60),
    position: 'absolute',
    bottom: RFValue(5),
    left: '10%'
  }
}
