import IconSun from "../images/icon-sun.svg";
import IconMoon from "../images/icon-moon.svg";

const Title = ({ darkTheme, setDarkTheme }: any) => {
	const swapTheme = () => {
		setDarkTheme(!darkTheme);
	};

	return (
		<header className="header">
			<h1 className="header__title">TODO</h1>
			{darkTheme ? (
				<img
					className="header__icon"
					src={IconSun}
					alt="sun icon"
					onClick={swapTheme}
				/>
			) : (
				<img
					className="header__icon"
					src={IconMoon}
					alt="moon icon"
					onClick={swapTheme}
				/>
			)}
		</header>
	);
};

export default Title;
