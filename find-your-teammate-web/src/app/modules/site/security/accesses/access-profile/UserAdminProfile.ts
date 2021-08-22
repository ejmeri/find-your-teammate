import { ProfilePermissions } from './profile-permissions';

export class UserAdminAdminProfile {
  id: string;
  name: string;
  active: boolean;
  permissions: ProfilePermissions = new ProfilePermissions();

  constructor() {
    console.log(this);
  }
}
