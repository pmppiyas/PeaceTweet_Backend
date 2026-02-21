export interface CreateUserPayload {
  username: string;
  password: string;
  profile?: {
    contactInfo: string;
    firstName: string;
    lastName?: string;
    profilePicture?: string;
    bio?: string;
    address?: string;
    workAt?: string;
    role?: string;
    website?: string;
    birthday?: Date;
  };
}
