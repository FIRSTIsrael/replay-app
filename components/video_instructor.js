import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { RFValue } from 'react-native-responsive-fontsize'
import { INSTRUCTIONS, HEB } from '../config'
import { processVideo } from '../logic/video_processing'

export default class App extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    isRecording: false,
    index: 0
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    const { audio_status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  start = async () => {
    if (this.camera) {
      if (!this.state.isRecording) {
        this.setState({isRecording: true});
        let video = await this.camera.recordAsync();
        await processVideo(video)
        this.props.navigation.navigate('TNK_YOU')
      }
    }
  }

  next() {
    if (this.state.index === INSTRUCTIONS.length - 1) {
        if (this.state.isRecording) {
          this.camera.stopRecording();
          this.setState({isRecording: false})
        }
    } else {
      this.setState({ index: this.state.index + 1 })
    }
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      const instruction = INSTRUCTIONS[this.state.index]
      return (
        <View style={styles.container}>
          {this.state.isRecording ? <View style={styles.instructionsContainer}>
            <Text style={styles.instruction}>{instruction.text}</Text>
          </View> : <View />}
          <Camera style={styles.container} type={this.state.type} ref={ref => { this.camera = ref; }}>
          </Camera>
          {this.state.isRecording ? <View style={styles.button}>
            <Button title={HEB.NEXT} onPress={() => this.next()}></Button>
          </View> : 
          <View style={styles.startButton}>
            <Button title={HEB.START} onPress={() => this.start()}></Button>
          </View>}
        </View>
      );
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