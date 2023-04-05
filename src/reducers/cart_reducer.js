import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {

  if(action.type===ADD_TO_CART){

    const {id,color,amount,product}=action.payload;

    const tempItem=state.cart.find((item)=>item.id===id+color)

    if(tempItem){

      const tempCart=state.cart.map((cartItem)=>{

        if(cartItem.id===id+color){

          let newAmount=cartItem.amount+amount;
          
          if(newAmount>cartItem.max){
             newAmount=cartItem.max;
          }

          return {...cartItem,amount:newAmount}
          

        }else{
          return cartItem;

        }

      })

      return {...state,cart:tempCart}



    }else{
      const newItem={

        id:id+color,
        name:product.name,
        color:color,
        amount,
        image:product.images[0].url,
        price:product.price,
        max:product.stock,
      };

      return {...state,cart:[...state.cart,newItem]}
    }



  }

  if(action.type===REMOVE_CART_ITEM){
    const tempCart=state.cart.filter((item)=>item.id!==action.payload)
    return {...state,cart:tempCart}
  }

  if(action.type===CLEAR_CART){
    return {...state,cart:[]}
  }

  if(action.type===TOGGLE_CART_ITEM_AMOUNT){

    const {id,value}=action.payload;

    const tempCart=state.cart.map((cartItem)=>{

      if(cartItem.id===id){

        let newAmount=cartItem.amount;

        if(value==='inc'){
          newAmount=cartItem.amount+1;
          if(newAmount>cartItem.max){
            newAmount=cartItem.max;
          }
        }
        if(value==='dec'){
          newAmount=cartItem.amount-1;
          if(newAmount<1){
            newAmount=1;
          }
        }

        return {...cartItem,amount:newAmount}


      }else{
        return cartItem;
      }

    })


    return {...state,cart:tempCart}

 
  }

  if(action.type===COUNT_CART_TOTALS){

     const {orderTotal,numberItems}=state.cart.reduce((result,item)=>{

      const {price,amount}=item;

      result.numberItems+=amount;

      result.orderTotal+=(price*amount);

      return result;

    },{orderTotal:0,numberItems:0})



    return {...state,total_items:numberItems,total_amount:orderTotal}
  }



  
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
