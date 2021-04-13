import {combineReducers} from 'redux';
import {data} from './data/data';

export const NameSpace = {
  DATA: `DATA`,
};

export const rootReducer = combineReducers({
  [NameSpace.DATA]: data,
});
