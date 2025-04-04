export interface User {
  _id: string;
  email: string;
  role: string;
  username: string;
  profile: {
    firstName: string;
    lastName: string;
    address: string;
    phone: string;
    photo: string;
  };
}
