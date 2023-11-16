import Form from "../components/Form";
const Login = () => {
  return (
    <div>
      <div className="h-20 flex justify-center items-center">
        <h2
          className="uppercase block md:text-3xl
         font-bold"
        >
          Friendsgram
        </h2>
      </div>
      <div>
        <Form />
      </div>
    </div>
  );
};

export default Login;
