import { BasketStore } from './BasketStore'
import { PurchaseStore } from './PurchaseStore'


class RootStore {
  constructor() {
    this.basketStore = new BasketStore(this)
    this.purchaseStore = new PurchaseStore(this)
  }
}

export default RootStore
