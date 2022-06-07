import { Route, Navigate, Routes } from "react-router-dom";
import Header from "./components/header";
import Home from "./components/home";
import Auth from "./components/auth";
import Main from "./components/main";
import { onAuthStateChanged } from "firebase/auth";
import { useState } from "react";
import auth from "./fireBase";

function Router() {
	const [user, setUser] = useState({});
	onAuthStateChanged(auth, currentUser => {
		setUser(currentUser);
	});

	return (
		<>
			<Header user={user} />
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/home" element={<Home />} />
				{user ? "" : <Route path="/auth" element={<Auth />} />}
				{/* Default route */}
				<Route path="/*" element={<Navigate to="/" />} />
			</Routes>
		</>
	);
}

export default Router;

