import React from 'react';

export default (props) => {
	const style = {
		left: `${props.bloque[0]}%`,
		top: `${props.bloque[1]}%`
	};

	return (
		<div className="fruta" style={style}>
			{' '}
		</div>
	);
};
