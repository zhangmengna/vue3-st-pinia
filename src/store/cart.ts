import { defineStore } from 'pinia'
import { buyProducts, IProduct } from '../api/shop'
import { useProductsStore } from './products'

type CartProduct = {
    quantity: number
} & Omit<IProduct,'inventory'>

export const useCartStore = defineStore('cart',{
    state: () => {
        return {
            cartProducts:[] as CartProduct[],
            checkoutStatus: null as null | string
        }
    },
    getters:{
        totlePrice(state){
            return state.cartProducts.reduce((total:number,item:CartProduct)=>{
                return total+item.price*item.quantity
            },0)
        },
        isShow(state){
            return state.cartProducts.length===0? true:false
        }
    },
    actions:{
        addProductsToCard(product:IProduct){
            // 查看有无库存
            if(product.inventory <= 0){
                return
            }

            // 检查购物车中是否有该商品
            const cartItem = this.cartProducts.find((item:CartProduct) => item.id === product.id)
            if(cartItem){
                cartItem.quantity++
            }else{
                this.cartProducts.push({
                    id: product.id,
                    title: product.title,
                    price: product.price ,
                    quantity: 1
                })
            }

            // 更新商品列表
            const productsStore = useProductsStore()
            productsStore.decrementProduct(product)
        },
        deleteProduct(product:CartProduct,index:Number){
            if(product.quantity>1){
                const cartItem = this.cartProducts.find((item:CartProduct) => item.id===product.id)
                cartItem.quantity--
            }else{
                this.cartProducts.splice(index,1)
                console.log(this.cartProducts)

            }
            //更新商品列表
            const productsStore = useProductsStore()
            productsStore.incrementProduct(product.id)

        },

        // 结算
        async checkOut(){
            const res = await buyProducts()
            this.checkOutStatus = res ? '结算成功':'结算失败'
            if(res){
                this.cartProducts = []
            }
        }

    }
})
