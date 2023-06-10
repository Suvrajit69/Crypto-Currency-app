import React, {useEffect, useState} from 'react'
import  axios  from "axios";
import {server} from '../main'
import { Container, HStack, Button, RadioGroup, Radio } from '@chakra-ui/react';
import {Loader, ErrorComponent, CoinCard} from './index'


const Coins = () => {
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [currency, setCurrency] = useState('inr')
  const [page, setPage] = useState(1)
  
  const currecySymbol = currency==='inr'?'₹':currency==='eur'?'€':'$';
  const btns = new Array(132).fill(1)
    
  const changePage = (page)=>{
    setPage(page)
    setLoading(true)
  }

  useEffect(() => {
    const fetchCoins = async()=>{
    try {
        const {data} = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
        // console.log(data)
        setCoins(data)
        setLoading(false)
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    fetchCoins()
  }, [currency, page])
  if(error) return <ErrorComponent message='error while fetching Coins'/>
  return (
    <Container maxW='container.xl'>
      {loading ? <Loader/> : 
      (<>
      <RadioGroup value={currency} onChange={setCurrency} p='8'>
        <HStack spacing={'4'}>
          <Radio value='inr'>INR</Radio>
          <Radio value='usd'>USD</Radio>
          <Radio value='eur'>EUR</Radio>
        </HStack>
      </RadioGroup>
      <HStack wrap={'wrap'} spacing='4' justifyContent='Center'>
         {coins.map((coin)=>(
          <CoinCard
           key={coin.id}
           id={coin.id}
           price={coin.current_price}
           name={coin.name}
           image={coin.image}
           symbol={coin.symbol}
           currecySymbol={currecySymbol}
          />
         ))}
      </HStack>

      <HStack w='full' overflowX={'auto'} p='8'>
        {
          btns.map((item, index)=>(
            <Button key={index} bgColor={'blackAlpha.900'} color='white' onClick={()=>changePage(index + 1)}>{index+1}</Button>
          ))
        }
      </HStack>
      </>
      )}
    </Container>
  )
}



export default Coins