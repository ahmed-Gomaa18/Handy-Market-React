
import styles from './Sidebar.module.css'
import { SidebarIcons } from '../../data/iconData';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className={`col-lg-2 col-md-2 text-center ${styles.sidebar}`}>
            <div className={styles.logo}>
                <img src="/images/logo.png" alt="logo" />
                <span>
                    H<span>a</span>n<span>d</span>y <span>M</span>a<span>r</span>k<span>e</span>t
                </span>
            </div>

            <div className={styles.menu}>
                {SidebarIcons.map((item, index) => {
                    return (
                        <div className={styles.menuItem} key={index} >
                            <item.icon />
                            <Link to={`/${item.heading}`} className={styles.link}>{item.name}</Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Sidebar;