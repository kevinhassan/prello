// import * as APIFetch from '../helpers/APIFetch';
// import {
//     hideLoadingModal, displayErrorMessage,
// } from './modal';

// // ===== Member search ===== //
// export const MEMBER_SEARCH_STARTED = 'search/MEMBER_SEARCH_STARTED';
// export const MEMBER_SEARCH_FAILURE = 'search/MEMBER_SEARCH_FAILURE';
// export const MEMBER_SEARCH_SUCCESS = 'search/MEMBER_SEARCH_SUCCESS';

// export const memberSearchStartedAction = () => ({ type: MEMBER_SEARCH_STARTED });
// export const memberSearchFailureAction = error => ({
//     type: MEMBER_SEARCH_FAILURE,
//     payload: {
//         error,
//     },
// });
// export const memberSearchSuccessAction = members => ({
//     type: MEMBER_SEARCH_SUCCESS,
//     payload: {
//         members,
//     },
// });

// export const memberSearch = username => (dispatch) => {
//     dispatch(memberSearchStartedAction());
//     const resource = 'search/members'.concat(`?username=${username}`);
//     APIFetch.fetchPrelloAPI(resource, APIFetch.GET)
//         .then((res) => {
//             console.log(res.data.members);
//             dispatch(memberSearchSuccessAction(res.data.members));
//         })
//         .catch((error) => {
//             dispatch(displayErrorMessage(error.response.data.error));
//             dispatch(memberSearchFailureAction(error.response.data.error));
//         })
//         .finally(() => {
//             dispatch(hideLoadingModal());
//         });
// };
