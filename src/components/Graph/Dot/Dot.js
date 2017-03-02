import GraphBase from '../GraphBase';
import DotRenderer from './renderer';
import {connect} from 'react-redux';

@connect(s => {return {progress: s.progress};}, {})
export default class Graph extends GraphBase {
  getRenderer() {
    return DotRenderer;
  }
}
