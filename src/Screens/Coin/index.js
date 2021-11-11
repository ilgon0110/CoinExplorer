import React, { useEffect, useState, useRef } from "react";
import { getCoinDetail } from "../../api";
import Loader from "../../Components/Loader";
import styled from "styled-components";
import { Route, Link, withRouter } from "react-router-dom";
import Markets from "../Markets";
import CoinExchanges from "../CoinExchanges";

const Title = styled("h1")``;

const Description = styled("p")`
  margin: 30px 0px;
`;

const KeyValueRow = styled("div")`
  margin-bottom: 5px;
`;

const Key = styled("span")`
  font-weight: 600;
`;

const Value = styled("span")``;

const InsideMenu = styled("div")`
  margin: 20px 0px;
`;

const List = styled("ul")`
  display: flex;
`;

const Item = styled("li")`
  margin-right: 20px;
  text-transform: uppercase;
  font-weight: 600;
  border: 2px solid #1abc9c;
  padding: 5px;
  border-radius: 3px;
  background-color: ${(props) => (props.active ? "#1abc9c" : "transparent")};
  color: ${(props) => (props.active ? "white" : "black")};
`;

const DetailPage = ({ match }) => {
  const [detailState, setDetailState] = useState({
    loading: true,
    details: [],
  });

  useEffect(async () => {
    let id = match.params.id;
    const { data: details } = await getCoinDetail(id);
    setDetailState({ details, loading: false });
  }, []);
  return { detailState };
};

const App = ({ match }) => {
  const {
    detailState: { details, loading },
  } = DetailPage({ match });
  console.log(details, loading);
  return loading ? (
    <Loader />
  ) : (
    <>
      <Title>
        {details.name} / {details.symbol}
      </Title>
      <Description>{details.description}</Description>
      <KeyValueRow>
        <Key>Rank:</Key> <Value>{details.rank}</Value>
      </KeyValueRow>
      <KeyValueRow>
        <Key>Open Source:</Key>{" "}
        <Value>{details.open_source ? "Yes" : "No"}</Value>
      </KeyValueRow>
      <KeyValueRow>
        <Key>Proof Type:</Key> <Value>{details.proof_type}</Value>
      </KeyValueRow>
      <KeyValueRow>
        <Key>Structure:</Key> <Value>{details.org_structure}</Value>
      </KeyValueRow>
      <InsideMenu>
        <List>
          <Item>
            <Link to={`/coins/${details.id}/markets`}>Markets</Link>
          </Item>
          <Item>
            <Link to={`/coins/${details.id}/exchanges`}>Exchanges</Link>
          </Item>
        </List>
      </InsideMenu>
      <Route path="/coins/:id/markets" component={Markets} />
      <Route path="/coins/:id/exchanges" component={CoinExchanges} />
    </>
  );
};

export default App;
