import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {Snackbar} from 'react-native-paper';

const AppSnackbar = forwardRef((props, ref) => {
  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: '',
    type: 'default',
  });

  const showSnackbar = (message, type) => {
    setSnackbar({
      visible: true,
      message,
      type,
    });
  };

  const hideSnackbar = () => {
    setSnackbar({
      ...snackbar,
      visible: false,
    });
  };

  useImperativeHandle(ref, () => ({
    showSnackbar: (message, type) => showSnackbar(message, type),
  }));

  return (
    <Snackbar
      visible={snackbar.visible}
      onDismiss={hideSnackbar}
      duration={Snackbar.DURATION_INDEFINITE}
      style={{backgroundColor: getSnackbarColor(snackbar.type)}}
      action={{
        label: 'Close',
        onPress: hideSnackbar,
      }}>
      {snackbar.message}
    </Snackbar>
  );
});

const getSnackbarColor = type => {
  switch (type) {
    case 'success':
      return '#84c03f';
    case 'error':
      return '#df3620';
    case 'warning':
      return '#c0b13f';
    default:
      return 'default';
  }
};

export default AppSnackbar;
