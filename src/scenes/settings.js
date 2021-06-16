import React from 'react';
import {SafeAreaView, View, Text, StyleSheet} from 'react-native';

import {useTheme, Switch, TouchableRipple} from 'react-native-paper';
import {Button} from '_atoms';
import * as Colours from '_styles/colours';

import AuthContext from '../components/context';

const SettingsScreen = () => {
  const {signOut, toggleTheme} = React.useContext(AuthContext);
  const paperTheme = useTheme();

  const onSignOut = () => signOut();

  return (
    <SafeAreaView>
      <Text>Settings Screen</Text>
      <TouchableRipple onPress={() => toggleTheme()}>
        <View style={styles.preference}>
          <Text>Dark Theme</Text>
          <View pointerEvents="none">
            <Switch value={paperTheme.dark} />
          </View>
        </View>
      </TouchableRipple>
      <Button
        backgroundColor={Colours.BURNT_SIENNA}
        onButtonPress={onSignOut}
        label="Sign Out"
      />
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});