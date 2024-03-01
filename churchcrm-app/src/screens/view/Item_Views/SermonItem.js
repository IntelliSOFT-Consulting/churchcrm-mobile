import React from 'react';
import {
    View,
    Text,
    Image,
} from 'react-native';
import { BASE_URL } from '../../../hooks/HandleApis';
import { styles } from '../../../assets/css/HomeScreen';

const SermonItem = ({ sermon }) => {
    return (
        <View>
            <View
                style={{
                    flexDirection: 'row',
                    paddingTop: 5,
                    paddingBottom: 20,
                }}>
                <View style={{ marginRight: 10 }}>
                    <Image
                        style={styles.image}
                        source={{
                            uri: `${BASE_URL}/SermonThumbnails/${sermon.Thumbnail}`,
                        }}
                    />
                    <Text style={styles.dataDate}>
                        {new Date(sermon.created_at).toLocaleDateString(
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
                            {sermon.Title.length > 25 ? (
                                sermon.Title.slice(0, 25) + '...'
                            ) : (
                                    sermon.Title
                            )}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default SermonItem;
