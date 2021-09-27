import { useState, Fragment, useContext } from 'react';
import styled from 'styled-components';

import Card from '../../shared/components/UI/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UI/Modal';
import Map from '../../shared/components/UI/Map';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UI/ErrorModal';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';

const Styles = styled.li`
  margin: 1rem 0;

  .content {
    padding: 0;
  }

  .info {
    padding: 1rem;
    text-align: center;
  }

  .image {
    width: 100%;
    height: 12.5rem;
    margin-right: 1.5rem;
  }

  .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .info h2,
  .info h3,
  .info p {
    margin: 0 0 0.5rem 0;
  }

  .actions {
    padding: 1rem;
    text-align: center;
    border-top: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .actions Button,
  .actions a {
    margin: 0.5rem;
  }

  @media (min-width: 768px) {
    .image {
      height: 20rem;
    }
    .actions {
      flex-direction: row;
    }
  }
`;

const MapContainer = styled.div`
  height: 20rem;
  width: 100%;
`;

const PlaceItem = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } =
    useHttpClient();
  const {
    id,
    image,
    title,
    description,
    address,
    creatorId,
    coordinates,
    onDelete,
  } = props;

  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const openMapHandler = () => {
    setShowMap(true);
  };

  const closeMapHandler = () => {
    setShowMap(false);
  };

  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    try {
      await sendRequest(
        `http://localhost:5000/api/places/${id}`,
        'DELETE',
        {},
        {
          Authorization: 'Bearer ' + auth.token
        }
      );
      onDelete(id);
    } catch (err) {}
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={address}
        contentClass='modal-content'
        footerClass='modal-actions'
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <MapContainer>
          <Map center={coordinates} zoom={16} />
        </MapContainer>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header='Are you sure?'
        footerClass='modal-actions'
        footer={
          <Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this place? PLease note
          that it can't be undone thereafter.
        </p>
      </Modal>
      <Styles>
        <Card className='content'>
          {isLoading && <LoadingSpinner asOverlay />}
          <div className='image'>
            <img src={`http://localhost:5000/${image}`} alt={props.title} />
          </div>
          <div className='info'>
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className='actions'>
            <Button inverse onClick={openMapHandler}>
              VIEW ON MAP
            </Button>
            {auth.userId === creatorId && (
              <Button to={`/places/${id}`}>EDIT</Button>
            )}
            {auth.userId === creatorId && (
              <Button danger onClick={showDeleteWarningHandler}>
                DELETE
              </Button>
            )}
          </div>
        </Card>
      </Styles>
    </Fragment>
  );
};

export default PlaceItem;
