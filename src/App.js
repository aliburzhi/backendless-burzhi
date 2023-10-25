import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesComponent from './components/RoutesComponent';

function App() {
	return (
		<Router>
			<RoutesComponent />
		</Router>
	);
}

export default App;
