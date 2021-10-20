import { useState, useEffect } from 'react'
import filesApi from './api/files'

import Form from './components/UploadForm'
import FilesList from './components/FilesList'

const { get } = filesApi

function App() {
	const [files, setFiles] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			const files = await get()
			setFiles(state => [...state, ...files])
		}
		
		fetchData()
	}, [])

	return (
		<div className="App">
			<Form 
				setFiles={(files) => setFiles(state => [...state, ...files])}
			/>
			<FilesList
				files={files}
			/>
		</div>
	);
}

export default App;
