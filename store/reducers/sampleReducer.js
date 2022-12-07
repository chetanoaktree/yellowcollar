import { GET_SAMPLE, SET_SAMPLE, SAMPLE_ERROR } from "../types";

const initialState = {
  sample: [],
  loading: true,
  fasty:'fasty'
};

const sampleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SAMPLE:
      return {
        ...state,
        sample: action.payload,
        loading: false,
      };
    
    case SET_SAMPLE:
      return {
        ...state,
        fasty: action.payload,
        loading: false,
      };

    case SAMPLE_ERROR:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default sampleReducer;
