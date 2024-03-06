import React from 'react';
import { Text, Image, View } from 'react-native';
import { styles } from '../../assets/css/HomeScreen';
import { BASE_URL } from '../../hooks/HandleApis';

const AnnouncementItem = ({ announcement }) => {
    return (
        <View>
            <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                <View style={{ marginRight: 10 }}>
                    <Image
                        style={styles.image}
                        source={{
                            uri: `${BASE_URL}/Announcements/${announcement.poster}`,
                        }}
                    />
                    <Text style={styles.dataDate}>
                        {new Date(announcement.created_at).toLocaleDateString(
                            undefined,
                            {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            },
                        )}
                    </Text>
                    <View style={styles.dataText}>
                        <Text style={styles.text}>
                            {announcement.Topic.slice(0, 25)}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default AnnouncementItem;
