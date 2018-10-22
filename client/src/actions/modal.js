export const DISPLAY_LOADING_MODAL = 'modal/DISPLAY_LOADING_MODAL'
export const HIDE_LOADING_MODAL = 'modal/HIDE_LOADING_MODAL'

export const displayLoadingModal = () => { return dispatch => { dispatch(displayLoadingModalAction()) } }
export const displayLoadingModalAction = () => {
    return {
        type: DISPLAY_LOADING_MODAL
    }
}

export const hideLoadingModal = () => { return dispatch => { dispatch(hideLoadingModalAction()) } }
export const hideLoadingModalAction = () => {
    return {
        type: HIDE_LOADING_MODAL
    }
}

