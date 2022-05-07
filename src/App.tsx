import Title from "./components/Title";
import List from "./components/List";
import Instruction from "./components/Instruction";
import Attribution from "./components/Attribution";
import { useState } from "react";

function App() {
	const [darkTheme, setDarkTheme] = useState(false);
	const [list, setList] = useState([
		{
			id: Math.random(),
			checked: false,
			content: "some item text",
		},
		{
			id: Math.random(),
			checked: false,
			content: "some item text2",
		},
	]);

	return (
		<div className={darkTheme ? "body" : "body light"}>
			<div role="main" className="container">
				<Title darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
				<List list={list} setList={setList} darkTheme={darkTheme} />
				<Instruction />
				<Attribution darkTheme={darkTheme} />
			</div>
		</div>
	);
}

export default App;
