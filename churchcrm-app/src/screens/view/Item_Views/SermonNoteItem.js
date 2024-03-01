import {
    Text,
    View,
    Image,
} from 'react-native';
import { BASE_URL } from '../../../hooks/HandleApis';
import { styles as homestyles} from '../../../assets/css/HomeScreen';
import React from 'react';


const SermonNoteItem = ({ sermonNote }) => {

    return (
        <View>
                <View>
                    <View style={{ flexDirection: 'row', padding: 10 }}>
                        <View style={{ marginRight: 10 }}>
                            <Image
                                style={homestyles.image}
                                source={{
                                    uri: `${BASE_URL}/Notes_Thumbnails/${sermonNote.notesimage}`,
                                }}
                            />
                            <Text style={homestyles.sermonDate}>
                                {new Date(sermonNote.created_at).toLocaleDateString(
                                    undefined,
                                    {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    },
                                )}
                            </Text>
                            <Text style={homestyles.sermonText}>
                                {sermonNote.sermondescription.length > 25 ?
                                    (sermonNote.sermondescription.slice(0, 25) + '...') :
                                    (sermonNote.sermondescription)
                                }

                            </Text>
                        </View>
                    </View>
                </View>
        </View>

    );
};

export default SermonNoteItem;
