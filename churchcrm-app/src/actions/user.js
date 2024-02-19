const setUser = (userObj) => {
    return {
      type: 'SET_USER',
      payload: userObj,
    };
  };
  
  const setToken = (token) => {
    return {
      type: 'SET_TOKEN',
      payload: token,
    };
  };
  
  const logOut = () => {
    return {
      type: 'LOG_OUT',
    };
  };
  
  export default {
    setToken,
    setUser,
    logOut,
  };
  