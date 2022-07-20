import { useAuth } from "@/contexts/auth";
import { FormEvent, useState } from "react";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    login(email, password).catch((error) => {
      alert(error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>email</label>
        <input
          type='email'
          id='email'
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      <div>
        <label>password</label>
        <input
          type='password'
          id='password'
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div>
        <button type='submit'>Login</button>
      </div>
    </form>
  );
};

export default Login;
