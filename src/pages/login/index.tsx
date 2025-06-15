import { AuthPage } from "@refinedev/antd";
import { authCredentials } from "../../providers";

export const Login = () => {
  return (
    <AuthPage
      type="login"
      title={
        <h2>CRM Project</h2>
      }
      formProps={{
        initialValues: authCredentials,
      }}
      
    />
  );
};
