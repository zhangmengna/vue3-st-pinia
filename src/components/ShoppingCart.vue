<template>
    <div>
        <h3>我的购物车</h3>
        <p v-if="cartStore.isShow">
            <i>请添加商品到购物车</i>
        </p>
        <ul>
            <li v-for="(item,index) in cartStore.cartProducts" :key="item.id">

            商品名称:{{item.title}},单价：{{item.price}}*数量：{{item.quantity}}

            <button @click="cartStore.deleteProduct(item,index)">删除商品</button>

            </li>
        </ul>
        <div v-if="!cartStore.isShow">
            <p>商品总价:{{cartStore.totlePrice}}</p>
            <p>
                <button @click="cartStore.checkOut">结算</button>
            </p>
        </div>
        <p style="color:red;">{{ cartStore.checkOutStatus }}</p>
    </div>

</template>

<script setup lang="ts">

import { useCartStore } from '../store/cart'
const cartStore = useCartStore()


</script>

<style scoped>

</style>