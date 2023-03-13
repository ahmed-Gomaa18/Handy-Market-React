import React, { useState } from "react";
import styles from  "./Card.module.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { motion, LayoutGroup } from "framer-motion";
import { UilTimes } from "@iconscout/react-unicons";
import Chart from "react-apexcharts";
import { carddata } from '../../data/iconData';
const Card = (props) => {
  const [expanded, setExpanded] = useState(false);
  return (
    // <LayoutGroup>
    //   {expanded ? (
    //     <ExpandedCard param={props} setExpanded={() => setExpanded(false)} />
    //   ) : (
        <CompactCard param={props} setExpanded={() => setExpanded(true)} />
    //   )}
    // </LayoutGroup>
  );
};

const CompactCard = ({ param, setExpanded }) => {
  const Png = param.png;
  return (
    <motion.div
      className={styles.CompactCard}
      style={{ background: param.color.backGround,boxShadow: param.color.boxShadow }}
      layoutId="expandableCard"
      onClick={setExpanded}
    >
      <div className={styles.radialBar}>
        <CircularProgressbar value={param.barValue} text={`${param.barValue}%`}/>
        <span>{param.title}</span>
      </div>
      <div className={styles.detail}>
        <Png />
        <span>{param.value} LE</span>
        <span>Last 24 hours</span>
      </div>
    </motion.div>
  );
}

const ExpandedCard =({ param, setExpanded })=> {

  return (
    <motion.div className={styles.ExpandedCard}
      style={{background: param.color.backGround, boxShadow: param.color.boxShadow,}}
      layoutId="expandableCard"
    >
      <div className={styles.clicking}>
        <UilTimes onClick={setExpanded} />
      </div>
      <span>{param.title}</span>  
      <div className="chartContainer">
        <Chart options={carddata.options} series={param.series} type="area" />
      </div>
      <span>Last 24 hours</span>
    </motion.div>
  );
}

export default Card;
