import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Logo from "./Logo";
import { DebounceInput } from "react-debounce-input";

//  Easy to adjust variables
const title = "Crypto Wiz";
const title2 = "Risk Reward Calculator";
const currencySymbol = "£";

const App = () => {
  const [data, setData] = useState({
    portfolioSize: "",
    marginSizePct: "",
    marginSizeVal: "",
    riskPct: "",
    riskValue: "",
    stopLoss: "",
    parAtRisk: "",
    ltu: "",
    stu: ""
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    localStorage.setItem("portfolio-size", data.portfolioSize);
  });

  // Calculations from spreadsheet
  // c3
  const calculatedMargin = data.portfolioSize * (data.marginSizePct / 100);
  // c4
  const calculatedRisk = calculatedMargin * (data.riskPct / 100);
  //d2
  const calculatedPortfolioAtRisk = 100 * (calculatedRisk / data.portfolioSize);
  //c6
  const leverageToUse = data.riskPct / data.stopLoss;
  // c7
  const contractsToUse = calculatedMargin * leverageToUse;

  return (
    <>
      <Header>
        <a href={"/"}>
          <Logo height={"2.5rem"} />
        </a>
      </Header>
      <PageFlex>
        <CalcBox>
          <Title>
            <h1>{title}</h1>
            <h2>{title2}</h2>
          </Title>

          <FormBox>
            <ul>
              <li>
                <FormLabel for="portfolio-size">
                  <p>Portfolio Size</p>
                </FormLabel>
                <FormItem>
                  <Marker>{currencySymbol}</Marker>
                  <DebounceInput
                    className="styled-input"
                    type="number"
                    id="portfolio-size"
                    placeholder={"Enter Portfolio Size"}
                    name="portfolioSize"
                    value={data.portfolioSize}
                    onChange={handleChange}
                  />
                </FormItem>
              </li>
              <li>
                <FormLabel for="margin-size">
                  <p>Margin Size</p>
                </FormLabel>
                <FormItem>
                  <Marker>%</Marker>
                  <DebounceInput
                    className="styled-input"
                    type="number"
                    id="margin-size"
                    name="marginSizePct"
                    value={data.marginSizePct}
                    onChange={handleChange}
                  />
                </FormItem>
                <FormItem>
                  <Marker>{currencySymbol}</Marker>
                  <DebounceInput
                    className="styled-input"
                    type="number"
                    id="margin-size-value"
                    name="marginSizeVal"
                    value={calculatedMargin || ""}
                    readOnly
                    // onChange={handleChange}
                  />
                </FormItem>
              </li>
              <li>
                <FormLabel for="risk-size">
                  <p>Risk Size</p>
                </FormLabel>
                <FormItem>
                  <Marker>%</Marker>

                  <DebounceInput
                    className="styled-input"
                    type="number"
                    id="risk-size"
                    name="riskPct"
                    onChange={handleChange}
                  />
                </FormItem>
                <FormItem>
                  <Marker>{currencySymbol}</Marker>
                  <DebounceInput
                    className="styled-input"
                    type="number"
                    id="risk-size"
                    name="riskVal"
                    value={calculatedRisk || ""}
                    readOnly
                  />
                </FormItem>
              </li>
              <li>
                <FormLabel for="stop-loss">
                  <p>Stop Loss</p>
                </FormLabel>
                <FormItem>
                  <Marker>%</Marker>
                  <DebounceInput
                    className="styled-input"
                    type="number"
                    id="stop-loss"
                    name="stopLoss"
                    onChange={handleChange}
                  />
                </FormItem>
              </li>
            </ul>
            <div style={{ display: "flex" }}>
              <SmallContainer>
                <div>Portfolio at risk</div>
                <SmallContainerNumber>
                  {calculatedPortfolioAtRisk
                    ? `% ${calculatedPortfolioAtRisk}`
                    : ""}
                </SmallContainerNumber>
              </SmallContainer>

              <SmallContainer>
                <div>Leverage to use</div>
                <SmallContainerNumber>
                  {leverageToUse !== Infinity
                    ? parseFloat(leverageToUse.toFixed(1)) || ""
                    : ""}
                </SmallContainerNumber>
              </SmallContainer>
              <SmallContainer>
                <div>Contracts to use</div>

                <SmallContainerNumber>
                  {contractsToUse !== Infinity
                    ? parseFloat(contractsToUse.toFixed(1)) || ""
                    : ""}
                </SmallContainerNumber>
              </SmallContainer>
            </div>
          </FormBox>
        </CalcBox>
      </PageFlex>
    </>
  );
};

export default App;

const PageFlex = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const CalcBox = styled.div`
  @media (max-width: 600px) {
    width: 99vw;
  }
  margin-bottom: 1rem;
  display: flex;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.55) 0%,
    rgba(0, 0, 0, 0.165) 100%
  );
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px);
  border-radius: 8px;
  max-width: 600px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  flex-wrap: nowrap;
`;

const FormBox = styled.form`
  margin: 1rem;
`;

const Header = styled.header`
  top: 0 !important;
  left: 0;
  width: 100%;
  height: 3.5rem;
  padding: 1rem;
  margin-bottom: 0.5rem;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  background: rgba(1, 1, 1, 0.1);
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const FormLabel = styled.label``;

const FormItem = styled.div`
  position: relative;
`;
const Marker = styled.span`
  position: absolute;
  margin-right: 1px;
  top: 50%;
  left: 1rem;
  transform: translateY(-52%);
`;
const SmallContainer = styled.div`
  height: auto;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  text-align: center;
  padding: 0.5rem;
  margin: 0.5rem;
  flex-direction: column;
  align-items: center;
`;

const SmallContainerNumber = styled.div`
  margin-top: 0.5rem;
  height: 3.5rem;
  width: 3.5rem;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.24);
  align-content: center;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
`;
