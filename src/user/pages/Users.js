import { Fragment, useEffect, useState } from 'react';

import UserList from '../components/UserList';
import ErrorModal from '../../shared/components/UI/ErrorModal';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const User = () => {
  const { isLoading, error, sendRequest, clearError } =
    useHttpClient();
  const [loadedUser, setLoadedUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resData = await sendRequest(
          'http://localhost:5000/api/users'
        );
        setLoadedUser(resData);
      } catch (err) {}
    };
    fetchData();
  }, [sendRequest]);

  
  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUser && <UserList items={loadedUser} />}
    </Fragment>
  );
};

export default User;
