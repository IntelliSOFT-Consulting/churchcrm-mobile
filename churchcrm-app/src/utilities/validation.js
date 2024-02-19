import moment from 'moment';
import {Alert} from 'react-native';

export const sortKeyValue = data => {
  let cleanData = [];

  for (const key in data) {
    if (data[key]) {
      cleanData.push({value: key, label: data[key]});
    }
  }

  cleanData.sort((a, b) => a.label.toString().localeCompare(b.label));
  return cleanData;
};

export const checkSectionRequired = (complete_form, answers) => {
  let validate = complete_form
    .filter(item => item.required)
    .map(form => {
      return form;
    });

  for (let i = 0; i < validate.length; i++) {
    if (answers.length > 0) {
      const answer_check = answers.filter(
        ansItem => ansItem.question_id === validate[i].question_id,
      );

      if (answer_check.length < 1) {
        Alert.alert(
          'Missing Field',
          validate[i].question + ' data is required',
        );
        return true;
      }
    } else {
      Alert.alert(
        'Missing Data Fields',
        'Please answer all the mandatory fields to proceed',
      );
      return true;
    }
  }
  return false;
};

export const dateTimeFormat = (datetime, type) => {
  let date = datetime;
  if (type === 'singular_date') {
    date = {
      day: moment(datetime).format('DD'),
      month: moment(datetime).format('MM'),
      year: moment(datetime).format('YYYY'),
    };
  } else if (type === 'singular_time') {
    const [hour, min] = datetime.split(':');
    date = {
      hour: hour,
      min: min,
    };
  }

  return date;
};

export const capitalizeFirstLetter = string => {
  if (string || string !== undefined) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
};
