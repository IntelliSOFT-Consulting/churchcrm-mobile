import React, {useState} from 'react';
import {ScrollView, View, RefreshControl} from 'react-native';

import Events from './ListView/Events';

export default function EventsScreen() {

  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState({
    Events: [],
  });

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setData({
        Events: [],
      });

      setRefreshing(false);
    }, 2000);
  };

  return (
    <ScrollView horizontal={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View>
        <View>
          <Events data={data.Events} />
        </View>
      </View>
    </ScrollView>
  );
}
