export enum Role {
  STANDARD = "STANDARD",
  PROGRAMMER = "PROGRAMMER",
  ADMIN = "ROLE_ADMIN",
}

export interface ProfileExists {
  exists: boolean;
  profileId: number;
}
