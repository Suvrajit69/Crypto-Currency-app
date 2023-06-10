import { Box, Image, Text } from '@chakra-ui/react'
import {motion} from 'framer-motion'
import React from 'react'

const Home = () => {
  return (
    <Box bgColor={'blackAlpha.900'} w='full' h={'85vh'}>
      <motion.div style={{
        height:'80vh'
      }}
      animate={{
        translateY:'15px'
      }}
      transition={{
        duration:1.5,
        repeat:Infinity,
        repeatType:'reverse'
      }}>
      <Image w={'full'} h='full' objectFit={'contain'} src='https://altcoinsbox.com/wp-content/uploads/2023/02/bitcoin-gold-coin-with-BTC-logo-300x300.webp'/>
      <Text fontSize={'6xl'} textAlign='center' fontWeight={'thin'} color='whiteAlpha.700' >Xcrypto</Text>
      </motion.div>
    </Box>
  )
}

export default Home