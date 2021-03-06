import { useState, useContext } from 'react';
import styled from 'styled-components';

import Card from '../../shared/components/UI/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/form-hook';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/utils/validators';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UI/ErrorModal';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

const Styles = styled.div`
  .authentication__header {
    color: white;
    text-align: center;
  }

  .authentication {
    width: 90%;
    max-width: 25rem;
    margin: 7rem auto;
    text-align: center;
  }

  .authentication form {
    margin-bottom: 1rem;
  }
`;

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } =
    useHttpClient();

  const [formState, inputState, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false,
      },
      password: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid &&
          formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false,
          },
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();
    if (isLoginMode) {
      try {
        const resData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + '/users/login',
          'POST',
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { 'Content-Type': 'application/json' }
        );
        auth.login(resData.userId, resData.token);
      } catch (err) {}
    } else {
      try {
        const formData = new FormData();
        formData.append('email', formState.inputs.email.value);
        formData.append('name', formState.inputs.name.value);
        formData.append('password', formState.inputs.password.value);
        formData.append('image', formState.inputs.image.value);
        const resData = await sendRequest(
          'http://localhost:5000/api/users/signup',
          'POST',
          formData
        );
        auth.login(resData.userId, resData.token);
      } catch (err) {}
    }
  };

  return (
    <Styles>
      <ErrorModal error={error} onClear={clearError} />
      <Card className='authentication'>
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              id='name'
              element='input'
              type='text'
              label='Your Name'
              validators={[VALIDATOR_REQUIRE()]}
              errorText='Please enter a name.'
              onInput={inputState}
            />
          )}
          {!isLoginMode && (
            <ImageUpload
              id='image'
              onInput={inputState}
              errorText='Please add an image.'
              center
            />
          )}
          <Input
            id='email'
            element='input'
            type='email'
            label='E-Mail'
            validators={[VALIDATOR_EMAIL()]}
            errorText='Please enter a valid email address.'
            onInput={inputState}
          />
          <Input
            id='password'
            element='input'
            type='password'
            label='Password'
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText='Please enter a valid password, at least 5 characters.'
            onInput={inputState}
          />
          <Button type='submit' disabled={!formState.isValid}>
            {isLoginMode ? 'LOGIN' : 'SIGNUP'}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
        </Button>
      </Card>
    </Styles>
  );
};

export default Auth;
