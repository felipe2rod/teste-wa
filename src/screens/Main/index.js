import React, { useState, useEffect, useCallback }  from 'react'
import {
	View,
	FlatList,
	StyleSheet,
	Text,
	TextInput,
	Button
 } from 'react-native'


import { fetchUsers } from '~/services/users'

 const index = ({ navigation }) => {

 	const [users, setUsers] = useState([])
 	const [searching, setSearching] = useState(false)
 	const [showDeleted, setShowDeleted] = useState(false)
 	const [filteredUsers, setFilteredUsers] = useState([])
 	const [, updateState] = useState()
 	const forceUpdate = useCallback(() => updateState({}), [])

 	const getUsersList = async () => {
 		const usersList = await fetchUsers()
 		setUsers(usersList.data.slice(0, 10).map(e => {
 			e.deleted = false
 			return e
 		}))
 	}

 	const toggleDeleted = user => {
		const userList = users
		const objIndex = userList.findIndex((obj => obj.id == user.id));
		userList[objIndex].deleted = !userList[objIndex].deleted
		setUsers(userList)
		forceUpdate()
 	}

 	const toggleUsersDeleted = () => {
 		setShowDeleted(!showDeleted)
 	}

 	const handleSearch = evt => {
 		const {eventCount, target, text} = evt.nativeEvent;
 		setSearching(!text == '')
 		setFilteredUsers(users.filter((e) => (e.login.includes(text) || e.id == text)))
 		//console.log(text == '')
 	}

 	useEffect(() => {
 		getUsersList()
 	}, [])

 	useEffect(() => {
 		console.log(users)
 	}, [users])

 	return (
 		<View style={styles.container}>
 			<TextInput placeholder="Buscar usuário" onChange={evt => handleSearch(evt)}/>
 			<Button title={!showDeleted ? "Mostrar deletados" : "Mostrar não deletados"} onPress={() => toggleUsersDeleted()}/>
 			<FlatList
 				data={searching ? filteredUsers : users}
 				keyExtractor={user => user.id.toString()}
  				renderItem={({ item }) => {
  					if(item.deleted == showDeleted)
  					return (
	 					<View style={styles.item}>
	 						<Text>userId: {item.id}</Text>
	 						<Text>nodeId: {item.node_id}</Text>
	 						<Text>html_url: {item.html_url}</Text>
	 						<Text>avatar_url: {item.avatar_url}</Text>
	 						<Text>login: {item.login}</Text>
	 						<Button
						        title="Ver Perfil"
						        onPress={() => navigation.navigate('User', {
						        	user: {
							        	login: item.login,
							        	html_url: item.html_url,
							        	avatar_url: item.avatar_url,
							        	nodeId: item.node_id,
							        	userId: item.id
							        }
						        })}
						      />
						      <Button color="#d93025" style={styles.delete} title={item.deleted ? "Restaurar usuário" : "Deletar usuário"} onPress={() => toggleDeleted(item)}/>
	 					</View>
	 				)
  				}}

 			/>
 			<Text>Mainaa</Text>
 		</View>
 	)
 }


index.navigationOptions = screenProps => ({
    title: 'Lista de usuários'
})


const styles = StyleSheet.create({
  container: {
  	flex:1,
  	justifyContent: 'center',
    marginHorizontal: 16,

  },
  delete: {
  	flex:1,
  	marginVertical: 15
  },
  item: {
  	flex:1,
    marginBottom: 15,
    padding: 5,
    backgroundColor: "#F5FCFF"
  }
});

 export default index