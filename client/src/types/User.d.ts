interface IUser {
  oauth_email: string;
  address: string;
  image: string;
}

interface IUserInfo extends IUser {
  jwtToken: string;
  refreshToken: string;
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

export { IUserInfo, IAuthInfo, IToken, ISignUp };
