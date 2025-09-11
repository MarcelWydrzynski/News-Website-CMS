type User = {
  email: string;
  password: string;
  options: {
    data: {
      username: string;
      articles: number[];
      admin?: boolean;
    };
  };
};

export default User;
