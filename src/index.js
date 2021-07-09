import React from "react";
import ReactDOM from "react-dom";
import { useForm, Controller } from "react-hook-form";
import NumberFormat from "react-number-format";
import { TextField, ThemeProvider, createMuiTheme } from "@material-ui/core";
import "./styles.css";

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});
const defaultValues = {
  priceInCents: 1234567,
  muiPriceInCents: 1234567
};
function App() {
  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };
  const form = useForm({ defaultValues });

  return (
    <ThemeProvider theme={theme}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <label htmlFor="priceInCents">Price</label>
        <Controller
          name="priceInCents"
          control={form.control}
          render={({ field }) => <CurrencyFormat {...field} />}
        />
        <label htmlFor="muiPriceInCents">Material UI Price</label>
        <Controller
          name="muiPriceInCents"
          control={form.control}
          render={({ field }) => <MuiCurrencyFormat {...field} />}
        />

        <input type="submit" />
        <pre style={{ color: "#fff", marginTop: 24 }}>
          {JSON.stringify(form.watch(), null, 2)}
        </pre>
      </form>
    </ThemeProvider>
  );
}

const CurrencyFormat = ({ onChange, value, ...rest }) => {
  const [currency, setCurrency] = React.useState(value / 100);
  return (
    <NumberFormat
      {...rest}
      value={currency}
      thousandSeparator={true}
      decimalScale={2}
      onValueChange={(target) => {
        setCurrency(target.floatValue);
        onChange(target.floatValue * 100);
      }}
      isNumericString
      prefix="$ "
    />
  );
};

const MuiCurrencyFormat = ({ onChange, value, ...rest }) => {
  const [currency, setCurrency] = React.useState(value / 100);
  return (
    <NumberFormat
      customInput={TextField}
      {...rest}
      value={currency}
      fullWidth
      thousandSeparator={true}
      decimalScale={2}
      onValueChange={(target) => {
        setCurrency(target.floatValue);
        onChange(target.floatValue * 100);
      }}
      isNumericString
      prefix="$ "
    />
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
