import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const AnnouncementView = ({ route }) => {
    const { announcement, imageUri } = route.params;

    console.log("Image URI:", imageUri);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
        },
        image: {
            width: '100%',
            height: 200, 
            resizeMode: 'cover',
            marginBottom: 10,
        },
    });

    return (
        <ScrollView style={styles.container}>
            <Image
                style={styles.image}
                source={{ uri: imageUri }}
            />

            <Text>
                {new Date(announcement.created_at).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
            </Text>
            <Text>{announcement.Topic}</Text>
            <Text>{announcement.Message}</Text>
        </ScrollView>
    );
};

export default AnnouncementView;
