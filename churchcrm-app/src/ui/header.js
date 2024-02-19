import * as React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';
import {moderateScale} from 'react-native-size-matters';
import {primary} from '../utilities/colors';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  _handleSearch = () => console.log('Searching');

  _handleMore = () => console.log('Shown more');

  render() {
    const {
      title = 'title',
      subtitle = '',
      size = moderateScale(20),
      style = {},
      onPress = null,
      goBack = null,
      download = null,
    } = this.props;
    return (
      <Appbar.Header style={[styles.header, style]}>
        {onPress && (
          <Appbar.Action
            color="white"
            icon="view-headline"
            onPress={() => {
              onPress();
            }}
          />
        )}
        {goBack && (
          <Appbar.BackAction
            color="white"
            onPress={() => {
              goBack();
            }}
          />
        )}

        <Appbar.Content
          titleStyle={styles.titleStyle}
          title={title}
          subtitle={subtitle}
          size={size}
        />
        {download && (
          <Appbar.Action color="white" icon="download" onPress={download} />
        )}
      </Appbar.Header>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  size: PropTypes.number,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: primary,
    marginTop: moderateScale(25),
  },
  titleStyle: {color: 'white'},
});

export default Header;
