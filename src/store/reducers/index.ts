import { combineReducers } from 'redux';
import authReducer from './auth';
import modalReducer from './modalReducer';
import dependentsReducer from './Dependents';
import favoritesReducer from './favoritesReducer';
import activesReducer from './Actives';

const rootReducer = combineReducers({
  authReducer,
  modalReducer,
  dependentsReducer,
  favoritesReducer,
  activesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
