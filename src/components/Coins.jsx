import React, { useEffect, useState } from "react";
import axios from "axios";
import { server } from "../main";
import { Container, HStack, Button, RadioGroup, Radio } from "@chakra-ui/react";
import { Loader, ErrorComponent, CoinCard } from "./index";

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [page, setPage] = useState(1);

  const currecySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= coins.length / 10 &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}`
        );
        setCoins(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    };
    fetchCoins();
  }, [currency]);
  
  if (error) return <ErrorComponent message="error while fetching Coins" />;
  return (
    <Container maxW="container.xl">
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup value={currency} onChange={setCurrency} p="8">
            <HStack spacing={"4"}>
              <Radio value="inr">INR</Radio>
              <Radio value="usd">USD</Radio>
              <Radio value="eur">EUR</Radio>
            </HStack>
          </RadioGroup>
          <HStack wrap={"wrap"} spacing="4" justifyContent="Center">
            {coins.slice(page * 10 - 10, page * 10).map((coin) => (
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

          {coins.length > 0 && (
            <HStack justifyContent="Center" marginY={15}>
              {page <= coins.length / 100 ? (
                ""
              ) : (
                <Button onClick={() => changePage(page - 1)}>⬅️</Button>
              )}
              {[...Array(coins.length / 10)].map((_, i) => {
                return (
                  <Button
                    key={i}
                    bgColor={
                      page === i + 1 ? "blackAlpha.500" : "blackAlpha.900"
                    }
                    color={page === i + 1 ? "blackAlpha.900" : "white"}
                    onClick={() => changePage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                );
              })}
              {page >= coins.length / 10 ? (
                ""
              ) : (
                <Button onClick={() => changePage(page + 1)}>➡️</Button>
              )}
            </HStack>
          )}
        </>
      )}
    </Container>
  );
};

export default Coins;
