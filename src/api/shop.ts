// mockiing

export interface IProduct {
    id: number
    title: string
    price: number
    inventory: number  //库存
}

const _products: IProduct[] = [
    {id:1, title: '商品1', price: 100.01, inventory: 2},
    {id:2, title: '商品2', price: 200.99, inventory: 10},
    {id:3, title: '商品3', price: 50.99, inventory: 5},
]

export const getProducts = async () =>{
    await wait(1000)
    return _products
}

export const buyProducts = async () =>{
    await wait(1000)
    return Math.random()>0.5
}

async function wait(delay:number){
    return new Promise(resolve => setTimeout(resolve,delay))
}