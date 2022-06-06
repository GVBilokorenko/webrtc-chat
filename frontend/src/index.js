import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import Header from "./components/header";
import Home from "./components/home";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<BrowserRouter>
		<Header />
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/home" element={<Home />} />
			{/* <Route path="/IngridientData" element={<Ingridients />} /> */}
			{/* Default Router */}
			<Route path="/*" element={<Navigate to="/" />} />
		</Routes>
	</BrowserRouter>
);

