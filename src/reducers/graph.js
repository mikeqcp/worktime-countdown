import {GRAPH} from '../actions/const';
import {GRAPH_LINES} from '../components/Graph/types';

const initialState = GRAPH_LINES;

module.exports = function(state = initialState, {type, parameter}) {
  switch(type) {
    case GRAPH: {
      return parameter;
    }
    default: {
      return state;
    }
  }
};
