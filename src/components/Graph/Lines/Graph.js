import GraphBase from '../GraphBase';
import GraphRenderer from './renderer';
import {connect} from 'react-redux';

@connect(s => {return {progress: s.progress};}, {})
export default class Graph extends GraphBase {
  getRenderer() {
    return GraphRenderer;
  }
}
