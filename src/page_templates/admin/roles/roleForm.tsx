import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from '@mui/material';
import { useRoles } from 'hooks/useRoles';
import routesConfig, { RouterConfigData } from 'modules/routesConfig';
import { useEffect, useMemo } from 'react';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';

export interface UseRoleFormProps {
  roleName: string;
  routes: {
    url: RouteList | '';
    read: boolean;
    write: boolean;
    delete: boolean;
    id?: string;
  }[];
}

interface RoleFormProps {
  defaultValues: UseRoleFormProps | null;
  open: boolean;
  roleNameList: string[];
  onClose: () => void;
}

const roleForm = ({
  defaultValues,
  open,
  onClose,
  roleNameList,
}: RoleFormProps) => {
  const { createUpdateRole } = useRoles();

  const cleanDefaultValues: UseRoleFormProps = {
    roleName: '',
    routes: [
      {
        url: '',
        read: false,
        write: false,
        delete: false,
      },
    ],
  };

  const {
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors },
  } = useForm<UseRoleFormProps>({
    defaultValues: defaultValues ?? cleanDefaultValues,
    mode: 'all',
  });

  useEffect(() => {
    reset(defaultValues ? { ...defaultValues } : { ...cleanDefaultValues });
  }, [defaultValues]);

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'routes',
  });

  const getRouteUrls = (routeList: RouterConfigData[]) => {
    const routes: {
      url: RouteList;
      collections: CollectionList | CollectionList[];
    }[] = [];
    routeList.forEach((route) => {
      if (route.url && route.collections)
        routes.push({
          url: route.url,
          collections: route.collections,
        });
      if (route.children) {
        const childrenRoutes = getRouteUrls(route.children);
        if (childrenRoutes.length > 0) {
          routes.push(...childrenRoutes);
        }
      }
    });
    return routes;
  };

  const routes = useMemo(() => {
    const selectedRoutes = fields.reduce((acc, cur) => {
      if (cur.url !== '') acc.push(cur.url);
      return [...new Set(acc)];
    }, [] as RouteList[]);

    const routeCollectionList = getRouteUrls(routesConfig);

    const routeList = routeCollectionList.reduce((acc, cur) => {
      acc.push(cur.url);
      return acc;
    }, [] as RouteList[]);

    return routeList.filter((route) => !selectedRoutes.includes(route));
  }, [routesConfig, fields]);

  const disableAddRouteButton = useMemo(() => {
    const routeList = getRouteUrls(routesConfig);
    return routeList.length == fields.length;
  }, [routesConfig, fields]);

  const onSubmit: SubmitHandler<UseRoleFormProps> = (data) => {
    const routes = {} as Routes;
    const collections = {} as Collections;

    const routeCollectionList = getRouteUrls(routesConfig);

    data.routes.forEach((e) => {
      routes[e.url] = {
        read: e.read,
        write: e.write,
        delete: e.delete,
      };

      routeCollectionList.forEach((rcl) => {
        if (rcl.url === e.url && rcl.collections) {
          if (typeof rcl.collections === 'string') {
            collections[rcl.collections as string] = {
              read: collections[rcl.collections]?.read ? true : e.read,
              write: collections[rcl.collections]?.write ? true : e.write,
              delete: collections[rcl.collections]?.delete ? true : e.delete,
            };
          } else {
            (rcl.collections as string[]).forEach((collection) => {
              collections[collection] = {
                read: collections[collection]?.read ? true : e.read,
                write: collections[collection]?.write ? true : e.write,
                delete: collections[collection]?.delete ? true : e.delete,
              };
            });
          }
        }
      });
    });

    createUpdateRole({ roleName: data.roleName, routes, collections });
    onClose();
  };

  const updateFields = (index: number, value: RouteList) => {
    const { routes } = getValues();
    update(index, { ...routes[index], url: value });
  };

  const handleAddRoute = () => {
    append({
      url: '',
      read: false,
      write: false,
      delete: false,
    });
  };

  const handleDeleteRoute = (index: number) => {
    remove(index);
  };

  const handleClose = () => {
    reset(cleanDefaultValues);
    onClose();
  };

  const validateRuleName = (value: string): string | undefined => {
    if (['Admin', 'User'].includes(value))
      return 'Admin or User is not a valid Role name';

    return roleNameList.includes(value as RouteList)
      ? !defaultValues?.roleName
        ? 'Role name should be unique'
        : undefined
      : undefined;
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-new-role'
    >
      <Container
        sx={{
          top: '100px',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            borderRadius: '10px',
            backgroundColor: 'white',
            padding: '20px',
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name='roleName'
              control={control}
              rules={{
                required: { value: true, message: 'Role name is required' },
                validate: validateRuleName,
              }}
              render={({ field }) => {
                return (
                  <TextField
                    {...field}
                    error={!!errors.roleName}
                    name='roleName'
                    disabled={!!defaultValues?.roleName}
                    variant='outlined'
                    label='Role Name'
                    value={field.value}
                    onChange={field.onChange}
                    helperText={errors.roleName?.message}
                    fullWidth
                  />
                );
              }}
            />
            {fields.map((field, index) => (
              <Box
                key={field.id}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '20px 0px 0px 20px',
                  alignItems: 'center',
                }}
              >
                <Controller
                  name={`routes.${index}.url`}
                  control={control}
                  rules={{
                    required: { value: true, message: 'Route is required' },
                  }}
                  render={({ field }) => {
                    return (
                      <FormControl required sx={{ m: 1, width: 420 }}>
                        <InputLabel id='role-name-label'>Url</InputLabel>
                        <Select
                          error={!!errors.routes?.[index]?.url}
                          labelId='role-name-label'
                          label='Url*'
                          {...field}
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e);
                            updateFields(index, e.target.value as RouteList);
                          }}
                        >
                          {routes || field.value
                            ? [...new Set([field.value, ...routes])]
                                .filter((r) => r !== '')
                                .map((route) => (
                                  <MenuItem key={route} value={route}>
                                    {route}
                                  </MenuItem>
                                ))
                            : null}
                        </Select>
                        <FormHelperText error>
                          {errors.routes?.[index]?.url?.message}
                        </FormHelperText>
                      </FormControl>
                    );
                  }}
                />
                <Controller
                  name={`routes.${index}.read`}
                  control={control}
                  render={({ field }) => {
                    return (
                      <FormControlLabel
                        {...field}
                        name={`routes.${index}.read`}
                        value={true}
                        checked={!!field.value}
                        control={<Checkbox />}
                        label='Read'
                        labelPlacement='start'
                      />
                    );
                  }}
                />
                <Controller
                  name={`routes.${index}.write`}
                  control={control}
                  render={({ field }) => {
                    return (
                      <FormControlLabel
                        {...field}
                        value={true}
                        checked={!!field.value}
                        control={<Checkbox />}
                        label='Write'
                        labelPlacement='start'
                      />
                    );
                  }}
                />
                <Controller
                  name={`routes.${index}.delete`}
                  control={control}
                  render={({ field }) => {
                    return (
                      <FormControlLabel
                        {...field}
                        value={true}
                        checked={!!field.value}
                        control={<Checkbox />}
                        label='Delete'
                        labelPlacement='start'
                      />
                    );
                  }}
                />
                <IconButton
                  sx={{ visibility: fields.length > 1 ? 'visible' : 'hidden' }}
                  onClick={() => {
                    handleDeleteRoute(index);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '20px',
              }}
            >
              <IconButton
                onClick={handleAddRoute}
                disabled={disableAddRouteButton}
              >
                <AddCircleIcon />
              </IconButton>
              <Button type='submit' color='primary' variant='contained'>
                Save
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </Modal>
  );
};

export default roleForm;
