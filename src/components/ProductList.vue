<template>
   <ul>
        <li v-for="item in productsStore.allProducts" :key='item.id'>
            <span>名称：{{ item.title }}</span>—
            
            <span>库存：{{ item.inventory }}</span>—
            <span>价格：{{ item.price }}</span>
            <button :disabled="!item.inventory" @click="cartStore.addProductsToCard(item)">添加到购物车</button>
        </li>
   </ul>
</template>

<script setup lang="ts">
import { useProductsStore } from '../store/products'
import { useCartStore } from '../store/cart'

const productsStore = useProductsStore()
const cartStore = useCartStore()

productsStore.loadAllProducts()



</script>

<style scoped>

</style>