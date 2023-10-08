export type Article = {
  id: string;
  title: string;
  content: string;
  userId: string;
  userName: string;
  createdAt: Date;
  updatedAt: Date;
  categories?: string[];
  tags?: string[];
};
export type AuthUser = {
  id?: string;
  email?: string;
  displayName?: string;
};
