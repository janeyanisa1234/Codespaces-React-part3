import './Shop.css';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
function Item(props){
    return (<div key={props.id} onClick={()=>props.callback(props)}>
        <img src={props.img} width={200} height={200}/><br/>
        id: {props.id} <br/>
        name: {props.name}<br/>
        price: {props.price}<br/>
    </div>);
}
export default function Shop(){
    const name_ref=useRef(null);
    const price_ref=useRef(null);
    const img_ref=useRef(null);
    const [products,setProducts]=useState([]);
    const URL ="https://shiny-couscous-4xgqg7pp477hqxv9-5000.app.github.dev";
    useEffect(()=>{
        axios.get(URL+'/api/products')
        .then(response=>{
            setProducts(response.data);
        })
        .catch(error=>{
            console.log("error");
        });
    }
    ,[]);
   
    const [cart,setCart]=useState([]);
    function addCart(item){
         setCart([...cart,{id:item.id,name:item.name,price:item.price,img:item.img}]);
    }
    const productList=products.map(item=><Item {...item} callback={addCart}/>);
    const cartList=cart.map((item,index)=><li>{item.id} {item.name} {item.price} 
        <button onClick={()=>{
            alert('you click'+index)
            setCart(cart.filter((i,_index)=>index!=_index));
            }}>Delete </button> 
        </li>);
        
        let totalprice=0;
        for(let i=0;i<cart.length;i++){
            totalprice+=cart[i].price;
        }
        function addProduct(){
            const data={
               name:name_ref.current.value,
               price:price_ref.current.value,
               img:img_ref.current.value
            };

            axios.get(URL+'/api/products' ,data)
            .then(response=>{
                if(response=>{})
                 setProducts(response.data.products);
            })
            .catch(error=>{
                 console.log("error");
            });
        }

        function delProduct(id){
            axios.delete(URL+'/api/products'+id)
            .then(response=>{
                if (respond.data.status=="ok") alert("Delete product sucsessfully!");
                setProducts(response.data);
            })
            .catch(error=>{
                console.log("error");
            });
        }
        
        return (<>
        name : <input type="text" ref={name_ref} /> 
        price : <input type="text" ref={price_ref}/>
        img : <input type="text" ref={img_ref}/>
        <button onClick= { addProduct}>add</button>

        <div className='grid-container'>{productList}</div>
        <h1>Cart</h1>
        <ol>{cartList}</ol>
        <button onClick={()=>setCart([])}>Clear All</button>
        <h2>Total Price {totalprice}</h2>
        </>);
}