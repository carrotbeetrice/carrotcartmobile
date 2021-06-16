const loginReducer = (prevState, action) => {
  switch (action.type) {
    case 'RETRIEVE_TOKEN':
      return {
        ...prevState,
        accessToken: action.accessToken,
        isLoading: false,
      };
    case 'LOGIN':
      return {
        ...prevState,
        userName: action.id,
        accessToken: action.accessToken,
        isLoading: false,
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
        userName: action.id,
        accessToken: action.accessToken,
        isLoading: false,
      };
  }
};

export default loginReducer;
