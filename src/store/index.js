import { types } from "mobx-state-tree";
import { Page } from "./pages";
import { Insurance } from "./insurance";
import { Quotes } from "./quotes";
import { Proposal } from "./proposal";
import { Login } from "./login";

export const RootStore = types.model({
  page: types.optional(Page, {}),
  insurance: types.optional(Insurance, {}),
  quotes: types.optional(Quotes, {}),
  proposal: types.optional(Proposal, {}),
  login: types.optional(Login, {}),
});
