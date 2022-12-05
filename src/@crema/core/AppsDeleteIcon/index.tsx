import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Theme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { SxProps } from '@mui/system';
import React, { ReactNode, useState } from 'react';
import IntlMessages from '../../utility/IntlMessages';
import AppConfirmDialog from '../AppConfirmDialog';
import AppTooltip from '../AppTooltip';

interface AppsDeleteIconProps {
  deleteAction: () => void;
  deleteTitle: string | ReactNode;
  sx: SxProps<Theme>;
}

const AppsDeleteIcon: React.FC<AppsDeleteIconProps> = ({
  deleteAction,
  deleteTitle,
  sx,
}) => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  return (
    <>
      <AppTooltip title={<IntlMessages id='common.trash' />}>
        <IconButton
          sx={sx}
          size='large'
          onClick={() => setDeleteDialogOpen(true)}
        >
          <DeleteOutlinedIcon />
        </IconButton>
      </AppTooltip>
      <AppConfirmDialog
        open={isDeleteDialogOpen}
        onDeny={setDeleteDialogOpen}
        onConfirm={deleteAction}
        title={deleteTitle}
        dialogTitle={<IntlMessages id='common.deleteItem' />}
      />
    </>
  );
};

export default AppsDeleteIcon;
