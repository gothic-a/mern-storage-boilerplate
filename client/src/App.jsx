import { useState, useEffect } from 'react'
import filesApi from './api/files'

import { StyledApp } from './styled'
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
		<StyledApp>
			<Form 
				setFiles={(files) => setFiles(state => [...state, ...files])}
			/>
			<FilesList
				files={files}
				setFiles={setFiles}
			/>
		</StyledApp>
	);
}

export default App;
