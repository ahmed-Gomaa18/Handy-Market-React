import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { BsFillSuitHeartFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const ExpandMore = styled((props) => {
 

  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Product(props) {
  const { t, i18n } = useTranslation();
  const { product_name, price, description, photos, _id, unFavorite } = props;
  //const sorcImag = 'http://localhost:3000/api/v1/image'

  function handleChange() {
    // if (!e.target.checked)
      unFavorite(_id)
  }

  let img = "";
  if (photos && photos.length > 0)
    img = photos[0]
  return (
    <>
      <div className="product-grid col-md-4">
        <div className="product-image">
          <Link id='link' to="#" className="image h-100 d-flex align-items-center">
            {photos && <img className="h-100" src={`${img}`} alt='photoTwo' />}
          </Link>
          <ul className="social"> 
           <li><Link id='link' onClick={handleChange} data-tip={t("Remove from Favorite")}> <i><BsFillSuitHeartFill /></i></Link></li>
          </ul>
        </div>


        <div className="product-content">
          <h3 className="title"><Link id='link' to="#">{product_name.split(" ").splice(0, 2).concat(" ").join(" ")}</Link></h3>
          <div className="price">{price}LE</div>
        </div>
      </div>
    </>
  );
}

