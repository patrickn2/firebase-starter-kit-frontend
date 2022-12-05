import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

export interface AlertDialogProps {
  title?: string;
  open: boolean;
  handleClose: () => void;
  description?: string;
  closeAction?: () => void;
}

const AlertDialog = ({
  title = '',
  open = false,
  handleClose,
  description,
}: AlertDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      sx={{ minWidth: '200px' }}
    >
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant='contained'>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
