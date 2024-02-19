import React, {useMemo, useState} from 'react';
import {View, ScrollView, Text, Switch} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import RadioGroup from 'react-native-radio-buttons-group';

import {styles} from '../../assets/css/SettingScreen';

export default function SettingScreen({navigation}) {
  const radioButtons = useMemo(
    () => [
      {
        id: '1',
        label: 'Dark',
        value: 'option1',
      },
      {
        id: '2',
        label: 'Light',
        value: 'option2',
      },
      {
        id: '3',
        label: 'System',
        value: 'option3',
      },
    ],
    [],
  );

  const [selectedId, setSelectedId] = useState();
  const [switchValue1, setSwitchValue1] = useState(false);
  const [switchValue2, setSwitchValue2] = useState(false);

  return (
    <ScrollView style={styles.ScrollView}>
      <View style={styles.viewContainer}>
        <View style={styles.header}>
          <Icon size={24} color="blue" name="brightness-6" />
          <Text style={styles.headerText}>App Theme</Text>
        </View>
        <View style={styles.themeOptions}>
          <RadioGroup
            style={styles.radio}
            radioButtons={radioButtons}
            onPress={setSelectedId}
            selectedId={selectedId}
          />
        </View>
      </View>

      <View style={styles.viewContainer}>
        <View style={styles.header}>
          <Icon size={24} color="blue" name="notifications" />
          <Text style={styles.headerText}>Notifications</Text>
        </View>
        <View style={styles.themeOptions}>
          <View style={styles.option}>
            <Switch
              value={switchValue1}
              onValueChange={value => setSwitchValue1(value)}
            />
            <Text style={styles.optionText}>Push Notification</Text>
          </View>
          <View style={styles.option}>
            <Switch
              value={switchValue2}
              onValueChange={value => setSwitchValue2(value)}
            />
            <Text style={styles.optionText}>Verse of the day text</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
