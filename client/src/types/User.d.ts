interface IUser {
  oauthEmail: string;
  address: string;
  image: string;
}

interface IAuthInfo extends IUser {
  isLoggedin: boolean;
}

interface IToken {
  jwtToken: string;
  refreshToken: string;
}

interface ISignUp extends IToken {
  address: string;
}

export { IUser, IAuthInfo, IToken, ISignUp };
