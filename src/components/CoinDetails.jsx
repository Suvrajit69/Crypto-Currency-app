import { Box, Container, HStack, Radio, RadioGroup, VStack, Text, Stat, StatLabel, StatNumber, Image, StatArrow, Badge, Progress, Button } from '@chakra-ui/react'
import {useState, useEffect} from 'react'
import Loader from './Loader'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {server} from '../main'
import Chart from './Chart'

const CoinDetails = () => {
  const [coin, setCoin] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [currency, setCurrency] = useState('inr')
  const [page, setPage] = useState(1)
  const [chartArray, setChartArray] = useState([])
  const [days, setDays] = useState('24h')

  const params = useParams()
  const currecySymbol = currency==='inr'?'₹':currency==='eur'?'€':'$';
  const btns = ['1d','7d','1m','6m','1y','All']
   const switchChartStats = (key)=>{
      switch (key) {
        case '1d':
          if(days !== '24h'){
            setDays('24h')
            setLoading(true)
          }
          break;
        case '7d':
          if(days !== '7d'){
           setDays('7d')
           setLoading(true)
          }
          break;
        case '1m':
          if(days !== '30d'){
           setDays('30d')
           setLoading(true)
          }
          break;
        case '6m':
          if(days !== '180d'){
           setDays('180d')
           setLoading(true)
          }
          break;
        case '1y':
          if(days !== '365d'){
           setDays('365d')
           setLoading(true)
          }
          break;
        case 'All':
          if(days !== 'max'){
           setDays('max')
           setLoading(true)
          }
          break;
        default:
          setDays('24h')
          // setLoading(true)
          break;
      }
   }

  useEffect(() => {
    const fetchCoin = async()=>{
    try {
        const {data} = await axios.get(`${server}/coins/${params.id}`)
        const {data: chartData} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)
        console.log(data)
        setCoin(data)
        setChartArray(chartData.prices)
        setLoading(false)
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }
    fetchCoin()
  }, [params.id, currency, days])

  if(error) return <ErrorComponent message='error while fetching coin data'/>
  return (
    <Container maxW={'container.xl'}>
      {
        loading? <Loader/>:(
          <>
           <Image src={coin.image.large} w='16' h='16' mt={'2'}/>
              <Stat>
                <StatLabel fontSize={['','4xl']}>{coin.name}</StatLabel>
                <StatNumber fontSize={'2xl'}>{currecySymbol}{coin.market_data.current_price[currency]}</StatNumber>
                <StatArrow type={coin.market_data.price_change_percentage_30d > 0 ? 'increase':'decrease'}/>
                {coin.market_data.price_change_percentage_24h}%
              </Stat>
              <Badge fontSize={'2xl'} bgColor='blackAlpha.800' color={'white'}>
                {`#${coin.market_cap_rank}`}
              </Badge>
            <Box borderWidth={1} width='full'>
              <Chart arr={chartArray} currency={currecySymbol} days={days}/>
            </Box>
             <HStack p={'4'} wrap={'wrap'}>
              {btns.map((i)=>(
                <Button key={i} onClick={()=>switchChartStats(i)}>{i}</Button>
              ))}
             </HStack>
            <RadioGroup value={currency} onChange={setCurrency} p='8'>
              <HStack spacing={'4'}>
                <Radio value='inr'>INR</Radio>
                <Radio value='usd'>USD</Radio>
                <Radio value='eur'>EUR</Radio>
              </HStack>
            </RadioGroup>
            <VStack spacing={'4'}  alignItems={'flex-start'} p={['0','16']}>
              <Text fontSize='small' alignSelf='center' opacity='0.7'>
                Last updated on{Date().split('G')[0]}
              </Text>
              <CustomBar high={`${currecySymbol}${coin.market_data.high_24h[currency]}`} low={`${currecySymbol}${coin.market_data.low_24h[currency]}`}/>
              <Box w={'full'} justifyContent='center' p={['0','6']}>
                <Item title='Max Supply' value={coin.market_data.max_supply}/>
                <Item title='Circulating Supply' value={coin.market_data.circulating_supply}/>
                <Item title='Market Cap' value={`${currecySymbol}${coin.market_data.market_cap[currency]}`}/>
                <Item title='All Time High' value={`${currecySymbol}${coin.market_data.ath[currency]}`}/>
                <Item title='All Time Low' value={`${currecySymbol}${coin.market_data.atl[currency]}`}/>
              </Box>
            </VStack>
          </>
        )
      }
    </Container>
  )
}

const CustomBar = ({low, high})=>{
  return <VStack w='full'>
    <Progress value={high/low*100} colorScheme='teal' w='full'/>
    <HStack justifyContent={'space-between'} w='full'>
      <Badge children={low} colorScheme='red'/>
      <Text fontSize={'sm'}>24H Range</Text>
      <Badge children={high} colorScheme='green'/>
    </HStack>
  </VStack>
}

const Item = ({title, value}) =>(
  <HStack justifyContent={'space-between'} w='full' my='4' >
    <VStack>
     <Text fontFamily={'Bebas Neue'} letterSpacing='widest'>{title}</Text>
    </VStack>
    <Text>{value}</Text>
  </HStack>
)

export default CoinDetails