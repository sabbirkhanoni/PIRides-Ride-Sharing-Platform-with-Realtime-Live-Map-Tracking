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
    },
    GetAddressSuggestionsAPI : {
        url : '/maps/get-suggestions',
        method : 'get'
    },
    GetJourneyDetailsAPI : {
        url : '/journeys/get-ride-details',
        method : 'get'
    },
    startJourneyNowAPI : {
        url : '/journeys/start',
        method : 'post'
    },
    confrimJourneyByRider : {
        url : '/journeys/confirm-by-rider',
        method : 'post'
    }
}

export default SummaryAPI;
