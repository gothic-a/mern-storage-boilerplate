import Form from './components/Form'
import { useState } from 'react'

function App() {
	const [files, setFiles] = useState([])
	console.log(files)

	return (
		<div className="App">
			<Form 
				setFiles={(...files) => setFiles(state => [...state, ...files])}
			/>
			{/* <img src="7c18e3b2235bb733536feb57ee6de6bb" alt="" width="500"/> */}
		</div>
	);
}

export default App;
