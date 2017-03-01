import Home from '../components/Home';
import {connect} from 'react-redux';
import {setHours} from '../actions/hours';
import {setGraphType} from '../actions/graph';

export default connect((s) => ({hours: s.hours, graph: s.graph}), {setHours, setGraphType})(Home);
