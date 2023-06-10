import React from 'react'
import { Box, VStack,Stack, Avatar, Text } from '@chakra-ui/react'
import SuvrajitMondal from '../assets/Suvrajit Mondal.jpg'

const Footer = () => {
  return (
    <Box bgColor={'blackAlpha.900'} color='whiteAlpha.700' minH={'48'} px='16' py={['16', '8']}>
      <Stack direction={['column', 'row']} h='full' alignItems={'center'}>
        <VStack w={'full'} alignItems={['center', 'flex-start']}>
          <Text fontWeight={'bold'}>About Us</Text>
          <Text fontSize={'sm'} letterSpacing={'widest'} textAlign={['center', 'left']}>Made and Loved by India</Text>
        </VStack>
        <VStack >
          <Avatar boxSize={'28'} mt={['4', '0']} src={SuvrajitMondal}/>
          <Text fontWeight={'bold'}>Our Founder</Text>
          <Text fontSize={'md'} fontWeight='thin'>Suvrajit Mondal</Text>
        </VStack>
      </Stack>
    </Box>
  )
}

export default Footer