import React from "react";
import { withProtected } from "../src/hook/route";

function Admin({ auth }) {
	const { logout, sendMessage } = auth;
	return (
		<div>
			<button onClick={logout}>Logout</button>
			<button onClick={sendMessage}>message</button>
		</div>
	);
}

export default withProtected(Admin);