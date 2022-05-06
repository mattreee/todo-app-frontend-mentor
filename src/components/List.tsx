import IconCheck from "../images/icon-check.svg";
import IconCross from "../images/icon-cross.svg";
import { useState, useEffect } from "react";

const List = ({ list, setList }: any) => {
	const checkedTrue = "list__icon check checked";
	const checkedFalse = "list__icon check";

	const textTrue = "list__text line-through";
	const textFalse = "list__text";

	// added this counter to rerender the list, since just updating the state in the app component is not triggering a rerender here.
	const [, setCounterUpdater] = useState(0);
	const [filteringOption, setFilteringOption] = useState("all");
	const [filteredList, setFilteredList] = useState(list);

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

	return (
		<div>
			<div className="list">
				{filteredList.map((elem: any, index: any) => {
					return (
						<div className="list__item" key={String(elem.id)}>
							<div className="list__icon-container">
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

			<div className="options">
				<p className="options__items-left">{list.length} Items left</p>
				<div className="options__buttons">
					<button
						id="button-all"
						className="options__button selected"
						onClick={() => setFilteringOption("all")}
					>
						All
					</button>
					<button
						id="button-active"
						className="options__button"
						onClick={() => setFilteringOption("active")}
					>
						Active
					</button>
					<button
						id="button-completed"
						className="options__button"
						onClick={() => setFilteringOption("completed")}
					>
						Completed
					</button>
				</div>
				<button className="options__clear">Clear Completed</button>
			</div>
		</div>
	);
};

export default List;
