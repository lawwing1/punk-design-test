/**
 * @file
 * @date 2020-12-01
 * @author
 * @lastModify  2020-12-01
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { useState } from 'react';
import Pagination from '../../Components/Pagination';
// import Scroll from '~/Components/Scroll';
import style from './style.scss';
import Notice from '~/Components/Notice';
import Modal from '~/Components/Modal';
import Loading from '~/Components/Loading';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const HomePage = (): JSX.Element => {
    /* <------------------------------------ **** HOOKS START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [current, setCurrent] = useState(1);

    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    /* <------------------------------------ **** HOOKS END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    const onChangeCurrent = (res: number) => {
        console.log(res);
        setCurrent(res);
    };
    const handleClick = () => {
        Notice({
            type: 'warning',
            title: '成功',
            message: '这是一条信息',
        });
    };

    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <>
            <div className={style.fullpage}>
                <Pagination count={100} type="solid" current={current} onChange={onChangeCurrent} />

                {/* <Scroll width="400px" height="300px">
                    <div className="email_box" style={{ background: 'rgba(0,0,0,0.3)' }}>
                        111
                    </div>
                </Scroll> */}

                <button className={style.homePage_btn} onClick={handleClick}>
                    click
                </button>

                <button className={style.homePage_btn} onClick={() => setShow(true)}>
                    click show
                </button>

                <button className={style.homePage_btn} onClick={() => setShow1(true)}>
                    click show1
                </button>

                <Modal show={show} onClose={() => setShow(false)}>
                    hehe
                </Modal>
                <Modal show={show1} onClose={() => setShow1(false)}>
                    11
                </Modal>

                <Loading></Loading>
            </div>
        </>
    );
};
export default HomePage;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
