import { flow, types } from "mobx-state-tree";
import { PostLoginDetails, GetUserInfo } from "../api/login";

export const UserInfo = types.model({
  Name: types.optional(types.string, ""),
  Role: types.optional(types.string, ""),
  MemberID: types.optional(types.string, ""),
  Userid: types.optional(types.string, ""),
  EmailID: types.optional(types.string, ""),
});

export const Login = types
  .model({
    userinfo: types.optional(types.array(UserInfo), []),
  })
  .actions((self) => ({
    setUserInfo(values) {
      sessionStorage.setItem("UserInfo", JSON.stringify(values));
    },
    getUserInfo() {
      return JSON.parse(sessionStorage.getItem("UserInfo"));
    },
    saveLogin: flow(function* saveLogin(payload) {
      try {
        const res = yield PostLoginDetails(payload);
        return res;
      } catch (error) {
        return error;
      }
    }),
    fetchUserInfo: flow(function* fetchUserInfo(payload) {
      try {
        const data = yield GetUserInfo({ UserID: payload.username });
        return data;
      } catch (error) {
        return error;
      }
    }),
  }));
