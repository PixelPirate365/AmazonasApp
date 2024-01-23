import { useState } from "react";

const SignInPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/api/v1/user/signin", {
      name: name,
      email: email,
      password: password,
    });
  };
  return <div>SignInPage</div>;
};

export default SignInPage;
