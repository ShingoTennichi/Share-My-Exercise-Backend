export type SignUpInfo = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type SignInInfo = {
  email: string;
  password: string;
};

export type Activity = {
  authorId: number;
  activityId: number;
  startedAt: Date;
  finishedAt: Date;
  duration: number;
};

export type NewPost = {
  authorId: number;
  imgUrl: string;
  text: string;
};

export type UserId = { id: number };

export type UpdateLIKE = {
  id: number;
  like: number;
};
