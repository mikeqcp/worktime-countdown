import App from '../components/App';
import {connect} from 'react-redux';
import {setHours} from '../actions/hours';

export default connect(s => {
  return {hours: s.hours};
}, {setHours})(App);
