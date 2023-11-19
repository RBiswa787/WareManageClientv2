export interface UserSignInResponse{
    internalId: {},
      username: string,
      password: string  |null,
      role: string,
      verified: true,
      token: string
}