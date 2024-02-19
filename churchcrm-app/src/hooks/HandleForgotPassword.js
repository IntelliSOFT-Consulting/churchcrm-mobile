import {useNavigation} from '@react-navigation/native';

const useForgotPassword = () => {
  const navigation = useNavigation();

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return {
    handleForgotPassword,
  };
};

export default useForgotPassword;
