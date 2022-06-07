import "./header.scss";
import { Link } from "react-router-dom";
import auth from "../../fireBase";
import { useState } from "react";
import { signOut } from "firebase/auth";

function Header(props) {
	const [dropdownShown, setDropdownShown] = useState(false);

	return (
		<div className="Header">
			<Link className="a logo" to="/">
				Webrtc-Chat
			</Link>
			<input className="menu-btn" type="checkbox" id="menu-btn" />
			<label className="menu-icon" htmlFor="menu-btn">
				<span className="navicon"></span>
			</label>
			<ul className="menu">
				<li>
					<Link className="a" to="/home">
						Home
					</Link>
				</li>
				<li>
					<Link className="a" to="/">
						About
					</Link>
				</li>
				<li>
					<Link className="a" to="/">
						Careers
					</Link>
				</li>
				<li>
					<Link className="a" to="/">
						Contact
					</Link>
				</li>
				<li>
					<div className="dropdown a" onClick={() => setDropdownShown(dropdownShown => !dropdownShown)}>
						<button className="dropbtn">
							<i className="fa-light fa-circle-user fa-2xl"></i> {props.user?.email}
						</button>
						<div className={dropdownShown ? "dropdown-content block" : "dropdown-content none"}>
							{props.user ? (
								<>
									<Link className="a" to="/profile">
										My profile
									</Link>
									<Link className="a" to="/" onClick={() => signOut(auth)}>
										Log out
									</Link>
								</>
							) : (
								<Link className="a" to="/auth">
									Sign in
								</Link>
							)}
						</div>
					</div>
				</li>
			</ul>
		</div>
	);
}

export default Header;

