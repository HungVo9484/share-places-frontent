import { Fragment, useContext, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Button from '../../shared/components/FormElements/Button';
import Input from '../../shared/components/FormElements/Input';
import FormStyle from '../../shared/components/UI/FormStyle';
import Card from '../../shared/components/UI/Card';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from '../../shared/utils/validators';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';
import ErrorModal from '../../shared/components/UI/ErrorModal';
import { AuthContext } from '../../shared/context/auth-context';

const UpdatePlace = () => {
  const auth = useContext(AuthContext)
  const { isLoading, error, sendRequest, clearError } =
    useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState();
  const placeId = useParams().placeId;
  const history = useHistory();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resData = await sendRequest(
          `http://localhost:5000/api/places/${placeId}`
        );
        setFormData(
          {
            title: {
              value: resData.title,
              isValid: true,
            },
            description: {
              value: resData.description,
              isValid: true,
            },
          },
          true
        );
        setLoadedPlace(resData);
      } catch (err) {}
    };
    fetchData();
  }, [sendRequest, placeId, setFormData]);

  if (isLoading) {
    return (
      <div className='center'>
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPlace && !error) {
    return (
      <div className='center'>
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      await sendRequest(
        `http://localhost:5000/api/places/${placeId}`,
        'PATCH',
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          'Content-Type': 'application/json',
           Authorization: 'Bearer ' + auth.token
        }
      );
      history.goBack();
    } catch (err) {}
  };


  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {loadedPlace && (
        <FormStyle onSubmit={placeUpdateSubmitHandler}>
          <Input
            id='title'
            element='input'
            type='text'
            label='Title'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid title.'
            onInput={inputHandler}
            initialValue={formState.inputs.title.value}
            initialValid={formState.inputs.title.isValid}
          />
          <Input
            id='description'
            element='textarea'
            label='Description'
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText='Please enter a valid description (at least 5 characters).'
            onInput={inputHandler}
            initialValue={formState.inputs.description.value}
            initialValid={formState.inputs.description.isValid}
          />
          <Button type='submit' disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </FormStyle>
      )}
    </Fragment>
  );
};

export default UpdatePlace;
