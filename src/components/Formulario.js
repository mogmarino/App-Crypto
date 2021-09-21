import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled'
import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios'
import Error from './Error';
import Proptypes from 'prop-types'

const Boton = styled.input`
    font-size: 20px;
    font-weight: bold;
    padding: 10px;
    margin-top: 20px;
    background-color: #66A2FE;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background-color .3s ease;

    &:hover{
        background-color: #326ac0;
        cursor: pointer;
    }
`

const Formulario = ({guardarMoneda, guardarCripto}) => {

    // state del listado de criptomonedas
    const [listacripto,guardarCriptomonedas] = useState([])

    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'GBP', nombre: 'Libra Esterlina'}
    ]

    // state para el error
    const [error,guardarError] = useState(false)

    // utilizar useMoneda
    const [moneda,SelectMoneda] = useMoneda('Elige tu moneda','',MONEDAS)

    // utilizar criptomoneda
    const [cripto,SelectCripto] = useCriptomoneda('Elige tu Criptomoneda','',listacripto)

    // Ejecutar llamado a la API
    useEffect(() => {
        const consultarAPI = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
        
            const resultado = await axios.get(url)

            guardarCriptomonedas(resultado.data.Data)
        }

        consultarAPI()
    },[])

    // cuando el usuario hace submit
    const cotizarMoneda = e => {
        e.preventDefault()

        // validar los select
        if (moneda === '' || cripto === '') {
            guardarError(true)
            return
        }

        // pasar los datos al componente principal
        guardarError(false)
        guardarMoneda(moneda)
        guardarCripto(cripto)
    }

    return (  
        <form
            onSubmit={cotizarMoneda}
        >
            {error ? <Error mensaje='Todos los campos son obligatorios'/>: null}
            <SelectMoneda />

            <SelectCripto />

            <Boton 
                type='submit'
                value='Calcular'
            />
        </form>
    );
}

Formulario.propTypes = {
    guardarMoneda: Proptypes.func.isRequired,
    guardarCripto: Proptypes.func.isRequired
}
 
export default Formulario;