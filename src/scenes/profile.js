import React from 'react';
import * as Colours from '../styles/colours';
import {
  View,
  Text,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
  ActivityIndicator,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {Avatar, Caption, Card, Title} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileScreen = () => (
  <View style={styles.container}>
    <ScrollView>
      <SafeAreaView>
        <View style={styles.header}>
          <Avatar.Icon
            icon="account"
            size={50}
            color={Colours.WHITE}
            style={styles.avatar}
          />
          <View style={styles.username}>
            <Title style={styles.title}>John Doe</Title>
            <Caption style={styles.caption}>@johndoe</Caption>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  </View>
);

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  avatar: {
    backgroundColor: Colours.BURNT_SIENNA,
  },
  username: {
    marginLeft: 15,
    flexDirection: 'column',
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
  header: {
    flexDirection: 'row',
    marginTop: 15,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  actions: {},
});
