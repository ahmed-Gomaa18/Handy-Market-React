
import styles from './_sidebar.module.css'
import { SidebarIcons } from '../../data/iconData';
import { Link } from 'react-router-dom';


const Sidebar = () => {
    return (
       <div className='{styles.sidebar} col-lg-2 col-md-2 text-center '  >
            <div className={styles.logo}>
                <img src="/images/logo.png" alt=""/>
                <span>
                    H<span>a</span>n<span>d</span>y <span>M</span>a<span>r</span>k<span>e</span>t
                </span>
            </div>

            <div className={styles.menu}>
                {SidebarIcons.map((item, index)=>{

                    return(
                    <div className={styles.menuItem} key={index} >
                        <item.icon/>
                        <Link to={`/${item.heading}`} className={styles.link}>{item.name}</Link>
                    </div>
                    ); 
                })}
                
            </div>
        </div>
    
    );
};

export default Sidebar;