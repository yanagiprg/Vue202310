export type AuthUser = {
  uid: string;
  email: string;
  password: string;
  displayName: string;
  photoURL: string | null;
};
export type Article = {
  id: string;
  title: string;
  content: string;
  image: File | null;
  imageUrl: string;
  userId: string;
  userName: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: Tag[];
};
export type Comment = {
  id: string;
  content: string;
  userId: string;
  userName: string;
  createdAt: Date;
};
export type Tag = {
  id: string;
  name: string;
  posts: Article[];
};
export type ArticleTag = {
  id: string;
  articleId: string;
  tagId: string;
};
// export type User = {
//   id: string;
//   email: string;
//   displayName: string;
//   // role: "admin" | "member";
//   createdAt: Date;
//   updatedAt: Date;
// };
