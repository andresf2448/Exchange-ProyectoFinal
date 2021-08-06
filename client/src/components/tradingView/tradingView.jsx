import React from "react";
import TradingViewWidget, { Themes } from "react-tradingview-widget";

export default function TradingView() {
  const currency = "XLMUSDT";

  return (
    <TradingViewWidget symbol={currency} theme={Themes.DARK} autosize={true} />
  );
}
