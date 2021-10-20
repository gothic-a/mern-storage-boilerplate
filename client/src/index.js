import React from 'react';
import ReactDOM from 'react-dom';
import { createGlobalStyle } from 'styled-components'
import App from './App';

const GlobalStyle = createGlobalStyle`
	body {
		padding: 0;
		margin: 0;
	}

	* {
		font-family: Roboto, Arial;
	}

	ul {
		margin: 0;
		padding: 0;

		& > li {
			list-style-type: none;
		} 
	}

	button {
		cursor: pointer;
	}
`

ReactDOM.render(
	<React.StrictMode>
		<GlobalStyle />
		<App />
	</React.StrictMode>,
	document.getElementById('root')
);
