import { Button, Menu, MenuItem, useMediaQuery, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useState } from 'react';
import { useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteCars } from '../store/slices/cars';
import EditCarForm from './EditCarForm';

// eslint-disable-next-line react/prop-types
function Dropdown({id}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);

    const dispatch = useDispatch();
    const open = Boolean(anchorEl);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleDelete = (id) => {
        dispatch(deleteCars(id))
        setOpenDeleteModal(false);
    };

    const handleDeleteOpen = () => {
        setOpenDeleteModal(true)
    };

    const handleEditOpen = () => {
        setOpenEditModal(true)
    };

    const handleEditClose = () => {
        setOpenEditModal(false)
    };
   
    const handleCloseDelete = () => {
        setOpenDeleteModal(false);
    };
  
    return (
      <div>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Actions
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleEditOpen}>Edit</MenuItem>
          <MenuItem onClick={handleDeleteOpen}>Delete</MenuItem>
        </Menu>

            <Dialog
                fullScreen={fullScreen}
                open={openDeleteModal}
                onClose={handleCloseDelete}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                {"Are you sure you want to delete?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                    It will be impossible to restore a row after delete
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button autoFocus onClick={handleCloseDelete}>
                    Cancel
                </Button>
                <Button color='error' variant='contained' onClick={() => handleDelete(id)} autoFocus>
                    Delete
                </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                fullScreen={fullScreen}
                open={openEditModal}
                onClose={handleEditClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                {"Car row edit"}
                </DialogTitle>
                    <DialogContent>
                        <EditCarForm handleClose={handleEditClose} id={id} />
                    </DialogContent>
            </Dialog>
      </div>
    );
}

export default Dropdown