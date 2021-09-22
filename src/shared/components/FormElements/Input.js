import { useReducer, useEffect } from 'react';
import styled from 'styled-components';

import { validate } from '../../utils/validators';

const InputStyle = styled.div`
  .form-control {
    margin: 1rem 0;
  }

  .form-control label,
  .form-control input,
  .form-control textarea {
    display: block;
  }

  .form-control label {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .form-control input,
  .form-control textarea {
    width: 100%;
    font: inherit;
    border: 1px solid #ccc;
    background: #f8f8f8;
    padding: 0.15rem 0.25rem;
  }

  .form-control input:focus,
  .form-control textarea:focus {
    outline: none;
    background: #ebebeb;
    border-color: #510077;
  }

  .form-control--invalid label,
  .form-control--invalid p {
    color: red;
  }

  .form-control--invalid input,
  .form-control--invalid textarea {
    border-color: red;
    background: #ffd1d1;
  }
`;

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case 'TOUCH':
      return {
        ...state,
        isTouch: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isValid: props.initialValid || false,
    isTouch: false,
  });

  const { onInput, id } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid)
  }, [onInput, id, isValid, value])

  const changeHandler = (event) => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH',
    });
  };

  const element =
    props.element === 'input' ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={value}
      ></textarea>
    );
  return (
    <InputStyle>
      <div
        className={`form-control ${
          !inputState.isValid &&
          inputState.isTouch &&
          'form-control--invalid'
        }`}
      >
        <label htmlFor={props.id}>{props.label}</label>
        {element}
        {!inputState.isValid && inputState.isTouch && (
          <p>{props.errorText}</p>
        )}
      </div>
    </InputStyle>
  );
};

export default Input;
