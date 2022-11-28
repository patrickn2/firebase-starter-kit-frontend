import {
  BanUnbanUserParams,
  BanUnbanUserResponse,
  BaseResponse,
  FetchUsersParams,
  FetchUsersResponse,
  SwitchUserRoleParams,
  SwitchUserRoleResponse,
} from 'redux/slices/users';

export const fetchUsers = async ({
  perPage,
  page,
  tokenId,
}: FetchUsersParams & { tokenId: string }): Promise<FetchUsersResponse> => {
  const baseResponse = {
    status: false,
  } as FetchUsersResponse;

  const url = process.env.NEXT_PUBLIC_FUNCTIONS_PATH + 'fetchUsers';

  const body = {
    page: page ?? 1,
    perPage: perPage ?? 50,
  };

  const options: RequestInit = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: 'Bearer ' + tokenId,
    },
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(url, options);
    const users = (await response.json()) as FetchUsersResponse;

    if (users.status === true) return { ...users };
    throw users.error;
  } catch (error) {
    return { ...baseResponse, error: (error as Error).message };
  }
};

export const switchUserRole = async ({
  userId,
  roleName,
  tokenId,
}: SwitchUserRoleParams & {
  tokenId: string;
}): Promise<SwitchUserRoleResponse> => {
  const baseResponse = {
    status: false,
  } as BaseResponse;

  const url = process.env.NEXT_PUBLIC_FUNCTIONS_PATH + 'switchUserRole';

  const body = {
    userId,
    roleName,
  };

  const options: RequestInit = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: 'Bearer ' + tokenId,
    },
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(url, options);
    const status = (await response.json()) as BaseResponse;
    if (status.status) return { ...baseResponse, userId, roleName };
    throw status.error;
  } catch (error) {
    return { ...baseResponse, error: (error as Error).message };
  }
};

export const banUnbanUser = async ({
  userId,
  operation,
  tokenId,
}: BanUnbanUserParams & {
  tokenId: string;
}): Promise<BanUnbanUserResponse> => {
  const baseResponse = {
    status: false,
  } as BaseResponse;

  const url = process.env.NEXT_PUBLIC_FUNCTIONS_PATH + 'banUnbanUser';

  const body = {
    userId,
    operation,
  };

  const options: RequestInit = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: 'Bearer ' + tokenId,
    },
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(url, options);
    const status = (await response.json()) as BaseResponse;
    if (status.status) return { ...baseResponse, userId, operation };
    throw status.error;
  } catch (error) {
    return { ...baseResponse, error: (error as Error).message };
  }
};
