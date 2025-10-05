import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import Store from "./app/Store.js";
import "./index.css";
import { Toaster } from "react-hot-toast";

// Report web vitals in production
const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={Store}>
			<Toaster
				position='top-center'
				reverseOrder={false}
			/>
			<App />
		</Provider>
	</React.StrictMode>
);

// Report web vitals
reportWebVitals();