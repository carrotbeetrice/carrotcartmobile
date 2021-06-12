import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {Button} from '_atoms';
import * as Colours from '_styles/colours';
import * as EncryptedStorage from '_utils/encrypted-storage';
import AuthContext from '../components/context';

const HomeScreen = ({navigation}) => {
  const {signOut} = React.useContext(AuthContext);

  const onSignOut = () => {
    signOut();
    // navigation.navigate("Auth");
  };

  return (
    <SafeAreaView>
      <Text>Home Screen</Text>
      <Button
        backgroundColor={Colours.BURNT_SIENNA}
        onButtonPress={onSignOut}
        label="Sign Out"
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
