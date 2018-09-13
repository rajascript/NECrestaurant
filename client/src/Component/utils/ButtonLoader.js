import React from "react";
import DotLoader from "react-spinners/DotLoader";

const ButtonLoader = props => {
	return (
		<div id="header__button--loader" className="header__button--loader">
			<DotLoader
				sizeUnit={"px"}
				size={props.size || 30}
				color={props.color || "#ff6928"}
			/>
		</div>
	);
};
export default ButtonLoader;
