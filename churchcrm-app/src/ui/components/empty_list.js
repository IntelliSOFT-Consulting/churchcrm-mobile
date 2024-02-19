import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Title, Subheading} from 'react-native-paper';
import {moderateScale} from 'react-native-size-matters';
export const EmptyList = props => {
  return (
    <View style={styles.containerView}>
      <Title>Sorry</Title>
      <Subheading style={styles.textCenter}>
        {props.message ? props.message : 'We could not find any data.'}
      </Subheading>
    </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    alignItems: 'center',
    margin: moderateScale(40),
  },
  textCenter: {
    textAlign: 'center',
  },
});
