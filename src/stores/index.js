import { BasketStore } from './BasketStore'
import { PurchaseStore } from './PurchaseStore'
import { CategoryStore } from './CategoryStore'
import { ExperimentStore } from './ExperimentStore'
import { SettingsStore } from './SettingsStore'


class RootStore {
  constructor() {
    this.init()
  }

  init = () => {
    this.basketStore = new BasketStore(this)
    this.purchaseStore = new PurchaseStore(this)
    this.categoryStore = new CategoryStore(this)
    this.experimentStore = new ExperimentStore(this)
    this.settingsStore = new SettingsStore(this)
  }
}

export default RootStore
