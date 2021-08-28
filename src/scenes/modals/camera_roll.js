import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  View,
  useWindowDimensions,
} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';

const CameraRollScreen = () => {
  const [photos, setPhotos] = React.useState([]);
  const {width} = useWindowDimensions();
  const columns = 4;

  const calculateThumbnailSide = () => (width - 20) / columns;

  const handleSelectPhoto = photo => console.log('Selected photo:', photo);

  React.useEffect(() => {
    let isMounted = true;
    CameraRoll.getPhotos({
      assetType: 'Photos',
      first: 100,
    })
      .then(result => {
        if (isMounted) setPhotos(result.edges);
      })
      .catch(err => {
        if (isMounted) alert(err);
      });
    return () => {
      isMounted = false;
    };
  }, [photos]);

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.cameraRoll}
        data={photos}
        numColumns={columns}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleSelectPhoto(item.node.image)}>
            <Image
              style={{
                width: calculateThumbnailSide(),
                height: calculateThumbnailSide(),
              }}
              source={{uri: item.node.image.uri}}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CameraRollScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  cameraRoll: {
    margin: 10,
  },
});
