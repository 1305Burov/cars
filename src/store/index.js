import { combineReducers } from 'redux';
import carsReducer from './slices/cars';

const rootReducer = combineReducers({
    cars: carsReducer,
});

export default rootReducer;