/* eslint-disable no-unused-vars */
import { Stack, TextField, Box, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { Formik } from 'formik'
import { Button } from '@mui/material';
import { updateCars } from '../store/slices/cars';
import { useSelector } from 'react-redux';

const carsSchema = yup.object().shape({
    id: yup.string(),
    car: yup.string().required('You should enter the company name'),
    car_model: yup.string().required('You should enter the model name'),
    car_vin: yup.string().required('You should enter the VIN of the car'),
    car_model_year: yup.date().required('You should enter the year of the car'),
    car_color: yup.string().required('You should enter the color of the car'),
    price: yup.number().required('You should enter the price of the car'),
	availability: yup.boolean().required('You should enter the availability of the car')
})


// eslint-disable-next-line react/prop-types
function EditCarForm({handleClose, id}) {
    const dispatch = useDispatch();
    
    const data = useSelector((state) => state.cars.cars);
    const [availability, setAvailability] = useState(false)

    const carData = data.find((car) => car.id === id)

    const initialValues = {
        id,
        car: carData.car,
        car_model: carData.car_model,
        car_vin: carData.car_vin,
        car_color: carData.car_color,
        car_model_year: carData.car_model_year,
        price: carData.price.slice(1),
        availability: carData.availability,
    }

    const handleSubmitForm = (values, onSubmitProps) => {
        values.price = '$' + values.price 
        dispatch(updateCars(values));
        handleClose(false);
    }

    const handleAvailavilty = (event) => {
        setAvailability(event.target.value);
    };

    return (
        <Box>
            <Stack p='10px 20px'>
                <Formik
                    onSubmit={handleSubmitForm}
                    initialValues={ initialValues }
                    validationSchema={ carsSchema }
                >
                    {({
                        values, 
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                        resetForm,
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <Stack direction='row' flexWrap='wrap' gap='10px'>
                                <TextField 
                                    disabled
                                    fullWidth
                                    label="Company name"
                                    variant="outlined"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.car}
                                    name="car"
                                    error={Boolean(touched.car) && Boolean(errors.car)}
                                    helperText={ touched.car && errors.car }
                                />

                                <TextField 
                                disabled
                                    fullWidth
                                    label="Model name"
                                    variant="outlined"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.car_model}
                                    name="car_model"
                                    error={Boolean(touched.car_model) && Boolean(errors.car_model)}
                                    helperText={ touched.car_model && errors.car_model }
                                />

                                <TextField 
                                disabled
                                    fullWidth
                                    label="VIN"
                                    variant="outlined"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.car_vin}
                                    name="car_vin"
                                    error={Boolean(touched.car_vin) && Boolean(errors.car_vin)}
                                    helperText={ touched.car_vin && errors.car_vin }
                                />


                                <TextField 
                                disabled
                                    fullWidth
                                    label="Year"
                                    variant="outlined"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.car_model_year}
                                    name="car_model_year"
                                    error={Boolean(touched.car_model_year) && Boolean(errors.car_model_year)}
                                    helperText={ touched.car_model_year && errors.car_model_year }
                                />

                                <TextField 
                                    fullWidth
                                    label="Color"
                                    variant="outlined"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.car_color}
                                    name="car_color"
                                    error={Boolean(touched.car_color) && Boolean(errors.car_color)}
                                    helperText={ touched.car_color && errors.car_color }
                                /> 

                                <TextField  
                                    fullWidth
                                    label="Price"
                                    variant="outlined"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.price}
                                    name="price"
                                    error={Boolean(touched.price) && Boolean(errors.price)}
                                    helperText={ touched.price && errors.price }
                                />

                                <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Availability</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={values.availability}
                                            label="Availability"
                                            name="availability"
                                            onChange={handleChange}
                                            error={Boolean(touched.availability) && Boolean(errors.availability)}
                                        >
                                            <MenuItem value={true}>Yes</MenuItem>
                                            <MenuItem value={false}>No</MenuItem>
                                        </Select>
                                    </FormControl>
                            </Stack>
                            
                            <Stack direction={'row'} justifyContent='flex-end' gap='20px' mt='25px'>
                                <Button size='large' variant='contained' type='submit'>Edit</Button>
                                <Button size='large' variant='contained' color='error' onClick={handleClose}>Cancel</Button>
                            </Stack>
                        </form>
                    )}
                </Formik>
            </Stack>
        </Box>
    )
}

export default EditCarForm;