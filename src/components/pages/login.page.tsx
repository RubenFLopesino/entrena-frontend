import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useAuthenticatedContext from "../../hooks/useAuthenticatedContext/useAuthenticatedContext.hook";
import useLoginAttemptsTracker from "../../hooks/useLoginAttemptsTracker/useLoginAttemptsTracker.hook";
import { LoginService } from "../../services/login/login.service";
import { ButtonType } from "../atoms/button/button.atom";
import { InputType } from "../atoms/input/input.atom";
import Loader from "../atoms/loader/loader.atom";
import Form, { ControlType, FormInput } from "../templates/form/form.template";

export enum LoginFields {
  Email = "email",
  Password = "password",
}

interface LoginForm {
  [LoginFields.Email]: string;
  [LoginFields.Password]: string;
}

const Login = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);

  useAuthenticatedContext("/private-zone");

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<LoginForm>();

  const [setAttempts] = useLoginAttemptsTracker(getValues(LoginFields.Email));

  const inputs: FormInput<ControlType.FormGroup>[] = [
    {
      type: ControlType.FormGroup,
      props: {
        controlId: LoginFields.Email,
        name: LoginFields.Email,
        type: InputType.Email,
        placeholder: "Enter your email",
        label: "Email",
        invalidMessage: errors[LoginFields.Email]?.message ?? "",
        isInvalid: !!errors[LoginFields.Email],
        required: true,
        register: register,
        validation: {
          required: "Email is mandatory",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Email not valid",
          },
        },
      },
    },
    {
      type: ControlType.FormGroup,
      props: {
        controlId: LoginFields.Password,
        name: LoginFields.Password,
        type: InputType.Password,
        placeholder: "Enter your password",
        label: "Password",
        invalidMessage: errors[LoginFields.Password]?.message ?? "",
        isInvalid: !!errors[LoginFields.Password],
        required: true,
        register: register,
        validation: {
          required: "Password is mandatory",
        },
      },
    },
  ];

  const button: FormInput<ControlType.Button> = {
    type: ControlType.Button,
    props: {
      id: "some-id",
      text: "Button text",
      type: ButtonType.Submit,
    },
  };
  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        await LoginService.instance.login(
          data[LoginFields.Email],
          data[LoginFields.Password],
        );
      } catch (error: any) {
        setIsLoading(false);
        if (error.response.data.error === 401) {
          setAttempts();
        }
        alert(error.response.data.message);
      }
    }, 1000);
  };
  return (
    <div className="d-flex justify-content-center align-items-center flex-column vh-100 container">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Form
            id={"test-form"}
            inputs={[...inputs, button]}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
          />
          <p>
            Default user is <strong>"ruben@gmail.com"</strong> and{" "}
            <strong>"password"</strong>
          </p>
        </>
      )}
    </div>
  );
};

export default Login;
