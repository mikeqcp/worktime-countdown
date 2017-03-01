import Main from '../components/Main';
import {connect} from 'react-redux';

export default connect(s => {
  return {hours: s.hours};
})(Main);
