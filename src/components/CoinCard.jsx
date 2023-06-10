import React from 'react'
import { Link } from 'react-router-dom'
import { Heading, Text, VStack } from '@chakra-ui/react';


const CoinCard =({name, image, symbol, id, price, currecySymbol='₹'})=>{
    return <Link to ={'/coin/'+id}>
      <VStack w='52' shadow={'lg'} p='8' borderRadius={'lg'} transition='all 0.3s'
      m={'4'} css={{'&:hover':{
        transform:'scale(1.1)'
      }}}>
        <img src={image} alt="Exchage" w='10' h='10' />
       <Heading size='md' noOfLines={1}>
         {name}
       </Heading>
       <Text noOfLines={1}>{symbol}</Text>
       <Text noOfLines={1}>{price ? `${currecySymbol} ${price}` : 'NA'}</Text>
      </VStack>
    </Link>
  }

export default CoinCard