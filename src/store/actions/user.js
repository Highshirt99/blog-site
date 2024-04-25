import { userActions } from "../reducers/userReducers";

export const logout = (type) => (dispatch) => {
 dispatch(userActions.resetUserInfo())
 localStorage.removeItem("account")
};
