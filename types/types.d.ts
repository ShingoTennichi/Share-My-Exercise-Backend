export type SignUpInfo = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  deletedAt: Date?;
};

export type SignInInfo = {
  email: string;
  password: string;
};

export type Follow = {
  followeeId: number;
  followingId: number;
  status: boolean;
  deletedAt: Date?;
};

export type Post = {
  authorId: number;
  imgUrl: string;
  like: number;
  text: string;
  deletedAt: Date?;
};

export type Comment = {
  authorId: number;
  postId: number;
  text: string;
  deletedAt: Date?;
};

export type UserActivity = {
  authorId: number;
  activityId: number;
  startedAt: Date;
  finishedAt: Date;
  breakInMin: number;
  deletedAt: Date?;
};

export type Activity = {
  authorId: number;
  activityId: number;
  name: string;
  startedAt: Date;
  finishedAt: Date;
  duration: number;
};
