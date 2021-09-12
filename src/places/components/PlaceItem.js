import { useState, Fragment } from 'react';
import styled from 'styled-components';

import Card from '../../shared/components/UI/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UI/Modal';
import Map from '../../shared/components/UI/Map';

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

  .modal-content {
    padding: 0;
  }

  .modal-actions {
    text-align: right;
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
  height: 15rem;
  width: 100%;
`;

const PlaceItem = (props) => {
  const {
    id,
    image,
    title,
    description,
    address,
    creatorId,
    coordinates,
  } = props;

  const [showMap, setShowMap] = useState(false);

  const openMapHandler = () => {
    setShowMap(true);
  };

  const closeMapHandler = () => {
    setShowMap(false);
  };

  return (
    <Fragment>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={address}
        contentClass='modal-content'
        footerClass='modal-actions'
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <MapContainer>
          <Map center={ coordinates } zoom={ 16 }/>
        </MapContainer>
      </Modal>
      <Styles>
        <Card className='content'>
          <div className='image'>
            <img src={image} alt={props.title} />
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
            <Button to={`/places/${id}`}>EDIT</Button>
            <Button danger>DELETE</Button>
          </div>
        </Card>
      </Styles>
    </Fragment>
  );
};

export default PlaceItem;
