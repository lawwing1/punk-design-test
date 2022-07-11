/**
 * @file
 * @date 2020-12-01
 * @author
 * @lastModify  2020-12-01
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useState, useEffect } from 'react';
import Pagination from '../../Components/Pagination';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const pageLen = 4;
const animateTime = 700;
const animateDuration = 'ease';
const HomePage = (): JSX.Element => {
    /* <------------------------------------ **** HOOKS START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    // // y轴位置
    // const [currentPage, setCurrentPage] = useState(0);
    // //  是否滑动
    // const [isScroll, setIsScroll] = useState(0);
    // // 屏幕高度
    // const [sizeY, setSizeY] = useState(document.documentElement.clientHeight);

    // useEffect(() => {
    //     window.addEventListener("mousewheel", handlePageScroll, false)
    //     window.addEventListener("resize", handleWindowSize, false);
    //     return () => {
    //         window.removeEventListener("mousewheel", handlePageScroll, false);
    //         window.removeEventListener("resize", handleWindowSize, false);
    //     }
    // }, [currentPage, sizeY])

    // const handlePageScroll = (e) => {
    //     if (Date.now() - isScroll < animateTime) return;
    //     setIsScroll(Date.now());
    //     e.deltaY > 0 ? currentPage + 1 < pageLen && setCurrentPage(currentPage + 1) : currentPage - 1 >= 0 && setCurrentPage(currentPage - 1);
    // }

    // const handleWindowSize = () => {
    //     setSizeY(document.documentElement.clientHeight);
    // }

    // const getPosY = () => {
    //     return {
    //         transform: `translateY(${-currentPage * sizeY}px)`,
    //         transition: `all ${animateTime}ms ${animateDuration} 0s`
    //     }
    // }
    const [currentPos, setCurrentPos] = useState(0);
    const [isScroll, setIsScroll] = useState(true);

    useEffect(() => {
        if (!isScroll) return;
        document
            .getElementsByClassName('fullpage')[0]
            .addEventListener('mousewheel', windowmousewheel, false);
        return () => {
            document
                .getElementsByClassName('fullpage')[0]
                .removeEventListener('mousewheel', windowmousewheel, false);
        };
    }, [currentPos, isScroll]);

    const windowmousewheel = (e) => {
        e.deltaY > 0 ? setCurrentPos(currentPos - 100) : setCurrentPos(currentPos + 100);
    };

    const changeScroll = (num: number) => {
        num ? setIsScroll(false) : setIsScroll(true);
    };

    const [current, setCurrent] = useState(1);
    /* <------------------------------------ **** HOOKS END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const onChangeCurrent = (res: number) => {
        setCurrent(res);
        console.log(res);
    };
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <>
            <div className={style.fullpage} style={{ transform: `translateY(${currentPos}px)` }}>
                {/* <div className={style.section + " " + (currentPage === 0 ? "active" : "")} style={{ "height": sizeY + "px" }}>
                <PageOne></PageOne>
            </div>
            <div className={style.section + " " + (currentPage === 1 ? "active" : "")} style={{ "height": sizeY + "px" }}>
                <PageTwo></PageTwo>
            </div>
            <div className={style.section + " " + (currentPage === 2 ? "active" : "")} style={{ "height": sizeY + "px" }}>
                <PageThree></PageThree>
            </div>
            <div className={style.section + " " + (currentPage === 3 ? "active" : "")} style={{ "height": sizeY + "px" }}>
                <PageFour></PageFour>
            </div> */}
                <Pagination
                    count={100}
                    type="default"
                    current={current}
                    onChange={onChangeCurrent}
                />
            </div>
        </>
    );
};
export default HomePage;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
