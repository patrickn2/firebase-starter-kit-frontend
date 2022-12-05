import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  Box,
  Button,
  Collapse,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import DeleteDialog from 'components/alertsNDialogs/ConfirmationDialog';
import { useRoles } from 'hooks/useRoles';
import { useEffect, useMemo, useState } from 'react';
import RoleForm, { UseRoleFormProps } from './roleForm';
import * as S from './styles';

const Roles = () => {
  const [openRoleModal, setOpenRoleModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteRoleName, setDeleteRoleName] = useState<Role['roleName'] | null>(
    null,
  );
  const [editRole, setEditRole] = useState<UseRoleFormProps | null>(null);
  const { roles, fetchRoles, deleteRole } = useRoles();

  useEffect(() => {
    fetchRoles();
  }, []);

  const roleNameList = useMemo(() => {
    return roles.reduce((acc: string[], cur: Role) => {
      return [...acc, cur.roleName];
    }, []);
  }, [roles]);

  const handleCloseNewRoleModal = () => {
    setOpenRoleModal(false);
  };

  const handleOpenNewRoleModal = () => {
    setEditRole(null);
    setOpenRoleModal(true);
  };

  const handleOpenCurrentRoleModal = (role: Role) => {
    const roleFormProps: UseRoleFormProps = {
      roleName: role.roleName,
      routes: [],
    };
    if (role.routes) {
      Object.keys(role.routes).forEach((url) => {
        if (role.routes) {
          roleFormProps.routes.push({
            url: url as RouteList | '',
            read: role.routes[url].read,
            write: role.routes[url].write,
            delete: role.routes[url].delete,
          });
        }
      });
    }

    setEditRole(roleFormProps);
    setOpenRoleModal(true);
  };

  const handleDelete = (role: Role) => {
    setOpenDeleteModal(true);
    setDeleteRoleName(role.roleName);
  };

  const confirmDeleteRole = () => {
    setOpenDeleteModal(false);
    if (deleteRoleName) deleteRole(deleteRoleName);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const Row = ({
    role,
    handleEditRole,
  }: {
    role: Role;
    handleEditRole: (role: Role) => void;
  }) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            {role.routes ? (
              <IconButton
                aria-label='show routes'
                size='small'
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            ) : null}
          </TableCell>
          <TableCell component='th' scope='row'>
            {role.roleName}
          </TableCell>
          <TableCell component='th' scope='row'>
            <IconButton onClick={() => handleEditRole(role)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => handleDelete(role)}>
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant='h6' gutterBottom component='div'>
                  Routes
                </Typography>
                <Table size='small' aria-label='purchases'>
                  <TableHead>
                    <TableRow>
                      <TableCell>Url</TableCell>
                      <TableCell align='right'>Read</TableCell>
                      <TableCell align='right'>Write</TableCell>
                      <TableCell align='right'>Delete</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {role?.routes
                      ? Object.keys(role.routes).map((route) => (
                          <TableRow key={route}>
                            <TableCell component='th' scope='row'>
                              {route}
                            </TableCell>
                            <TableCell align='right'>
                              {role?.routes && role.routes[route].read ? (
                                <CheckCircleIcon color='success' />
                              ) : (
                                <CancelIcon color='secondary' />
                              )}
                            </TableCell>
                            <TableCell align='right'>
                              {role?.routes && role.routes[route].write ? (
                                <CheckCircleIcon color='success' />
                              ) : (
                                <CancelIcon color='secondary' />
                              )}
                            </TableCell>
                            <TableCell align='right'>
                              {role?.routes && role.routes[route].delete ? (
                                <CheckCircleIcon color='success' />
                              ) : (
                                <CancelIcon color='secondary' />
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      : null}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };

  return (
    <>
      <Container>
        <Box
          sx={{
            paddingLeft: '10px',
            paddingBottom: '10px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant='h2'>Roles</Typography>
          <Button variant='contained' onClick={handleOpenNewRoleModal}>
            New Role
          </Button>
        </Box>
        <S.StyledBox>
          <TableContainer component={Paper}>
            <Table aria-label='collapsible table'>
              <TableHead>
                <TableRow>
                  <TableCell width={10} />
                  <TableCell align='left'>Name</TableCell>
                  <TableCell align='right' width={120} />
                </TableRow>
              </TableHead>
              <TableBody>
                {roles.map((row: Role) => (
                  <Row
                    key={row.roleName}
                    role={row}
                    handleEditRole={handleOpenCurrentRoleModal}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </S.StyledBox>
      </Container>
      <RoleForm
        defaultValues={editRole}
        open={openRoleModal}
        onClose={handleCloseNewRoleModal}
        roleNameList={roleNameList}
      />
      <DeleteDialog
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={confirmDeleteRole}
        title='Delete Confirmation!'
        text={`Would you like to delete ${deleteRoleName as string} role?`}
        buttonYesColor='secondary'
      />
    </>
  );
};

export default Roles;
