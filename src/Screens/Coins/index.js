import React, { useEffect, useState, useRef } from "react";
import { getCoins } from "../../api";
import Coin from "../../Components/Coin";
import Loader from "../../Components/Loader";

const CoinPage = () => {
  const [coinState, setCoinState] = useState({
    loading: true,
    coins: [],
  });

  useEffect(async () => {
    const { data: coins } = await getCoins();
    setCoinState({ coins, loading: false });
  }, []);
  return { coinState };
};

function App() {
  const {
    coinState: { coins, loading },
  } = CoinPage();
  return loading ? <Loader /> : coins.map((a) => <Coin key={a.id} {...a} />);
}

export default App;
