import Home from '../components/Home';
import {connect} from 'react-redux';
import {setHours} from '../actions/hours';

export default connect((s) => ({hours: s.hours}), {setHours})(Home);
