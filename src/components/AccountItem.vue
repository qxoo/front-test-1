<script setup lang="ts">
import { useAccountsStore } from '@/stores/accounts'
import { reactive } from 'vue'

interface LabelItem {
  text: string
}

type AccountType = 'LDAP' | 'Локальная'

interface Account {
  id: string
  label: LabelItem[]
  login: string
  password: string | null
  type: AccountType
  tempLabel?: string
  tempLogin?: string
  tempType?: AccountType
  tempPassword?: string
}

interface FieldErrors {
  label?: boolean
  login?: boolean
  password?: boolean
}

const props = defineProps<{ account: Account }>()
const emit = defineEmits<{ (e: 'remove', id: string): void }>()

const accountsStore = useAccountsStore()

const { account } = props
const errors = reactive<FieldErrors>({})

if (account.tempLabel === undefined) {
  account.tempLabel = account.label.map((l) => l.text).join('; ')
}
if (account.tempLogin === undefined) {
  account.tempLogin = account.login
}
if (account.tempType === undefined) {
  account.tempType = account.type
}
if (account.tempType === 'Локальная' && account.tempPassword === undefined) {
  account.tempPassword = account.password || ''
}

function validateAndUpdate(): void {
  let valid = true

  if (!account.tempLogin || account.tempLogin.trim() === '' || account.tempLogin.length > 100) {
    valid = false
    errors.login = true
  } else {
    errors.login = false
  }

  if (account.tempType === 'Локальная') {
    if (!account.tempPassword || account.tempPassword.length > 100) {
      valid = false
      errors.password = true
    } else {
      errors.password = false
    }
  }

  if (account.tempLabel && account.tempLabel.length > 50) {
    valid = false
    errors.label = true
  } else {
    errors.label = false
  }

  if (valid) {
    const labelArray = account.tempLabel
      ? account.tempLabel
          .split(';')
          .map((s) => s.trim())
          .filter((s) => s)
      : []
    const transformedLabel = labelArray.map((s: string) => ({ text: s }))

    const updatedAccount: Account = {
      id: account.id,
      label: transformedLabel,
      type: account.tempType as AccountType,
      login: account.tempLogin as string,
      password: account.tempType === 'LDAP' ? null : (account.tempPassword as string),
    }

    accountsStore.updateAccount(updatedAccount)
  }
}

function onLabelBlur() {
  validateAndUpdate()
}

function onLoginBlur() {
  validateAndUpdate()
}

function onPasswordBlur() {
  validateAndUpdate()
}

function onTypeChange(value: AccountType) {
  account.tempType = value
  if (value === 'LDAP') {
    account.tempPassword = ''
  }
  validateAndUpdate()
}

function removeAccount() {
  emit('remove', account.id)
}
</script>

<template>
  <el-form label-position="top" size="small" class="account-item__form">
    <el-form-item
      :status="errors.label ? 'error' : ''"
      :error="errors.label ? 'Максимум 50 символов' : ''"
      class="account-item__form-item account-item__form-item--unchanged"
    >
      <el-input
        v-model="account.tempLabel"
        placeholder="Введите метки"
        maxlength="50"
        @blur="onLabelBlur"
      ></el-input>
    </el-form-item>

    <el-form-item class="account-item__form-item account-item__form-item--unchanged">
      <el-select v-model="account.tempType" @change="onTypeChange">
        <el-option label="LDAP" value="LDAP"></el-option>
        <el-option label="Локальная" value="Локальная"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item
      class="account-item__form-item"
      :status="errors.login ? 'error' : ''"
      :error="errors.login ? 'Обязательное поле.' : ''"
    >
      <el-input
        v-model="account.tempLogin"
        placeholder="Введите логин"
        maxlength="100"
        @blur="onLoginBlur"
      ></el-input>
    </el-form-item>

    <el-form-item
      class="account-item__form-item"
      v-if="account.tempType === 'Локальная'"
      :status="errors.password ? 'error' : ''"
      :error="errors.password ? 'Обязательное поле.' : ''"
    >
      <el-input
        v-model="account.tempPassword"
        type="password"
        placeholder="Введите пароль"
        maxlength="100"
        @blur="onPasswordBlur"
      ></el-input>
    </el-form-item>
    <div class="account-item__actions">
      <el-button color="lightgray" size="small" @click="removeAccount">Удалить</el-button>
    </div>
  </el-form>
</template>

<style lang="scss">
.account-item {
  padding: 16px;
  background-color: var(--color-background);
  &__form {
    display: flex;
    gap: 8px;
    align-items: center;
    justify-content: center;
    margin: 16px 0;
    &-item {
      flex: 1;
      margin: 0;
      &--unchanged {
        max-width: calc(25% - 26px);
      }
    }
  }
}
</style>
