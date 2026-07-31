export const UserRolesEnum = {
  ADMIN: 'admin',
  USER: 'user'
} as const;

export type UserRole = (typeof UserRolesEnum)[keyof typeof UserRolesEnum];