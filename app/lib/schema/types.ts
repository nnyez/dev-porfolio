export enum Role {
  STANDARD = "STANDARD",
  PROGRAMMER = "PROGRAMMER",
  ADMIN = "ADMIN",
}

export interface ProfileExists {
  exists: boolean;
  profileId: number;
}
