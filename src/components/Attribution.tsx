/* eslint-disable react/jsx-no-target-blank */
const Attribution = ({ darkTheme }: any) => {
	return (
		<div className={darkTheme ? "attribution" : "attribution light"}>
			Challenge by{" "}
			<a href="https://www.frontendmentor.io?ref=challenge" target="_blank">
				Frontend Mentor
			</a>
			. Coded by <a href="https://www.github.com/mattreee">mattreee</a>.
		</div>
	);
};

export default Attribution;
