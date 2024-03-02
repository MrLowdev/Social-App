export type AuthStateType = {
  name?: string;
  email?: string;
  password?: string;
  username?: string;
  password_confirmation?: string;
};

export type AuthErrorType = {
  name?: string;
  email?: string;
  username?: string;
  password?: string;
};

export type LikeType = {
  post_id: string;
  toUserId: string;
  status: string;
};

export type PostErrorType = {
  content?: string;
  image?: string;
};

export type User = {
  id: string;
  name: string;
  username: string;
  email?: string;
  image?: string;
};
export type PostType = {
  id: string;
  user_id: string;
  content: string;
  image?: string;
  comment_count: number;
  like_count: null;
  created_at: string;
  user: User;
  Likes: Array<PostLikeType> | [];
};

export type PostLikeType = {
  id: string;
  post_id: string;
  user_id: string;
};

export type NotificationType = {
  id: string;
  user_id: string;
  toUser_id: string;
  content: string;
  created_at: string;
  user: User;
};

export type CommentType = {
  id: string;
  user_id: string;
  post_id: string;
  content: string;
  created_at: string;
  user: User;
};

export type ShowUserType = {
  name: string;
  id: string;
  email: string;
  username: string;
  image: string;
  Post: Array<PostType> | [];
  Comment: Array<CommentType> | [];
};
