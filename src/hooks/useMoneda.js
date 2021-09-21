import React, { useState, Fragment} from 'react';
import styled from '@emotion/styled'
import Proptypes from 'prop-types'

const Label = styled.label`
    font-family: 'Bebas Neue',cursive;
    color: #FFF;
    font-weight: bold;
    text-transform: uppercase;
    font-size: 2.4rem;
    margin-top: 2rem;
    display: block;
`

const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    -webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size: 1rem;
`

const useMoneda = (label,stateInicial,opciones) => {
   
    // state de nuestro custom hook
    const [state,actualizarState] = useState(stateInicial)

    const Seleccionar = () => (
        <Fragment>
            <Label>{label}</Label>
            <Select
                onChange={ e => actualizarState(e.target.value)}
                value={state}
            >
                <option value=''>- Seleccione -</option>
                {opciones.map(opcion => (
                    <option key={opcion.codigo} value={opcion.codigo}>{opcion.nombre}</option>
                ))}
            </Select>
        </Fragment>
    )

    // retornar state, interfaz y funcion que modifica el state
    return [state,Seleccionar,actualizarState]
}

useMoneda.propTypes = {
    label: Proptypes.string.isRequired,
    stateInicial: Proptypes.object.isRequired,
    opciones: Proptypes.array.isRequired
}
 
export default useMoneda;