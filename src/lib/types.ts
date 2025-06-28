type CSSDefaults = 'initial' | 'inherit';

export type CSSUnit = 'px' | '%' | 'vw' | 'vh' | 'pt' | 'pc';

export type Size = `${number}${CSSUnit}` | `${number}` | CSSDefaults;

export type LoginInputs = {
  username: string;
  password: string;
};

export type FieldInputs = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type ContainerSizing =
  | `${number}${CSSUnit}`
  | 'fit-content'
  | CSSDefaults;

export type Direction =
  | 'column'
  | 'column-reverse'
  | 'row'
  | 'row-reverse'
  | CSSDefaults;

export type FJustify =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'start'
  | 'end'
  | 'left'
  | 'right'
  | CSSDefaults;

export type FAlign =
  | 'normal'
  | 'stretch'
  | 'center'
  | 'start'
  | 'end'
  | 'flex-start'
  | 'flex-end'
  | 'self-start'
  | 'self-end'
  | 'baseline'
  | 'first baseline'
  | 'last baseline'
  | CSSDefaults;

export type Account = {
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string | null;
  access_token: string | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string | null;
  id_token: string | null;
  session_state: string | null;
  user?: User;
};

export type User = {
  id: string;
  username: string;
  email: string;
  hashedPwd: string | null;
  accounts: Array<Account> | [];
  sessions: Array<Session> | [];
};

export type Session = {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
  createdAt: Date;
  updatedAt: Date;
  user?: User;
};

export type BannedIP = {
  id: number;
  userId: string;
  ip: string;
  reason: string | null;
  bannedAt: Date;
  expiresAt: Date | null;
  users?: Array<User> | [];
};
