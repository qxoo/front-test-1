<script setup lang="ts">
// const { access_token, fetchUser, logoutUser } = toRefs(useUserStore())
// const { fetchCart } = toRefs(useCartStore())
// const { fetchFavourites } = toRefs(useFavouritesStore())
// const { fetchOrders } = toRefs(useOrderStore())
const { isMobileSidebarShow } = toRefs(useAppStore())

const isTabletScreen = useMediaQuery('(min-width: 1224px)')

// if (access_token.value) {
//   const user = await fetchUser.value()

//   if (!user) {
//     await logoutUser.value()
//     navigateTo('/auth')
//   }

//   const userCart = await fetchCart.value()
//   const userFavourites = await fetchFavourites.value()
//   const orders = await fetchOrders.value()
//   console.log(orders)
// }

watch(
  () => isTabletScreen.value,
  () => {
    if (!isTabletScreen.value) isMobileSidebarShow.value = false
    else isMobileSidebarShow.value = true
  },
  {
    deep: true,
    immediate: true,
  }
)
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style lang="scss">
@import './assets/scss/app.scss';
</style>
