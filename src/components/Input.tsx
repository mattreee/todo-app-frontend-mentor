// import IconCheck from "../images/icon-check.svg";
import { useState, useEffect } from "react";

const Input = ({ list, setList }: any) => {
	const [inputContent, setInputContent] = useState("");

	const handleEnter = (event: any) => {
		if (event.keyCode === 13) {
			if (inputContent === "") return;

			setList([
				...list,
				{
					id: Math.random(),
					checked: false,
					content: inputContent,
				},
			]);

			event.target.value = "";
		}
	};

	useEffect(() => {
		window.addEventListener("keydown", handleEnter);

		return () => {
			window.removeEventListener("keydown", handleEnter);
		};
	});

	return (
		<div className="input">
			<div className="input__circle-container">
				<div className="input__circle">&nbsp;</div>
			</div>
			<input
				className="input__input"
				type="text"
				placeholder="Create a new todo..."
				onChange={(e) => setInputContent(e.currentTarget.value)}
			/>
		</div>
	);
};

export default Input;
