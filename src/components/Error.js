import React from 'react';
import styled from '@emotion/styled';
import Proptypes from 'prop-types'


const MensajeError = styled.p`
    font-size: 30px;
    font-family: 'Bebas Neue', cursive;
    font-weight: bold;
    color: #fff;
    padding: 1rem;
    text-align: center;
    text-transform: uppercase;
    background-color: #b7322c;
`

const Error = ({mensaje}) => {
    return ( 
        <MensajeError>{mensaje}</MensajeError>
     );
}

Error.propTypes = {
    mensaje: Proptypes.string.isRequired
}
 
export default Error;