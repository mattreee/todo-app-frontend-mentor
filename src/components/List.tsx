import IconCheck from "../images/icon-check.svg";
import IconCross from "../images/icon-cross.svg";
import { useState, useEffect, useRef } from "react";

const List = ({ darkTheme }: any) => {
	const [list, setList] = useState([
		{
			id: Math.random(),
			checked: false,
			content: "item text",
		},
		{
			id: Math.random(),
			checked: false,
			content: "item text2",
		},
	]);

	const [filteringOption, setFilteringOption] = useState("all");
	const [itemsLeft, setItemsLeft] = useState(0);
	const [inputContent, setInputContent] = useState("");
	const refList = useRef(list);

	const checkedTrue = "list__icon check checked";
	const checkedFalse = "list__icon check";
	const textTrue = "list__text line-through";
	const textFalse = "list__text";

	const handleEnter = (e: any) => {
		if (e.keyCode === 13) {
			if (inputContent === "") return;

			setList([
				...list,
				{
					id: Math.random(),
					checked: false,
					content: inputContent,
				},
			]);

			refList.current = [
				...list,
				{
					id: Math.random(),
					checked: false,
					content: inputContent,
				},
			];

			e.target.value = "";
			setInputContent("");

			console.log(list, refList.current);
		}
	};

	const handleInput = (e: any) => {
		setInputContent(e.target.value);
	};

	const handleItemsLeft = () => {
		const newAmount = list.filter((elem: any) => {
			return elem.checked === false;
		});

		setItemsLeft(newAmount.length);
	};

	const handleFiltering = () => {
		if (filteringOption === "all") {
			setList(refList.current);
		}

		if (filteringOption === "active") {
			const newList = list.filter((elem: any) => {
				return elem.checked === false;
			});

			setList(newList);
		}

		if (filteringOption === "completed") {
			const newList = list.filter((elem: any) => {
				return elem.checked === true;
			});

			setList(newList);
		}

		handleItemsLeft();
	};

	const handleOptionsSort = (e: any) => {
		const all = document.querySelector("#button-all");
		const active = document.querySelector("#button-active");
		const completed = document.querySelector("#button-completed");

		if (e.target.classList.contains("selected")) {
			return;
		}

		if (e.target.classList.contains("options__button")) {
			all?.classList.remove("selected");
			active?.classList.remove("selected");
			completed?.classList.remove("selected");

			e.target.classList.add("selected");
		}
	};

	const handleChecked = (index: number) => {
		const newList = list;
		newList[index].checked = !list[index].checked;

		setList(newList);
	};

	const handleDelete = (index: number) => {
		const newList = list.filter((elem: any, newIndex: number) => {
			return newIndex !== index;
		});

		setList(newList);
		refList.current = newList;
	};

	useEffect(() => {
		window.addEventListener("click", handleOptionsSort);
		window.addEventListener("click", handleFiltering);

		return () => {
			window.removeEventListener("click", handleOptionsSort);
			window.removeEventListener("click", handleFiltering);
		};
	});

	useEffect(() => {
		window.addEventListener("keydown", handleEnter);

		return () => {
			window.removeEventListener("keydown", handleEnter);
		};
	});

	useEffect(() => {
		handleItemsLeft();
	});

	return (
		<div>
			<div className="input">
				<div
					className={
						darkTheme
							? "input__circle-container"
							: "input__circle-container light"
					}
				>
					<div className={darkTheme ? "input__circle" : "input__circle light"}>
						&nbsp;
					</div>
				</div>
				<input
					className={darkTheme ? "input__input" : "input__input light"}
					type="text"
					placeholder="Create a new todo..."
					onInput={(e) => handleInput(e)}
				/>
			</div>

			<div className={darkTheme ? "list" : "list light"}>
				{list.map((elem: any, index: any) => {
					return (
						<div
							className={darkTheme ? "list__item" : "list__item light"}
							key={String(elem.id)}
						>
							<div
								className={
									darkTheme
										? "list__icon-container"
										: "list__icon-container light"
								}
							>
								<img
									className={elem.checked ? checkedTrue : checkedFalse}
									src={IconCheck}
									alt=""
									onClick={() => handleChecked(index)}
								/>
							</div>
							<p className={elem.checked ? textTrue : textFalse}>
								{elem.content}
							</p>
							<img
								className="list__icon cross"
								src={IconCross}
								alt=""
								onClick={() => handleDelete(index)}
							/>
						</div>
					);
				})}
			</div>

			<div className={darkTheme ? "options" : "options light"}>
				<p
					className={
						darkTheme ? "options__items-left" : "options__items-left light"
					}
				>
					{itemsLeft} Items left
				</p>
				<div className="options__buttons">
					<button
						id="button-all"
						className={
							darkTheme
								? "options__button selected"
								: "options__button light selected"
						}
						onClick={() => setFilteringOption("all")}
					>
						All
					</button>
					<button
						id="button-active"
						className={darkTheme ? "options__button" : "options__button light"}
						onClick={() => setFilteringOption("active")}
					>
						Active
					</button>
					<button
						id="button-completed"
						className={darkTheme ? "options__button" : "options__button light"}
						onClick={() => setFilteringOption("completed")}
					>
						Completed
					</button>
				</div>
				<button
					className={darkTheme ? "options__clear" : "options__clear light"}
				>
					Clear Completed
				</button>
			</div>
		</div>
	);
};

export default List;
