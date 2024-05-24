interface IResetPasswordParams {
  verificationId: string;
  type: string;
  phoneNumber: string;
}

interface ISignUpParams {
  phoneNumber: string;
  type: string;
  user: User;
}

interface IVerificationParams {
  phoneNumber: string;
  type: string;
}

export type AppStackParams = {
  Home: {};
  SignIn: undefined;
  SignUp: ISignUpParams;
  ResetPassword: IResetPasswordParams;
  Verification: IVerificationParams;
  App: undefined;
  NotFound: undefined;
  ChangePassword: any;
};
