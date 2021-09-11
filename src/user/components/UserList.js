import styled from 'styled-components';

import UserItem from './UserItem';
import Card from '../../shared/components/UI/Card';

const UnList = styled.ul`
  list-style: none;
  margin: 0 auto;
  padding: 0;
  width: 90%;
  max-width: 50rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const UserList = (props) => {
  const { items } = props;

  if (items.length === 0) {
    return (
      <div className='center'>
        <Card>
          <h2>No users Found</h2>
        </Card>
      </div>
    );
  }

  return (
    <UnList>
      {items.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount={user.places}
        />
      ))}
    </UnList>
  );
};

export default UserList;
