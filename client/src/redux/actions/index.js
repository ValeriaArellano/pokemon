export const getTypes = () => async (dispatch) => {
    const response = await fetch("https://pokemonnnnn.fly.dev/types");
    console.log(response);
    const data = await response.json();
    console.log(data);
    dispatch({
      type: "GET_TYPE",
      payload: data,
    });
  };
  
  export const getPokemons = () => async (dispatch) => {
    const response = await fetch(`https://pokemonnnnn.fly.dev/pokemons`);
    const data = await response.json();
    dispatch({
      type: "GET_POKEMONS",
      payload: data,
    });
  };

  export const getByName = (name) => async (dispatch) => {
    const response = await fetch(
      `https://pokemonnnnn.fly.dev/pokemons?name=${name}`
    );
    const data = await response.json();
    dispatch({
      type: "GET_NAME",
      payload: data,
    });
  };
  
  export const filters = (num) => async (dispatch) => {
    const response = await fetch(
      `https://pokemonnnnn.fly.dev/pokemons?by=${num}`
    );
    const data = await response.json();
    dispatch({
      type: "FILTER",
      payload: data,
    });
  };
  
  export const type = (type) => (dispatch) => {
    dispatch({
      type: "BY_TYPE",
      payload: type,
    });
  };
  
  export const sort = (sort) => (dispatch) => {
    dispatch({
      type: "ORDER",
      payload: sort,
    });
  };
  
  export const add = (pokemon) => (dispatch) => {
    dispatch({
      type: "ADD",
      payload: pokemon,
    });
  };