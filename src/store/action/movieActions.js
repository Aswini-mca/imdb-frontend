import { API } from "../../global";

let token = localStorage.getItem('token')
export const createMovie = (movieData) => async (dispatch) => {
  try {
    const response = await fetch(`${API}/movie/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      body: JSON.stringify(movieData),
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: 'CREATE_MOVIE_SUCCESS', payload: data.movie, message: data.message });
    } else {
      dispatch({ type: 'CREATE_MOVIE_FAILURE', payload: data.error });
    }
  } catch (error) {
    dispatch({ type: 'CREATE_MOVIE_FAILURE', payload: error.message });
  }
};

export const addActor = (actorData) => async (dispatch) => {
  try {
    const response = await fetch(`${API}/actor/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      body: JSON.stringify(actorData),
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: 'ADD_ACTOR_SUCCESS', payload: data.actor, message: data.message });
    } else {
      dispatch({ type: 'ADD_ACTOR_FAILURE', payload: data.error });
    }
  } catch (error) {
    dispatch({ type: 'ADD_ACTOR_FAILURE', payload: error.message });
  }
};

export const addProducer = (producerData) => async (dispatch) => {
  try {
    const response = await fetch(`${API}/producer/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      body: JSON.stringify(producerData),
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: 'ADD_PRODUCER_SUCCESS', payload: data.producer, message: data.message });
    }
    dispatch({ type: 'ADD_PRODUCER_FAILURE', payload: data.error });
  } catch (error) {
    dispatch({ type: 'ADD_PRODUCER_FAILURE', payload: error.message });
  }
};

export const editMovie = (movieId, movieData) => async (dispatch) => {
  try {
    const response = await fetch(`${API}/movie/edit/${movieId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      body: JSON.stringify(movieData),
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: 'EDIT_MOVIE_SUCCESS', payload: data, error: data.error, message: data.message });
    } else {
      dispatch({ type: 'EDIT_MOVIE_FAILURE', payload: data.error });

    }
  } catch (error) {
    dispatch({ type: 'EDIT_MOVIE_FAILURE', payload: error.message });
  }
};

export const deleteMovie = (movieId) => async (dispatch) => {
  try {
    const response = await fetch(`${API}/movie/delete/${movieId}`, {
      method: 'DELETE',
      headers: {
        'x-auth-token': token
      },
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: 'DELETE_MOVIE_SUCCESS', payload: movieId,message:data.message });
    } else {
      dispatch({ type: 'DELETE_MOVIE_FAILURE', payload: data.error });
    }
  } catch (error) {
    dispatch({ type: 'DELETE_MOVIE_FAILURE', payload: error.message });
  }
};
