export enum Role {
  STANDARD = "ROLE_STANDARD",
  PROGRAMMER = "ROLE_PROGRAMMER",
  ADMIN = "ROLE_ADMIN",
}

export interface ProfileExists {
  exists: boolean;
  profileId: number;
}
