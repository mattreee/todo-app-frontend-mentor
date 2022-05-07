import IconCheck from "../images/icon-check.svg";
import IconCross from "../images/icon-cross.svg";
import { useState, useEffect } from "react";

const List = ({ list, setList, darkTheme }: any) => {
	// added this counter to rerender the list, since just updating the state in the app component is not triggering a rerender here.
	const [, setCounterUpdater] = useState(0);
	const [inputContent, setInputContent] = useState("");
	const [filteredList, setFilteredList] = useState(list);
	const [filteringOption, setFilteringOption] = useState("all");
	const [itemsLeft, setItemsLeft] = useState(0);

	const checkedTrue = "list__icon check checked";
	const checkedFalse = "list__icon check";
	const textTrue = "list__text line-through";
	const textFalse = "list__text";

	const handleItemsLeft = () => {
		const newAmount = list.filter((elem: any) => {
			return elem.checked === false;
		});

		setItemsLeft(newAmount.length);
	};

	const handleFiltering = () => {
		if (filteringOption === "all") {
			setFilteredList(list);
		}

		if (filteringOption === "active") {
			const newList = list.filter((elem: any) => {
				return elem.checked === false;
			});

			setFilteredList(newList);
		}

		if (filteringOption === "completed") {
			const newList = list.filter((elem: any) => {
				return elem.checked === true;
			});

			setFilteredList(newList);
		}

		handleItemsLeft();
		setCounterUpdater((prevState) => prevState + 1);
	};

	const changeChecked = (index: number) => {
		const newList = list;
		newList[index].checked = !list[index].checked;

		setList(newList);
		setCounterUpdater((prevState) => prevState + 1);
	};

	const deleteItem = (index: number) => {
		const newList = list.filter((elem: any, newIndex: number) => {
			return newIndex !== index;
		});

		setList(newList);
		setCounterUpdater((prevState) => prevState + 1);
	};

	const optionSort = (e: any) => {
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

	useEffect(() => {
		window.addEventListener("click", optionSort);
		window.addEventListener("click", handleFiltering);

		return () => {
			window.removeEventListener("click", optionSort);
			window.removeEventListener("click", handleFiltering);
		};
	});

	useEffect(() => {
		handleItemsLeft();

		window.addEventListener("keydown", (e: any) => {
			if (e.keyCode === 13) {
				setList([
					...list,
					{
						id: Math.random(),
						checked: false,
						content: inputContent,
					},
				]);

				setFilteredList(list);
				setFilteringOption("all");
				e.target.value = "";
				handleFiltering();
			}
		});
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
					onChange={(e) => setInputContent(e.target.value)}
				/>
			</div>

			<div className={darkTheme ? "list" : "list light"}>
				{filteredList.map((elem: any, index: any) => {
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
									onClick={() => changeChecked(index)}
								/>
							</div>
							<p className={elem.checked ? textTrue : textFalse}>
								{elem.content}
							</p>
							<img
								className="list__icon cross"
								src={IconCross}
								alt=""
								onClick={() => deleteItem(index)}
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
