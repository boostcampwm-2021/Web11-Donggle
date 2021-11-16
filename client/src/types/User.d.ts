interface IUser {
  oauth_email: string;
  address: string;
  image: string;
}

interface IUserInfo extends IUser {
  jwtToken: string;
  oauthEmail: string;
  address: string;
  image: string;
}

interface IAuthInfo extends IUser {
  isLoggedin: boolean;
}

export { IUserInfo, IAuthInfo };
