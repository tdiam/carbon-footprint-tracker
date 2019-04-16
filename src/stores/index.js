import { BasketStore } from './BasketStore'


class RootStore {
  constructor() {
    this.basketStore = new BasketStore(this)
  }
}

export default RootStore
