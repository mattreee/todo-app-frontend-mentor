import Title from "./components/Title";
import Input from "./components/Input";
import List from "./components/List";
import Instruction from "./components/Instruction";
import Attribution from "./components/Attribution";
import { useState } from "react";

function App() {
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
		<div role="main" className="container">
			<Title />
			<Input list={list} setList={setList} />
			<List list={list} setList={setList} />
			<Instruction />
			<Attribution />
		</div>
	);
}

export default App;
