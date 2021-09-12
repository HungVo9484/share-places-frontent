import { Fragment } from 'react';
import ReactDom from 'react-dom';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';

import BackDrop from './BackDrop';

const Styles = styled.div`
  z-index: 100;
  position: fixed;
  top: 22vh;
  left: 10%;
  width: 80%;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  border-radius: 8px;
  .modal__header {
    width: 100%;
    padding: 1rem 0.5rem;
    background: #2a006e;
    color: white;
  }

  .modal__header h2 {
    margin: 0.5rem;
  }

  .modal__content {
    padding: 1rem 0.5rem;
  }

  .modal__footer {
    padding: 1rem 0.5rem;
  }

  @media (min-width: 768px) {
    .modal {
      left: calc(50% - 20rem);
      width: 40rem;
    }
  }

  .modal-enter {
    transform: translateY(-10rem);
    opacity: 0;
  }

  .modal-enter-active {
    transform: translateY(0);
    opacity: 1;
    transition: all 200ms;
  }

  .modal-exit {
    transform: translateY(0);
    opacity: 1;
  }

  .modal-exit-active {
    transform: translateY(-10rem);
    opacity: 0;
    transition: all 200ms;
  }
`;

const ModalOverlay = (props) => {
  const content = (
    <Styles className={props.className} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit
            ? props.onSubmit
            : (event) => event.preventDefault()
        }
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
      </form>
      <footer className={`modal__footer ${props.footerClass}`}>
        {props.footer}
      </footer>
    </Styles>
  );
  return ReactDom.createPortal(
    content,
    document.getElementById('modal-hook')
  );
};

const Modal = (props) => {
  return (
    <Fragment>
      {props.show && <BackDrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames='modal'
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </Fragment>
  );
};

export default Modal;
