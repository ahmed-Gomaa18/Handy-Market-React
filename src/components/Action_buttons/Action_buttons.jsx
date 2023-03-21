import { IoAdd } from "react-icons/io5";
import { AiOutlineMinus } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import styles from './Action_buttons.module.css';
import { useTranslation } from "react-i18next";

const Action_buttons = (props) => {
  let items = [];
  const { t } = useTranslation();
  const { item } = props;
  const addToLocalStorage = (data) => {
    localStorage.setItem("data-cart", JSON.stringify(data));
    window.dispatchEvent(new Event('storage'));
  };

  const dataLoca = () => {
    let dataLocal = JSON.parse(localStorage.getItem('data-cart'));
    if (dataLocal != null && dataLocal.length > 0) {
      items = dataLocal;
    }
  }

  const addItem = (item) => {
    dataLoca();
    let exist = items?.find((elm) => elm._id === item._id);
    if (exist) {
      let cart = items?.map((elm) => elm._id === item._id ? { ...exist, qty: exist.qty + 1 } : elm);
      addToLocalStorage(cart);
    } else {

      let itemAraay = [...items, { ...item, qty: 1 }];
      addToLocalStorage(itemAraay);
    }
  };

  const removeItem = (item) => {
    dataLoca()
    let exist = items.find((elm) => elm._id === item._id);
    if (exist.qty > 1) {
      let cart = items.map((elm) => elm._id === item._id ? { ...exist, qty: exist.qty - 1 } : elm);
      addToLocalStorage(cart)
    } 
    // else {
    //   removeProduct(item);
    // }
  };

  const removeProduct = (item) => {
    dataLoca()
    let cart = items.filter((elm) => elm._id !== item._id);
    addToLocalStorage(cart)
  };

  return (
    <div className="d-flex justify-content-between">
      <div className="btn_qun">
      <button onClick={() => { addItem(item) }} className={`text-center ${styles.action_btn} ${styles.btn_inc}`}><IoAdd /></button>

      <span className="px-3">{item.qty}</span>

      <button onClick={() => { removeItem(item) }} className={`text-center ${styles.action_btn} ${styles.btn_dec}`}><AiOutlineMinus /></button>
      </div>

      <div className="btn_remove">
      <button onClick={() => { removeProduct(item) }} className={`text-center ${styles.action_btn} ${styles.btn_delete}`}>
        <BiTrash className="me-1" /> {t("Remove")}
      </button>
      </div>

    </div>
  )
}

export default Action_buttons