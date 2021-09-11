import styled from "styled-components";

const Styles = styled.div`
  width: 100%;
  height: 100%;
  display: flex; 
  justify-content: center;
  align-items: center;

  img {
  display: block;
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
`;

const Avatar = props => {
  return (
    <Styles>
      <img
        src={props.image}
        alt={props.alt}
      />
    </Styles>
  );
};

export default Avatar;