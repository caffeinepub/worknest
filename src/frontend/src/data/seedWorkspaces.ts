import type { Workspace } from '@/backend';
import { Principal } from '@dfinity/principal';

const seedOwner = Principal.fromText('2vxsx-fae');

export const seedWorkspaces: Workspace[] = [
  {
    id: 1n,
    name: 'Cozy Home Office - Satellite',
    hourlyRate: 250n,
    location: 'Satellite, Ahmedabad, Gujarat',
    amenities: ['WiFi', 'Desk', 'Tea/Coffee'],
    photos: [
      '/assets/generated/worknest-photo-01.dim_1200x800.png',
      '/assets/generated/worknest-photo-04.dim_1200x800.png',
    ],
    owner: seedOwner,
  },
  {
    id: 2n,
    name: 'Private Cabin - Vastrapur',
    hourlyRate: 350n,
    location: 'Vastrapur, Ahmedabad, Gujarat',
    amenities: ['WiFi', 'Desk', 'Parking', 'Tea/Coffee'],
    photos: [
      '/assets/generated/worknest-photo-02.dim_1200x800.png',
      '/assets/generated/worknest-photo-05.dim_1200x800.png',
    ],
    owner: seedOwner,
  },
  {
    id: 3n,
    name: 'Meeting Room - SG Highway',
    hourlyRate: 500n,
    location: 'SG Highway, Ahmedabad, Gujarat',
    amenities: ['WiFi', 'Desk', 'Parking'],
    photos: [
      '/assets/generated/worknest-photo-03.dim_1200x800.png',
    ],
    owner: seedOwner,
  },
  {
    id: 4n,
    name: 'Quiet Study Space - Koregaon Park',
    hourlyRate: 200n,
    location: 'Koregaon Park, Pune, Maharashtra',
    amenities: ['WiFi', 'Desk', 'Tea/Coffee'],
    photos: [
      '/assets/generated/worknest-photo-04.dim_1200x800.png',
      '/assets/generated/worknest-photo-01.dim_1200x800.png',
    ],
    owner: seedOwner,
  },
  {
    id: 5n,
    name: 'Professional Office - Indiranagar',
    hourlyRate: 400n,
    location: 'Indiranagar, Bengaluru, Karnataka',
    amenities: ['WiFi', 'Desk', 'Parking', 'Tea/Coffee'],
    photos: [
      '/assets/generated/worknest-photo-05.dim_1200x800.png',
      '/assets/generated/worknest-photo-02.dim_1200x800.png',
    ],
    owner: seedOwner,
  },
  {
    id: 6n,
    name: 'Bright Workspace - Bandra',
    hourlyRate: 450n,
    location: 'Bandra West, Mumbai, Maharashtra',
    amenities: ['WiFi', 'Desk', 'Tea/Coffee'],
    photos: [
      '/assets/generated/worknest-photo-01.dim_1200x800.png',
      '/assets/generated/worknest-photo-03.dim_1200x800.png',
    ],
    owner: seedOwner,
  },
  {
    id: 7n,
    name: 'Compact Desk Space - Connaught Place',
    hourlyRate: 300n,
    location: 'Connaught Place, New Delhi',
    amenities: ['WiFi', 'Desk'],
    photos: [
      '/assets/generated/worknest-photo-02.dim_1200x800.png',
    ],
    owner: seedOwner,
  },
  {
    id: 8n,
    name: 'Garden View Office - C-Scheme',
    hourlyRate: 280n,
    location: 'C-Scheme, Jaipur, Rajasthan',
    amenities: ['WiFi', 'Desk', 'Parking', 'Tea/Coffee'],
    photos: [
      '/assets/generated/worknest-photo-04.dim_1200x800.png',
      '/assets/generated/worknest-photo-05.dim_1200x800.png',
    ],
    owner: seedOwner,
  },
];
