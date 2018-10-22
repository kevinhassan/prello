export const DISPLAY_LOADING_MODAL = 'modal/DISPLAY_LOADING_MODAL';
export const HIDE_LOADING_MODAL = 'modal/HIDE_LOADING_MODAL';

export const displayLoadingModal = () => (dispatch) => { dispatch(displayLoadingModalAction()); };
export const displayLoadingModalAction = () => ({
  type: DISPLAY_LOADING_MODAL,
});

export const hideLoadingModal = () => (dispatch) => { dispatch(hideLoadingModalAction()); };
export const hideLoadingModalAction = () => ({
  type: HIDE_LOADING_MODAL,
});
