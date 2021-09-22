import styled from 'styled-components';
import Button from '../../shared/components/FormElements/Button';

import Card from '../../shared/components/UI/Card';
import PlaceItem from './PlaceItem';

const Styles = styled.div`
  .place-list {
    list-style: none;
    margin: 1rem auto;
    padding: 0;
    width: 90%;
    max-width: 40rem;
  }
`;
const PlaceList = (props) => {
  const { items } = props;

  if (items.length === 0) {
    return (
      <Styles>
        <div className='place-list center'>
          <Card>
            <h2>No place found. Maybe create one?</h2>
            <Button to='/places/new'>Share Place</Button >
          </Card>
        </div>
      </Styles>
    );
  }

  return (
    <Styles>
      <ul className='place-list'>
        {items.map((place) => (
          <PlaceItem
            key={place.id}
            id={place.id}
            image={place.imageUrl}
            title={place.title}
            description={place.description}
            address={place.address}
            creatorId={place.creator}
            coordinates={place.location}
          />
        ))}
      </ul>
    </Styles>
  );
};

export default PlaceList;
