import { defineStore } from 'pinia'

export type AccountType = 'LDAP' | 'Локальная'

export interface Label {
  text: string
}

export interface Account {
  id: string
  // Храним метку как массив объектов с полем text
  label: Label[]
  type: AccountType
  login: string
  // Для LDAP хранится как null, для локальной – введённое значение
  password: string | null
}

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: [] as Account[],
  }),
  actions: {
    addAccount() {
      // При добавлении новая запись по умолчанию с типом "Локальная"
      const newAccount: Account = {
        id: Date.now().toString(),
        label: [],
        type: 'Локальная',
        login: '',
        password: '',
      }
      this.accounts.push(newAccount)
      this.saveToLocalStorage()
    },
    removeAccount(id: string) {
      this.accounts = this.accounts.filter((acc) => acc.id !== id)
      this.saveToLocalStorage()
    },
    updateAccount(updated: Account) {
      const index = this.accounts.findIndex((acc) => acc.id === updated.id)
      if (index !== -1) {
        this.accounts[index] = updated
      }
      this.saveToLocalStorage()
    },
    saveToLocalStorage() {
      localStorage.setItem('accounts', JSON.stringify(this.accounts))
    },
    loadFromLocalStorage() {
      const data = localStorage.getItem('accounts')
      if (data) {
        try {
          this.accounts = JSON.parse(data)
        } catch {}
      }
    },
  },
})
