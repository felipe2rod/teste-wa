import Http from './http'

const fetchUsers = async () => await Http.get('users')
const fetchFollowers = async user => await Http.get(`users/${user}/followers`)
const fetchFollowing = async user => await Http.get(`users/${user}/following`)


export {
	fetchUsers,
	fetchFollowers,
	fetchFollowing
}