import "./header.scss";
import { Link } from "react-router-dom";

function Header() {
	return (
		<div className="Header">
			<Link className="a logo" to="/">
				Webrtc-Chat
			</Link>
			<input class="menu-btn" type="checkbox" id="menu-btn" />
			<label class="menu-icon" for="menu-btn">
				<span class="navicon"></span>
			</label>
			<ul class="menu">
				<li>
					<Link className="a" to="/">
						Our Work
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
					<div class="dropdown a">
						<button class="dropbtn">Dropdown</button>
						<div class="dropdown-content">
							<Link className="a" to="/">
								Our Work
							</Link>
							<Link className="a" to="/">
								Our Work
							</Link>
							<Link className="a" to="/">
								Our Work
							</Link>
						</div>
					</div>
				</li>
			</ul>
		</div>
	);
}

export default Header;
