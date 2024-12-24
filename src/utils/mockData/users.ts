import { User } from './types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'ADMIN',
    status: 'ACTIVE',
    phone: '+212 6 12 34 56 78',
    parcels: ['1', '2', '3']
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'USER',
    status: 'ACTIVE',
    phone: '+212 6 87 65 43 21',
    parcels: ['4', '5']
  },
  {
    id: '3',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    role: 'USER',
    status: 'INACTIVE',
    phone: '+212 6 11 22 33 44',
    parcels: []
  },
  {
    id: '4',
    name: 'Bob Brown',
    email: 'bob@example.com',
    role: 'USER',
    status: 'ACTIVE',
    phone: '+212 6 55 66 77 88',
    parcels: ['6']
  },
  {
    id: '5',
    name: 'Charlie Davis',
    email: 'charlie@example.com',
    role: 'USER',
    status: 'ACTIVE',
    phone: '+212 6 99 88 77 66',
    parcels: ['7', '8']
  }
];
