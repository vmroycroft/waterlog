import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

/**
 * A button.
 *
 * @component
 */
function Button({ onClick, className, children }) {
	let classes = ClassNames(
		`${className} py-4 px-16 rounded-full text-white bg-blue focus:outline-none focus:shadow-outline`
	);

	return (
		<button onClick={onClick} className={classes}>
			{children}
		</button>
	);
}

Button.propTypes = {
	onClick: PropTypes.func.isRequired,
	className: PropTypes.string,
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired
};

export default Button;
