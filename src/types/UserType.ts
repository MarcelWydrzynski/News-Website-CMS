type User = {
  email: string;
  password: string;
  options: {
    data: {
      username: string;
      articles: number[];
    };
  };
};

export default User;
