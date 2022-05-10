import Title from "./components/Title";
import List from "./components/List";
import Instruction from "./components/Instruction";
import Attribution from "./components/Attribution";
import { useState } from "react";

function App() {
	const [darkTheme, setDarkTheme] = useState(true);

	return (
		<div className={darkTheme ? "body" : "body light"}>
			<div role="main" className="container">
				<Title darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
				<List darkTheme={darkTheme} />
				<Instruction />
				<Attribution darkTheme={darkTheme} />
			</div>
		</div>
	);
}

export default App;
