import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Drawer} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/Ionicons';

import AuthContext from '../../components/context';

const DrawerContent = props => {
  const {signOut} = React.useContext(AuthContext);

  const onSignOutPressed = () =>
    Alert.alert('Signing out', 'Are you sure you want to sign out?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Sign out cancelled'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          console.log('Signing out...');
          signOut();
        },
      },
    ]);

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Home"
              onPress={() => props.navigation.navigate('HomeMainScreen')}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="cart-outline" color={color} size={size} />
              )}
              label="Shopping Cart"
              onPress={() => props.navigation.navigate('Shopping Cart')}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="heart-outline" color={color} size={size} />
              )}
              label="Wishlist"
              onPress={() => props.navigation.navigate('Wishlist')}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="person-outline" color={color} size={size} />
              )}
              label="Profile"
              onPress={() => props.navigation.navigate('Profile')}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="settings-outline" color={color} size={size} />
              )}
              label="Settings"
              onPress={() => {
                props.navigation.navigate('Settings');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon
                  name="information-circle-outline"
                  color={color}
                  size={size}
                />
              )}
              label="Support"
              onPress={() => {
                props.navigation.navigate('Support');
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-outline" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={onSignOutPressed}
        />
      </Drawer.Section>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
