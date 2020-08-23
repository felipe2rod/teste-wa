import React, { useState, useEffect }  from 'react'
import {
	View,
	Image,
	Text,
	Button,
	Linking, 
	StyleSheet
 } from 'react-native'

 import { fetchFollowers, fetchFollowing } from '~/services/users'


 const index = ({ navigation }) => {
 	const { user } = navigation.state.params
 	const [userFollowing, setUserFollowing] = useState(0)
 	const [userFollowers, setUserFollowers] = useState(0)

 	const getUsersFollowers = async () => {
 		const usersFollowersList = await fetchFollowers(user.login)
 		setUserFollowers(usersFollowersList.data.length)
 	}

 	const getUsersFollowing = async () => {
 		const usersFollowingList = await fetchFollowing(user.login)
 		setUserFollowing(usersFollowingList.data.length)
 	}

 	useEffect(() => {
 		getUsersFollowers()
 		getUsersFollowing()
 	}, [])

  	return (
 		<View style={styles.container}>
 			<Image
		        source={{uri: user.avatar_url}}
		        style={styles.avatar}
		    />
 			<Text>{user.login}</Text>
 			<Text>{user.userId}</Text>
 			<Text>{user.nodeId}</Text>
 			<Text>Following: {userFollowing}</Text>
 			<Text>Followers: {userFollowers}</Text>
 			<Button title="Abrir página" onPress={() => Linking.openURL(user.html_url)}/>
 		</View>
 	)
 }

 index.navigationOptions = screenProps => ({
    title: `Ver usuário ${screenProps.navigation.state.params.user.login}`
})

const styles = StyleSheet.create({
    container: {
	  	flex:1,
	    marginHorizontal: 16,
  	},
	avatar: {
		flexDirection: 'row',
		alignItems: 'center',
		width: 100,
		height: 100,
		borderRadius: 50
	}
});

 export default index