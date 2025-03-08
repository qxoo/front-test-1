<template>
  <div class="accountsPage">
    <!-- <h1 class="accountsPage__title">главная</h1> -->
    <AccountsManager />
  </div>
</template>

<script setup lang="ts">
import AccountsManager from '@/components/AccountsManager.vue'
</script>

<style lang="scss">
.accountsPage {
  padding: 20px;
  &__title {
    margin-bottom: 20px;
    font-size: 24px;
    text-align: center;
  }
}
</style>
