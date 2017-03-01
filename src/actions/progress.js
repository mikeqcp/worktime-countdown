import {PROGRESS} from './const';

export function setProgress(parameter) {
  return {type: PROGRESS, parameter};
}
