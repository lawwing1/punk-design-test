/**
 * @file
 * @date 2022-07-11
 * @author haodong.wang
 * @lastModify  2022-07-11
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React from 'react';
import style from './style.scss';
import {
    leftOutlined,
    rightOutlined,
    verticalLeftOutlined,
    verticalRightOutlined,
} from './iconData';
import classnames from '~/Utils/classNames';

/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface iconProps {
    type: string;
    className?: string;
    onClick?: () => void;
}

const iconObj = {
    leftOutlined,
    rightOutlined,
    verticalLeftOutlined,
    verticalRightOutlined,
};

/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Icon: React.FC<iconProps> = ({ type, onClick, className }): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const iconClass = classnames([
        style.Icon,
        {
            className: className || '',
        },
    ]);
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <>
            <div className={iconClass} onClick={onClick}>
                {iconObj[type]}
            </div>
        </>
    );
};
export default Icon;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
