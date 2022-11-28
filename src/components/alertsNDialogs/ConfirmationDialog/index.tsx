import {
  Box,
  Button,
  ButtonProps,
  Divider,
  Modal,
  Typography,
} from '@mui/material';

interface ConfirmationDialogProps {
  open: boolean;
  onClose?: () => void;
  onConfirm: () => void;
  title?: string;
  text?: string;
  buttonYesText?: string;
  buttonNoText?: string;
  buttonYesColor?: ButtonProps['color'];
  buttonNoColor?: ButtonProps['color'];
}

const ConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  title = 'Confirmation',
  text = 'Would like to confirm?',
  buttonYesText = 'Yes',
  buttonNoText = 'No',
  buttonYesColor = 'primary',
  buttonNoColor = 'primary',
}: ConfirmationDialogProps) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: 'flex', justifyContent: 'center', paddingTop: '300px' }}
    >
      <Box
        sx={{
          width: '40rem',
          height: '20rem',
          borderRadius: '10px',
          backgroundColor: 'white',
          padding: '20px',
        }}
      >
        <Box>
          <Typography variant='h2'>{title}</Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            height: '70%',
            paddingTop: '10px',
          }}
        >
          <Typography
            sx={{
              fontSize: '20px',
            }}
          >
            {text}
          </Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: '10px',
            width: '100%',
            marginTop: '10px',
          }}
        >
          <Button
            variant='contained'
            size='large'
            color={buttonYesColor}
            sx={{ minWidth: '10rem' }}
            onClick={onConfirm}
          >
            {buttonYesText}
          </Button>
          <Button
            variant='contained'
            size='large'
            onClick={onClose}
            color={buttonNoColor}
            sx={{ minWidth: '10rem' }}
          >
            {buttonNoText}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmationDialog;
