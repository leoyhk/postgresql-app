type user = {
  id: number;
  username: string;
  email: string;
};

type todo = {
  id: number;
  userId: number;
  title: string;
  content: string;
};
