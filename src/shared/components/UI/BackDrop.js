import ReactDOM from 'react-dom';
import styled from 'styled-components';

const Styles = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  z-index: 10;
`;


const BackDrop = props => {
  return ReactDOM.createPortal(
    <Styles onClick={props.onClick}></Styles>,
    document.getElementById('backdrop-hook')
  );
};

export default BackDrop;