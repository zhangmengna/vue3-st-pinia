import { defineStore } from 'pinia'
import { getProducts, IProduct } from '../api/shop'

export const useProductsStore = defineStore('products',{
    state: () =>{
        return {
            allProducts: [] as IProduct[]
        }
    },

    getters:{},

    actions:{
        // actions支持异步步操作
        async loadAllProducts(){
            const res = await getProducts()
            this.allProducts = res
        },
        // 支持同步
        decrementProduct(product:IProduct){
            const res = this.allProducts.find((item:IProduct) => item.id === product.id)
            if(res){
                res.inventory--
            }
        },
        incrementProduct(productId:Number){
            const res = this.allProducts.find((item:IProduct) => item.id === productId)
            if(res){
                res.inventory++
            }
        }




    }

})
