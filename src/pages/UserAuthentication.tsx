import { ChangeEvent, useState } from "react";
import { TextInput, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { CiMail, CiUser } from "react-icons/ci";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

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
  const [passwordVisible, setPasswordVisible] = useState(false);

  const { loading, error, signUp, signIn, cleanError } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

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

  const handleTestLogin = (email: string, password: string) => {
    signIn(email, password);
  };

  return (
    <div className="w-dvw h-dvh bg-[#10141c] flex justify-center items-center">
      <form className="w-2/5 p-10 flex flex-col gap-5 rounded-lg bg-gray-800 select-none max-[1000px]:w-4/5 max-[600px]:w-5/5 mx-2" onSubmit={handleSubmit}>
        <h1 className="text-white text-3xl text-center">{isLogin ? "Login" : "Sign Up"}</h1>

        {/* Error */}
        {error && (
          <>
            <Error errorMessage={error}></Error>
            <Button className="w-fit mx-auto" onClick={cleanError}>
              Try again
            </Button>
          </>
        )}

        {/* Loading */}
        {loading && <Loader textDark={false} />}

        {/* Render form */}
        {!error && !loading && (
          <>
            {/* Email */}
            <div className="text-white w-full relative">
              <label htmlFor="email">E-mail</label>
              <TextInput type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="pr-10" />
              <span className="absolute right-3 top-9 text-gray-400">
                <CiMail size={20} />
              </span>
            </div>

            {/* Password */}
            <div className="text-white w-full relative">
              <label htmlFor="password">Password</label>
              <TextInput
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="pr-10"
              />
              <span className="absolute right-3 top-9 cursor-pointer text-gray-400 hover:text-white" onClick={() => setPasswordVisible((prev) => !prev)}>
                {passwordVisible ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </span>
            </div>

            {/* Username (only on Sign Up) */}
            {!isLogin && (
              <div className="text-white w-full relative">
                <label htmlFor="username">Username</label>
                <TextInput type="text" id="username" name="username" value={formData.username} onChange={handleChange} required className="pr-10" />
                <span className="absolute right-3 top-9 text-gray-400">
                  <CiUser size={20} />
                </span>
              </div>
            )}

            {/* Buttons */}
            <div className="w-fit mx-auto text-white flex flex-col gap-2 items-center">
              <div className="flex justify-center gap-2">
                {" "}
                <Button type="submit" className="cursor-pointer">
                  {isLogin ? "Login" : "Register"}
                </Button>
                {isLogin && (
                  <Button className="cursor-pointer" onClick={() => handleTestLogin("wydrzynski99@gmail.com", "asdasd123")}>
                    Test Login
                  </Button>
                )}
                <Link to={"/"}>
                  <Button className="cursor-pointer">Exit</Button>
                </Link>
              </div>

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
