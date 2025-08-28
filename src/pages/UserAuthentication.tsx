import { useState } from "react";
import { TextInput, Button } from "flowbite-react";
import Error from "../components/Error";

const UserAuthentication = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="w-dvw h-dvh bg-[#10141c]">
      <form
        className="select-none w-2/3 p-15 flex flex-col gap-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-800"
      >
        <h1 className="text-white text-3xl text-center">Sign up</h1>

        <div className="text-white w-full">
          <label htmlFor="email">E-mail</label>
          <TextInput type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div className="text-white w-full">
          <label htmlFor="password">Password</label>
          <TextInput type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        {error && <Error errorMessage={error} />}

        <div className="w-fit mx-auto text-white flex gap-2 flex-col items-center">
          <Button type="submit" disabled={loading} className="cursor-pointer">
            Register!
          </Button>
          <p className="text-sm">
            Or, <span className="cursor-pointer text-[#8394b6] hover:text-[#23478e] ">sign in</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default UserAuthentication;
