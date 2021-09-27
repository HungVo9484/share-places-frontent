import { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UI/ErrorModal';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';

const UserPlaces = () => {
  const { isLoading, error, sendRequest, clearError } =
    useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState();
  const userId = useParams().userId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
        );
        setLoadedPlaces(resData);
      } catch (err) {
        setLoadedPlaces([])
      }
    };
    fetchData();
  }, [sendRequest, userId]);

  const onDeletePlace = (placeId) => {
    setLoadedPlaces(prevPlaces => prevPlaces.filter(p => p.id !== placeId))
  }

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className='center'>
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={onDeletePlace} />}
    </Fragment>
  );
};

export default UserPlaces;
