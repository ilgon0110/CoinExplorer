import React, { useState, useEffect } from "react";
import { getExchanges } from "../../api";
import Exchange from "../../Components/Exchange";
import Loader from "../../Components/Loader";

const ExchangePage = () => {
  const [exchangeState, setExchangeState] = useState({
    loading: true,
    exchanges: [],
  });

  useEffect(async () => {
    const { data: exchanges } = await getExchanges();
    setExchangeState({
      exchanges,
      loading: false,
    });
  }, []);

  return { exchangeState };
};

function App() {
  const {
    exchangeState: { loading, exchanges },
  } = ExchangePage();
  return loading ? (
    <Loader />
  ) : (
    exchanges.map((a) => <Exchange key={a.id} {...a} />)
  );
}

export default App;
