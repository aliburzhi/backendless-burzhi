import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import TabsComponent from './TabsComponent';
function RoutesComponent() {
	const [tabs, setTabs] = useState([]);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		fetch(process.env.PUBLIC_URL + '/tabs.json')
			.then(response => {
				if (!response.ok) {
					throw new Error('Network response error' + response.statusText);
				}
				return response.json();
			})
			.then(data => setTabs(data))
			.catch(error => console.error('Error', error));

	}, []);

	useEffect(() => {
		if (!location.pathname.slice(1) && tabs.length > 0) {
			const defaultTab = tabs.sort((a, b) => a.order - b.order)[0];
			navigate(`/${defaultTab.id}`);
		}
	}, [tabs, location, navigate]);

	return (
		<div>
			<TabsComponent tabs={tabs} />
		<Suspense fallback={<div>Loading...</div>}>
			<Routes>
				{tabs.map(tab => {
					const LazyComponent = lazy(() => import(`../../src/${tab.path}`));
					return (
						<Route
							key={tab.id}
							path={`/${tab.id}`}
							element={<LazyComponent />}
						/>
					);
				})}
			</Routes>
		</Suspense>
		</div>
	);
}

export default RoutesComponent;
