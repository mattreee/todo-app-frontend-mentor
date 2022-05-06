import IconCheck from "../images/icon-check.svg";
import IconCross from "../images/icon-cross.svg";
import { useState } from "react";

const List = ({ list, setList }: any) => {
	const checkedTrue = "list__icon check checked";
	const checkedFalse = "list__icon check";

	const textTrue = "list__text line-through";
	const textFalse = "list__text";

	// added this counter to rerender the list, since just updating the state in the app component is not triggering a rerender here.
	const [, setCounterUpdater] = useState(0);

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

	return (
		<div>
			<div className="list">
				{list.map((elem: any, index: any) => {
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
					<button className="options__button">All</button>
					<button className="options__button">Active</button>
					<button className="options__button">Completed</button>
				</div>
				<button className="options__clear">Clear Completed</button>
			</div>
		</div>
	);
};

export default List;
