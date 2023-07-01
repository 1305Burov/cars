import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Stack, TextField, Button, DialogContent, DialogTitle, Dialog } from "@mui/material";
import { useEffect, useState } from "react";
import { getCarsAxios } from '../api/cars';
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import Dropdown from './Dropdown';
import { useDispatch, useSelector } from "react-redux";
import { setCars } from "../store/slices/cars";
import AddCarForm from './AddCarForm';

function CarsList() {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.cars.cars);
    const [searchValue, setSearchValue] = useState('');
    
    const getCarsList = async () => {
        const localStorageItem = localStorage.getItem('persist:root');
        
        if (!localStorageItem) {
            const data = await getCarsAxios();
            dispatch(setCars(data.cars))
        }
    }

    const search = data.filter((value) => value.car.toLowerCase().includes(searchValue.toLowerCase()))

    useEffect(() => {
        getCarsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])    
        
    const columns = [
        { id: 'company', label: 'Company', minWidth: 170 },
        { id: 'model', label: 'Model', minWidth: 100 },
        { id: 'VIN', label: 'VIN', minWidth: 100 },
        { id: 'color', label: 'Color', minWidth: 100 },
        { id: 'year', label: 'Year', minWidth: 100 },
        { id: 'price', label: 'Price', minWidth: 100 },
        { id: 'availability', label: 'Availability', minWidth: 100 },
    ];

    function createData(id, company, model, VIN, color, year, price, availability) {
        availability = availability ? <CheckCircleSharpIcon sx={{color: 'darkgreen'}} /> : <CancelSharpIcon sx={{color: 'darkred'}} />
        return { id, company, model, VIN, color, year, price, availability };
    }
    
    const rows = search ? search.map(car => createData( car.id, car.car, car.car_model, car.car_vin, car.car_color, car.car_model_year, car.price, car.availability )) 
    : data.map(car => createData( car.id, car.car, car.car_model, car.car_vin, car.car_color, car.car_model_year, car.price, car.availability ));

    rows.reverse();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [openCarAdd, setOpenCarAdd] = useState(false);

    const handleOpen = () => {
        setOpenCarAdd(true)
    };

    const handleClose = () => {
        setOpenCarAdd(false)
    };
    
    return (
        <>
            <Stack direction={'row'} gap='10px'>
                <TextField
                    fullWidth
                    id="outlined-controlled"
                    label="Search"
                    value={searchValue}
                    onChange={(event) => {
                        setSearchValue(event.target.value);
                    }}
                />

                <Button variant="contained" sx={{width: '200px'}} onClick={handleOpen}>Add car</Button>
            </Stack>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: '100%' }}>
                <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                    {columns.map((column) => (
                        <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        >
                        {column.label}
                        </TableCell>
                    ))}
                    <TableCell key={'actions'} align={'right'}>
                        Actions
                    </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                        return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                            {columns.map((column) => {
                            const value = row[column.id];
                                return (
                                    <TableCell key={column.id} align={column.align}>
                                    {column.format && typeof value === 'number'
                                        ? column.format(value)
                                        : value}
                                    </TableCell>
                                );
                            })}
                            <TableCell key={row.id} align={'right'}>
                                <Dropdown id={row.id} />
                            </TableCell>
                        </TableRow>
                        );
                    })}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            </Paper>


            <Dialog
                open={openCarAdd}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Add new car"}
                </DialogTitle>
                <DialogContent>
                    <AddCarForm handleClose={handleClose} />
                </DialogContent>
            </Dialog>
        </>
    );
}

export default CarsList