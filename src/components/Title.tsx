import IconSun from "../images/icon-sun.svg";

const Title = () => {
	return (
		<header className="header">
			<h1 className="header__title">TODO</h1>
			<img className="header__icon" src={IconSun} alt="sun icon" />
		</header>
	);
};

export default Title;
