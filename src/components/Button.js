import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

function Button(props) {
	let classes = ClassNames(`${props.className} py-4 px-16 rounded-full text-white bg-blue focus:outline-none focus:shadow-outline`);

	return (
		<button onClick={props.onClick} className={classes}>
			{props.children}
		</button>
	);
}

Button.propTypes = {
	onClick: PropTypes.func.isRequired,
	className: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired
};

export default Button;
