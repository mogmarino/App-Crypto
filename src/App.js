import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled'
import imagen from './cryptomonedas.png'
import Formulario from './components/Formulario';
import axios from 'axios';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2,1fr);
    column-gap: 2rem;
  }
`

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after{
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`

function App() {

  const [moneda,guardarMoneda] = useState('')
  const [cripto,guardarCripto] = useState('')
  const [resultado,guardarResultado] = useState({})
  const [cargando,guardarCargando] = useState(false)

  useEffect(()=>{

    const cotizarCripto = async () => {

      // evitamos la ejecucion por primera vez
      if (moneda === '') return

      // consultar la API para obtener la cotizacion
      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cripto}&tsyms=${moneda}`
        
      const resultado = await axios.get(url)

      // mostrar el spinner
      guardarCargando(true)

      // ocultar el spinner y mostrar el resultado
      setTimeout(()=>{
        // cambiar el estado de cargando
        guardarCargando(false)
        // guardar cotizacion
        guardarResultado(resultado.data.DISPLAY[cripto][moneda])
      },3000)

    }

    cotizarCripto()
   
  },[moneda,cripto])

  const componente = cargando ? <Spinner /> :   <Cotizacion resultado={resultado}/>

  return (
    <Contenedor>
      <div>
        <Imagen 
          src={imagen}
          alt='Imagen cripto'
        />
      </div>
      <div>
        <Heading>
          Cotiza Criptomonedas al Instante
        </Heading>
        <Formulario 
          guardarMoneda={guardarMoneda}
          guardarCripto={guardarCripto}
        />
        {componente}
      </div>
    </Contenedor>
  );
}

export default App;
