const initialState = {
    types: [],
    pokemons: [],
    type: "",
    order: ""
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case "GET_TYPE":
        return {
          ...state,
          types: action.payload,
        };
      case "GET_POKEMONS":
        return {
          ...state,
          pokemons: action.payload,
        };
      case "GET_NAME":
        return {
          ...state,
          pokemons: action.payload,
        };
      case "FILTER":
        return {
          ...state,
          pokemons: action.payload,
        };
      case "BY_TYPE":
        return {
          ...state,
          type: action.payload,
        };
      case "ORDER":
        return {
          ...state,
          order: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default rootReducer;