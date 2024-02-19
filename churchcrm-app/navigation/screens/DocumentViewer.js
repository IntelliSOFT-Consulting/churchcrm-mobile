import React from 'react';
import { View } from 'react-native';
import PDFView from 'react-native-view-pdf';

const DocumentViewer = ({ route }) => {
  const { uri } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <PDFView
        source={{ uri }}
        style={{ flex: 1 }}
        onLoadComplete={() => console.log('Document loaded')}
        onError={(error) => console.error('Document error:', error)}
      />
    </View>
  );
};

export default DocumentViewer;
