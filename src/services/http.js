import axios from 'axios';

const getBaseURL = () => {
	return 'https://api.github.com/';
};

// Caso as rotas possuam Authorization, Token, ou algum Header compartilhado
// entre todas as rotas, deve-se definir na instancia do cliente HTTP
const axiosInstance = axios.create({
	baseURL: getBaseURL(),
	headers: {
		accept: 'application/json',
	},
});

// Se necessario realizar a interceptação de alguma request,
// como renovação de token, por exemplo, o trecho asseguir pode auxiliar.
axiosInstance.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		return Promise.reject(error);
	}
);

export default axiosInstance;
