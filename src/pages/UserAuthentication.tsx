import { ChangeEvent, useState } from "react";
import { TextInput, Button } from "flowbite-react";
import { useAuth } from "../Context/AuthContext";
import Loader from "../components/Loader";

type FormData = {
  email: string;
  password: string;
  username: string;
};

const UserAuthentication = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    username: "",
  });

  const { user, loading, error, signUp, signIn, signOut } = useAuth();
  const [isLogin, setIsLogin] = useState(false);
  {
    console.log(user);
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      await signIn(formData.email, formData.password);
    } else {
      await signUp(formData.email, formData.password, formData.username);
    }
  };

  return (
    <div className="w-dvw h-dvh bg-[#10141c] flex justify-center items-center">
      <form className="w-2/3 p-10 flex flex-col gap-5 rounded-lg bg-gray-800 select-none max-[500px]:w-full mx-2" onSubmit={handleSubmit}>
        <h1 className="text-white text-3xl text-center">{isLogin ? "Login" : "Sign Up"}</h1>

        {/*Error */}
        {error && <p className="text-red-500">{error}</p>}

        {/*Loading */}
        {loading && <Loader textDark={false} />}

        {/*Render component */}
        {!error && !loading && (
          <>
            <div className="text-white w-full">
              <label htmlFor="email">E-mail</label>
              <TextInput type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="text-white w-full">
              <label htmlFor="password">Password</label>
              <TextInput type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>

            {!isLogin && (
              <div className="text-white w-full">
                <label htmlFor="username">Username</label>
                <TextInput type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
              </div>
            )}

            <div className="w-fit mx-auto text-white flex flex-col gap-2 items-center">
              <Button type="submit" className="cursor-pointer">
                {isLogin ? "Login" : "Register"}
              </Button>
              <p className="text-sm">
                <span className="cursor-pointer text-[#8394b6] hover:text-[#23478e]" onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? "Switch to Sign Up" : "Switch to Login"}
                </span>
              </p>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default UserAuthentication;
