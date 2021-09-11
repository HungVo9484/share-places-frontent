import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Avatar from '../../shared/components/UI/Avatar';
import Card from '../../shared/components/UI/Card';

const Styles = styled.li`
  margin: 1rem;
  width: calc(45% - 2rem);
  min-width: 17.5rem;
  .content {
    padding: 0;
  }
  .image {
    width: 4rem;
    height: 4rem;
    margin-right: 1rem;
  }

  .info h2 {
    font-size: 1.5rem;
    margin: 0 0 0.5rem 0;
    font-weight: normal;
    color: #ffd900;
  }

  &:hover h2,
  &:active h2,
  &:hover h3,
  &:active h3 {
    color: #292929;
  }

  .info h3 {
    margin: 0;
  }
`;

const LinkStyles = styled(Link)`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  text-decoration: none;
  padding: 1rem;
  color: white;
  background: #292929;

  &:hover,
  &:active {
    background: #ffd900;
  }
`;

const UserItem = (props) => {
  const { id, name, image, placeCount } = props;

  return (
    <Styles>
      <Card className='content'>
        <LinkStyles to={`/${id}/place`}>
          <div className='image'>
            <Avatar image={image} alt={name} />
          </div>
          <div className='info'>
            <h2>{name}</h2>
            <h3>
              {placeCount} {placeCount === 1 ? 'Place' : 'Places'}
            </h3>
          </div>
        </LinkStyles>
      </Card>
    </Styles>
  );
};

export default UserItem;
