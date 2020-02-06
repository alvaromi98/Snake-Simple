import React from 'react';
export default (props) => {
	return (
		<div>
			{' '}
			{props.cuerpoSerpiente.map((bloque, i) => {
				const style = {
					left: `${bloque[0]}%`,
					top: `${bloque[1]}%`
				};
				return (
					<div className="serpiente" key={i} style={style}>
						{' '}
					</div>
				);
			})}{' '}
		</div>
	);
};
