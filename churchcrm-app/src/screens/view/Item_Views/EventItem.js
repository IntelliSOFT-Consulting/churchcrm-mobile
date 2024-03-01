import React from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../../../assets/css/EventsScreen';
import { BASE_URL } from '../../../hooks/HandleApis';

export default function EventItem({ event }) {
    return (
        <View>
            <ScrollView>
                <Image
                    style={styles.image}
                    source={{
                        uri: `${BASE_URL}/EventImages/${event.Img_Path}`,
                    }}
                />
                <Text style={styles.dataDate}>
                    {new Date(event.Event_Date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                    })}
                </Text>
                <View style={styles.dataText}>
                    <Text style={styles.text}>{event.Event_Title.length > 25 ? (
                        event.Event_Title.slice(0, 25) + '...'
                    ) : (
                        event.Event_Title
                    )}</Text>
                </View>
            </ScrollView>
        </View>
    );
}
