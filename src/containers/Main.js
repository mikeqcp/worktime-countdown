import Main from '../components/Main';
import {connect} from 'react-redux';
import {setProgress} from '../actions/progress';

export default connect(s => ({
  progress: s.progress,
  hours: s.hours,
  graph: s.graph
}), {setProgress})(Main);
