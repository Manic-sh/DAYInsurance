import { types } from 'mobx-state-tree'

export const Page = types
  .model({
    pageNumber: types.optional(types.number, 1),
    callApi: types.optional(types.boolean, true)
  })
  .actions(self => ({
    changePage(page) {
      self.pageNumber = page
    },
    setCallApi(value) {
      self.callApi = value
    }
  }))
