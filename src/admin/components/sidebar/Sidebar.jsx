
import styles from './Sidebar.module.css'
import { SidebarIcons } from '../../data/iconData';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className={`col-lg-2 col-md-2 text-center ${styles.Sidebar}`}>
            <div className={`flex-row flex-md-column ${styles.menu}`}>
                {SidebarIcons.map((item, index) => {
                    return (
                        <Link to={`/${item.heading}`} className={styles.menuItem} key={index} >
                            <item.icon className={styles.icon} />
                            <h3 className={styles.link}>{item.name}</h3>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Sidebar;