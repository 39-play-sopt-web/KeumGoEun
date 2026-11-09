export type AuthorizationCodeResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  data: {
    authorizationCode: string;
  };
};