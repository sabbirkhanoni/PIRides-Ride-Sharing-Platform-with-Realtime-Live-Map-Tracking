//backend server url
export const baseURL = import.meta.env.VITE_BASE_URL;

const SummaryAPI = {
    UserRegisterAPI : {
        url : '/users/register',
        method : 'post'
    },
    UserLoginAPI : {
        url : '/users/login',
        method : 'post'
    },
    UserProfileAPI : {
        url : '/users/profile',
        method : 'get'
    },
    UserLogoutAPI : {
        url : '/users/logout',
        method : 'get'
    },
    RiderRegisterAPI : {
        url : '/riders/register',
        method : 'post'
    },
    RiderLoginAPI : {
        url : '/riders/login',
        method : 'post'
    },
    RiderProfileAPI : {
        url : '/riders/profile',
        method : 'get'
    },
    RiderLogoutAPI : {
        url : '/riders/logout',
        method : 'get'
    }
}

export default SummaryAPI;
