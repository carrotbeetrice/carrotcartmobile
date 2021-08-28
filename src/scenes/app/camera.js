import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {RNCamera} from 'react-native-camera';
import {BURNT_SIENNA} from '../../styles/colours';

const CameraScreen = ({navigation}) => {
  const [takingPhoto, setTakingPhoto] = React.useState(false);
  const cameraRef = React.useRef();

  const handleViewCameraRoll = () => navigation.navigate('CameraRoll');

  const takePhoto = async () => {
    if (cameraRef && !takingPhoto) {
      let options = {
        quality: 0.85,
        fixOrientation: true,
        forceUpOrientation: true,
      };

      setTakingPhoto(true);

      try {
        const data = await cameraRef.current.takePictureAsync(options);
        Alert.alert('Success', JSON.stringify(data));
      } catch (err) {
        Alert.alert('Error', 'Failed to take photo:' + (err.message || err));
      } finally {
        setTakingPhoto(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        captureAudio={false}
        style={styles.preview}
        type={RNCamera.Constants.Type.front}
        flashMode={RNCamera.Constants.FlashMode.off}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      />
      <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity onPress={takePhoto} style={styles.capture}>
          <Icon name="camera-outline" size={50} color="white" />
        </TouchableOpacity>
        <Button onPress={handleViewCameraRoll}>Load Images</Button>
      </View>
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: BURNT_SIENNA,
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 25,
  },
});
