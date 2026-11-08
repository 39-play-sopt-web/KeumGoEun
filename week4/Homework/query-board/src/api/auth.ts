import { apiClient } from './client';
import type { AuthorizationCodeResponse } from '../types/auth';

export async function getAuthorizationCode(part: string) {
  const response = await apiClient.post<AuthorizationCodeResponse>(
    "/api/v1/members/authorization-code",
    { part: part },
  );

  if (!response.data.isSuccess) {
    throw new Error(response.data.message);
  }

  return response.data.data.authorizationCode;
}
