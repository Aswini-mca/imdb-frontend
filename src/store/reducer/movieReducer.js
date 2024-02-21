
const initialState = {
  movies: [],
  producer: [],
  actor: [],
  message: null,
  error: null,
};

const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_MOVIE_SUCCESS':
      return {
        ...state,
        movies: [...state.movies, action.payload],
        message: action.message,
        error: null,
      };
    case 'CREATE_MOVIE_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    case 'ADD_ACTOR_SUCCESS':
      return {
        ...state,
        actor: [...state.actor, action.payload],
        message: action.message,
        error: null,
      };
    case 'ADD_ACTOR_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    case 'ADD_PRODUCER_SUCCESS':
      return {
        ...state,
        producer: [...state.producer, action.payload],
        message: action.message,
        error: null,
      };
    case 'ADD_PRODUCER_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    case 'EDIT_MOVIE_SUCCESS':
      return {
        ...state,
        movies: state.movies.map((movie) => (movie._id === action.payload._id ? action.payload : movie)),
        message: action.message,
        error: null,
      };
    case 'EDIT_MOVIE_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    case 'DELETE_MOVIE_SUCCESS':
      return {
        ...state,
        movies: state.movies.filter((movie) => movie._id !== action.payload),
        error: null,
      };
    case 'DELETE_MOVIE_FAILURE':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default movieReducer;
