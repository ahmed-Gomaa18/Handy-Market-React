import { BsFillCartFill } from 'react-icons/bs';
import styles from './AddItemToCart.module.css';
import { ToastContainer, toast } from 'react-toastify';


const AddItemToCart = (props) => {
  
    const {item} = props;

    let items = [];


    const addToLocalStorage =(data)=>{
      localStorage.setItem("data-cart",JSON.stringify(data));
      window.dispatchEvent(new Event('storage'));
    };

    const addItem = (item)=>{
      if (props.removeProduct) {
        props.removeProduct(item)
      }
      
      let dataLocal = JSON.parse(localStorage.getItem('data-cart'));
      if (dataLocal != null && dataLocal.length > 0){
        items = dataLocal;
      }
      let exist = items?.find((elm)=>elm._id === item._id);
      if (exist) {
        let cart =items?.map((elm)=>elm._id===item._id?{...exist,qty:exist.qty+1}:elm);
        addToLocalStorage(cart);
      }else{

        let itemAraay = [...items , {...item,qty:1}];
        addToLocalStorage(itemAraay);
      }

      toast.info('🛒 This Product was Added To Your Cart', {
        position: "top-right",
        autoClose: 3000,

      })

    };
  
  return (
    <>
    <span onClick={()=>{addItem(item)}}>
    < BsFillCartFill className={styles.add_item} /> Add to cart
    </span>

     {/* <button onClick={()=>{addItem(item)}} className='btn mainColor text-white w-100'>Add to cart</button> */}
    </>
  )
}

export default AddItemToCart;


//class="btn mb-2 mb-md-0 btn-round btn-outline" onClick={()=>{addItem(item)}}