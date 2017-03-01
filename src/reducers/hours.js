import {HOURS} from '../actions/const';

/* Define your initial state here.
 *
 * If you change the type from object to something else, do not forget to update
 * src/container/App.js accordingly.
 */
const initialState = {
  from: [9, 0],
  to: [17, 0]
};

module.exports = function(state = initialState, {type, parameter}) {
  /* Keep the reducer clean - do not mutate the original state. */
  //let nextState = Object.assign({}, state);

  switch(type) {
    case HOURS: {
      return parameter;
    }
    default: {
      /* Return original state if no actions were consumed. */
      return state;
    }
  }
}
