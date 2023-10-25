import React from 'react';
import { useNavigate } from 'react-router-dom';

function TabsComponent({ tabs }) {
	const navigate = useNavigate();

	return (
		<div className="tabs">
			{tabs.map(tab => (
				<button
					key={tab.id}
					onClick={() => navigate(`/${tab.id}`)}
				>
					{tab.title}
				</button>
			))}
		</div>
	);
}

export default TabsComponent;
