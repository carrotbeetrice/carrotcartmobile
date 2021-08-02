const loginReducer = (prevState, action) => {
  switch (action.type) {
    case 'RETRIEVE_TOKEN':
      return {
        ...prevState,
        accessToken: action.accessToken,
        isLoading: false,
        isNewUser: false,
      };
    case 'LOGIN':
      return {
        ...prevState,
        userName: action.id,
        accessToken: action.accessToken,
        isLoading: false,
        isNewUser: false,
      };
    case 'LOGOUT':
      return {
        ...prevState,
        userName: null,
        accessToken: null,
        isLoading: false,
      };
    case 'REGISTER':
      return {
        ...prevState,
        userName: null,
        accessToken: action.accessToken,
        isLoading: false,
        isNewUser: true,
      };
  }
};

export default loginReducer;
