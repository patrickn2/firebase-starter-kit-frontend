import { AppLoader } from '@crema';
import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import {
  Avatar,
  CircularProgress,
  Container,
  IconButton,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from '@mui/material';
import orange from '@mui/material/colors/orange';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { format } from 'date-fns';
import { UserRecord } from 'firebase-admin/auth';
import { useAuthUser } from 'hooks/useAuthUser';
import { useMemo, useState } from 'react';
import { useRoles } from '../../../hooks/useRoles';
import { useUsers } from '../../../hooks/useUsers';

const AdminUsers = () => {
  const { canDo } = useAuthUser();
  const { users, switchUserRole, banUnbanUser, loading } = useUsers({
    page: 1,
    perPage: 2000,
  });
  const { roles } = useRoles(true);
  const [disabledRoleSelector, setDisabledRoleSelector] = useState<
    null | string
  >(null);
  const [disabledBanButton, setDisabledBanButton] = useState<null | string>(
    null,
  );

  const handleRoleChange = async (roleName: string, userId: string) => {
    setDisabledRoleSelector(userId);
    await switchUserRole({ roleName, userId });
    setDisabledRoleSelector(null);
  };

  const handleBanUser = async (userId: string, operation: 'ban' | 'unban') => {
    setDisabledBanButton(userId);
    await banUnbanUser({ userId, operation });
    setDisabledBanButton(null);
  };

  const columns: GridColDef[] = [
    {
      field: 'photoUrl',
      headerName: '',
      width: 70,
      renderCell: (params: GridRenderCellParams) => (
        <Avatar
          sx={{
            height: 40,
            width: 40,
            fontSize: 24,
            backgroundColor: orange[500],
          }}
          src={params.value}
          imgProps={{ referrerPolicy: 'no-referrer' }}
        />
      ),
    },
    { field: 'id', headerName: 'Id', width: 260 },
    { field: 'name', headerName: 'Full Name', width: 200 },
    { field: 'email', headerName: 'E-mail', width: 250 },
    {
      field: 'emailVerified',
      headerName: '',
      width: 20,
      disableColumnMenu: true,
      sortable: false,

      renderCell: (params: GridRenderCellParams) => (
        <Tooltip title={'Email' + (params.value ? '' : ' not') + ' Verified'}>
          {params.value ? (
            <CheckCircleIcon color='success' />
          ) : (
            <CancelIcon color='secondary' />
          )}
        </Tooltip>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 80,
      renderCell: (params: GridRenderCellParams) => (
        <Typography
          variant='body2'
          color={params.value === 'Banned' ? 'secondary' : 'primary'}
        >
          {params.value}
        </Typography>
      ),
    },
    { field: 'createdAt', headerName: 'Created At', width: 160 },
    { field: 'lastLogin', headerName: 'Last Login', width: 160 },
    {
      field: 'roleName',
      headerName: 'Role',
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <>
          {canDo('/admin/users', 'write') ? (
            <Select
              size='small'
              fullWidth
              value={params.value}
              sx={{ fontSize: '12px' }}
              onChange={(e) =>
                handleRoleChange(e.target.value, params.id.toString())
              }
              disabled={disabledRoleSelector === params.id.toString()}
            >
              <MenuItem value='Admin'>Admin</MenuItem>
              {roles
                ? roles.map((role) => (
                    <MenuItem key={role.roleName} value={role.roleName}>
                      {role.roleName}
                    </MenuItem>
                  ))
                : null}
              <MenuItem value='User'>User</MenuItem>
            </Select>
          ) : (
            params.value
          )}
        </>
      ),
    },
    {
      field: 'buttons',
      headerName: '',
      renderCell: (params: GridRenderCellParams) => (
        <>
          {canDo('/admin/users', 'write') ? (
            <>
              {disabledBanButton !== params.id.toString() ? (
                <Tooltip
                  title={
                    params.row.status === 'Active' ? 'Ban User' : 'Unban User'
                  }
                  placement='right'
                >
                  <IconButton
                    onClick={() => {
                      handleBanUser(
                        params.id.toString(),
                        params.row.status === 'Active' ? 'ban' : 'unban',
                      );
                    }}
                  >
                    {params.row.status === 'Active' ? (
                      <ThumbDownAltIcon color='secondary' />
                    ) : (
                      <ThumbUpAltIcon color='primary' />
                    )}
                  </IconButton>
                </Tooltip>
              ) : (
                <CircularProgress size={30} sx={{ marginLeft: '5px' }} />
              )}{' '}
            </>
          ) : null}
        </>
      ),
    },
  ];

  const rows = useMemo(() => {
    if (users?.data)
      return users.data.map((user: UserRecord) => {
        return {
          id: user.uid,
          photoUrl: user.photoURL,
          name: user.displayName,
          email: user.email,
          emailVerified: user.emailVerified ? 'true' : 'false',
          status: user.disabled ? 'Banned' : 'Active',
          createdAt: format(
            new Date(user.metadata.creationTime),
            'MMM, dd yyyy HH:mm:ss',
          ),
          lastLogin: format(
            new Date(user.metadata.lastSignInTime),
            'MMM, dd yyyy HH:mm:ss',
          ),
          roleName: user.customClaims?.role ?? 'User',
        };
      });
  }, [users]);

  return (
    <>
      {loading ? (
        <AppLoader />
      ) : (
        <>
          <Typography
            variant='h2'
            sx={{
              paddingLeft: '20px',
              paddingBottom: '10px',
            }}
          >
            Users
          </Typography>
          <Container maxWidth='xl'>
            <div style={{ height: 400, width: '100%' }}>
              {rows ? (
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={50}
                  checkboxSelection
                />
              ) : null}
            </div>
          </Container>
        </>
      )}
    </>
  );
};

export default AdminUsers;
