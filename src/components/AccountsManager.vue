<script setup lang="ts">
import AccountItem from '@/components/AccountItem.vue'
import { useAccountsStore } from '@/stores/accounts'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const accountsStore = useAccountsStore()
const { accounts } = storeToRefs(accountsStore)

onMounted(() => {
  accountsStore.loadFromLocalStorage()
})

function addAccount() {
  accountsStore.addAccount()
}
const headers = [
  { label: 'Метка', key: 'label' },
  { label: 'Тип записи', key: 'type' },
  { label: 'Логин', key: 'login' },
  { label: 'Пароль', key: 'password' },
]
</script>

<template>
  <div class="accounts-manager">
    <div class="accounts-manager_header">
      <h2 class="accounts-manager_header__title">Управление учётными записями</h2>
      <el-button type="primary" color="lightgray" circle @click="addAccount"> + </el-button>
    </div>
    <div class="accounts-manager_hint" v-if="accountsStore.accounts.length">
      <small>Для указания нескольких меток используйте разделитель ";"</small>
    </div>
    <div class="accounts-manager_hint" v-else>
      <p>Записей нет.</p>
    </div>
    <!-- <pre>{{ accounts }}</pre> -->
    <div class="accounts-manager_list" v-if="accountsStore.accounts.length">
      <el-card class="accounts-manager_list__card" shadow="always">
        <div class="accounts-manager_list_header">
          <p
            class="accounts-manager_list_header__label"
            v-for="(header, idx) in headers"
            :key="idx"
          >
            {{ header.label }}
          </p>
        </div>
        <el-card-body>
          <AccountItem
            v-for="account in accountsStore.accounts"
            :key="account.id"
            :account="account"
            @remove="accountsStore.removeAccount"
          />
        </el-card-body>
      </el-card>
    </div>
  </div>
</template>

<style lang="scss">
.accounts-manager {
  padding: 20px;
  &_header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &_hint {
    margin: 8px 0;
  }
  &_list {
    margin-top: 16px;
    &_header {
      width: calc(100% - 70px);
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      &__label {
        font-weight: bold;
        width: calc(100% / 4);
      }
    }
  }
}
</style>
