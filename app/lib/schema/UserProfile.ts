import { Technology } from "./Technology";
import { UserAuth } from "./UserAuth";

export interface UserProfile {
  id: number;
  photoUrl?: string;
  phoneNumber?: string;
  title?: string;
  bio?: string;
  skills?: Technology[];
  experienceYears?: number;
  auth: UserAuth;
}
