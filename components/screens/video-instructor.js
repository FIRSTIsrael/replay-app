import React, { useCallback, useEffect, useState, useRef } from 'react'
import { Dimensions, Image, SafeAreaView, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import * as Permissions from 'expo-permissions'
import { Camera } from 'expo-camera'
import { RFValue } from 'react-native-responsive-fontsize'

import config from '../../config'
import Timer from '../ui/timer'
import { processVideo } from '../../lib/video-processing'
import { playSound } from '../../lib/sounds'
import i18n from '../../lib/i18n'
import PermissionRequired from '../ui/permission-required'
import UploadingIllustration from '../../assets/images/uploading-illustration.png'
import FIRST from '../ui/FIRST'
import RotateDevice from '../ui/rotate-device'
import useOrientation from '../../lib/use-orientation'

const VideoInstructorScreen = ({ navigation, route: { params } }) => {
  const isOrientated = useOrientation('LANDSCAPE')
  const [cameraPermission] = Permissions.usePermissions(Permissions.CAMERA, { ask: true })
  const [micPermission] = Permissions.usePermissions(Permissions.AUDIO_RECORDING, { ask: true })
  const cameraRef = useRef()
  const [instructionIndex, setInstructionIndex] = useState(0)
  const [isRecording, setRecording] = useState(false)
  const [isProcessing, setProcessing] = useState(false)
  const instructions = config.INSTRUCTIONS[params.teamAtEvent.team.program]
  const instruction = instructions[instructionIndex]

  useEffect(() => {
    return () => {
      if (isRecording && cameraRef.current) {
        cameraRef.current.stopRecording()
      }
    }
  }, [])

  const handleStart = async () => {
    if (cameraRef.current && !isRecording) {
      setRecording(true)
      const video = await cameraRef.current.recordAsync({
        quality: Camera.Constants.VideoQuality['720p'] || Camera.Constants.VideoQuality['480p']
      })
      await processVideo(video, params.match.id, params.teamAtEvent.id, params.authToken)
      setProcessing(false)
      setRecording(false)
      navigation.navigate('TNK_YOU')
    }
  }

  const handleNext = () => {
    if (instruction.end === 'start') {
      handleStart()
    }
    if (instructionIndex === instructions.length - 1) {
      if (isRecording) {
        setProcessing(true)
        cameraRef.current.stopRecording()
      }
    } else {
      setInstructionIndex(current => current + 1)
    }
  }

  if (!isOrientated) {
    return <RotateDevice />
  } else if (!cameraPermission?.granted) {
    return (
      <PermissionRequired
        androidText="permissions.cam_access_andorid"
        iosText="permissions.cam_access_ios"
      />
    )
  } else if (!micPermission?.granted) {
    return (
      <PermissionRequired
        androidText="permissions.mic_access_andorid"
        iosText="permissions.mic_access_ios"
      />
    )
  }

  return (
    <View style={styles.container}>
      <Camera ref={cameraRef} style={styles.camera} type={Camera.Constants.Type.back} />
      {isProcessing && (
        <View style={styles.processing.container}>
          <Image source={UploadingIllustration} style={styles.processing.illustration} />
          <View style={{ maxWidth: '45%' }}>
            <Text style={styles.processing.title}>{i18n.t('processing.title')}</Text>
            <Text style={styles.processing.text}>
              <FIRST>{i18n.t('processing.text')}</FIRST>
            </Text>
          </View>
        </View>
      )}
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.instructionsContainer}>
          <Text style={styles.instruction}>{instruction.text}</Text>
        </View>
        {(instruction.end === 'start' || instruction.end === 'button') && (
          <Button style={styles.button} mode="contained" onPress={handleNext} color="#fff">
            <Text style={{ fontSize: 24, color: '#000', fontFamily: 'Heebo_700Bold' }}>
              {instruction.buttonText || i18n.t('next')}
            </Text>
          </Button>
        )}
        {instruction.end === 'timer' && (
          <Timer
            duration={instruction.time}
            everySecond={time => {
              if (instruction.sounds && instruction.sounds[`${time}secs`]) {
                playSound(instruction.sounds[`${time}secs`])
              }
            }}
            onFinished={() => {
              if (instruction.sounds && instruction.sounds.end) {
                playSound(instruction.sounds.end)
              }
              const nextInstruction = instructions[instructionIndex + 1]
              if (nextInstruction && nextInstruction.sounds && nextInstruction.sounds.start) {
                playSound(nextInstruction.sounds.start)
              }
              handleNext()
            }}
          />
        )}
      </SafeAreaView>
    </View>
  )
}

const styles = {
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    display: 'flex',
    direction: 'rtl'
  },
  processing: {
    container: {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 10,
      height: '100%',
      width: '100%',
      backgroundColor: 'whitesmoke',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    illustration: {
      width: 200,
      resizeMode: 'contain',
      marginHorizontal: RFValue(42)
    },
    title: {
      fontFamily: 'Heebo_700Bold',
      fontWeight: '700',
      fontSize: RFValue(32)
    },
    text: {
      fontWeight: 'bold',
      fontSize: RFValue(18),
      marginTop: 16,
      color: '#666',
      width: '100%'
    }
  },
  camera: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%'
  },
  instructionsContainer: {
    top: '4%',
    paddingHorizontal: RFValue(20),
    alignItems: 'center'
  },
  instruction: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: RFValue(10),
    overflow: 'hidden',
    paddingHorizontal: RFValue(16),
    paddingVertical: RFValue(8),
    fontWeight: 'bold',
    fontSize: RFValue(20),
    textAlign: 'center',
    fontFamily: 'Heebo_500Medium'
  },
  button: {
    position: 'absolute',
    right: '6%',
    bottom: '6%',
    borderRadius: RFValue(6),
    paddingHorizontal: RFValue(4)
  }
}

export default VideoInstructorScreen
