import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cars: [],
}

export const carsSlice = createSlice({
    name: 'cars',
    initialState,
    reducers: {
        setCars: (state, action) => {
            state.cars = action.payload
        },
        addCars: (state, action) => {
            state.cars = [...state.cars, action.payload]
        },
        deleteCars: (state, action) => {
            state.cars = state.cars.filter((car) => car.id !== action.payload.id) 
        },
        updateCars: (state, action) => {
            const updatedCars = state.cars.map((car) => {
                if ( car.id === action.payload.id) return action.payload
                return car
            })
            state.cars = updatedCars
        }
    }
});

export const { setCars, addCars, deleteCars, updateCars } = carsSlice.actions;
export default carsSlice.reducer;