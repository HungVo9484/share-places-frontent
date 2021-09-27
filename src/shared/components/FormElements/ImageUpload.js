import { useRef, useState } from 'react';
import styled from 'styled-components';

import Button from './Button';

const Styles = styled.div`
  margin: 1rem 0;
  .image-upload.center {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .image-upload__preview {
    width: 13rem;
    height: 13rem;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-bottom: 1rem;
  }

  .image-upload__preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImageUpload = (props) => {
  const filePickerRef = useRef();

  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const pickedHandler = (event) => {

    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length !== 0) {
      pickedFile = event.target.files[0];

      setIsValid(true);
      fileIsValid = true;

      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewUrl(fileReader.result);
      };
      fileReader.readAsDataURL(pickedFile);
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <Styles>
      <input
        ref={filePickerRef}
        id={props.id}
        type='file'
        style={{ display: 'none' }}
        accept='.jpg,.png,.jpeg'
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && 'center'}`}>
        <div className='image-upload__preview'>
          <img src={previewUrl} alt='Preview' />
        </div>
        <Button type='button' onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </Styles>
  );
};

export default ImageUpload;
