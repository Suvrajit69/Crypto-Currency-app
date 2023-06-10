import React, {useEffect, useState} from 'react'
import  axios  from "axios";
import {server} from '../main'
import { Container, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import Loader from './Loader';
import ErrorComponent from './ErrorComponent';

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchExchanges = async()=>{
    try {
        const {data} = await axios.get(`${server}/exchanges`)
        setExchanges(data)
        // console.log(data)
        setLoading(false)
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    fetchExchanges()
  }, [])
  if(error) return <ErrorComponent message='error while fetching exchanges'/>
  return (
    <Container maxW='container.xl'>
      {loading ? <Loader/> : 
      <HStack wrap={'wrap'} spacing='4' justifyContent='Center'>
         {exchanges.map((ex)=>(
          <ExchangeCard
           key={ex.id}
           name={ex.name}
           image={ex.image}
           rank={ex.trust_score_rank}
           url={ex.url}
          />
         ))}
      </HStack>}
    </Container>
  )
}

const ExchangeCard =({name, image, rank, url})=>{
  return <a href={url} target='blank'>
    <VStack w='52' shadow={'lg'} p='8' borderRadius={'lg'} transition='all 0.3s'
    m={'4'} css={{'&:hover':{
      transform:'scale(1.1)'
    }}}>
      <img src={image} alt="Exchage" w='10' h='10' />
     <Heading size='md' noOfLines={1}>
       {rank}
     </Heading>
     <Text noOfLines={1}>{name}</Text>
    </VStack>
  </a>
}



export default Exchanges