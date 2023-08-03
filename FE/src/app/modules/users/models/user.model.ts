export interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
  permissions: { is_admin: boolean; is_super_admin: boolean };
}
