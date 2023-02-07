import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('12345', 10),
    isAdmin: true,
    isJobSeeker: false,
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('12345', 10),
    isJobSeeker: false,
  },
  {
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: bcrypt.hashSync('12345', 10),
    isJobSeeker: true,
  },
];

export default users;
