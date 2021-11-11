import React, { useState, useEffect } from "react";
import { getPrices } from "../../api";
import Price from "../../Components/Price";
import Loader from "../../Components/Loader";

const PricePage = () => {
  const [priceState, setPriceState] = useState({
    loading: true,
    prices: [],
  });

  useEffect(async () => {
    const { data: prices } = await getPrices();
    setPriceState({
      prices,
      loading: false,
    });
  }, []);

  return { priceState };
};

function App() {
  const {
    priceState: { loading, prices },
  } = PricePage();
  return loading ? <Loader /> : prices.map((a) => <Price key={a.id} {...a} />);
}

export default App;
