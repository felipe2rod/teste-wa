import React from 'react'
import { 
	StatusBar,
	View,
	Text
 } from 'react-native'
import Routes from './routes';

const App = () => {
	return(
		<>
			<StatusBar barStyle="light-content" backgroundColor="#F36B7F" />
			<Routes />
		</>
	)
}

export default App