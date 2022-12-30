/**
 * @file Modal
 * @date 2022-12-30
 * @author haodong.wang
 * @lastModify  2022-12-30
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import classnames from '~/Utils/classNames';
import Icon from '../Icon';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
export interface ModalProps {
    width?: string;
    height?: string;
    show: boolean;
    children?: React.ReactNode;
    onClose?: () => void;
}

const createRoot = () => {
    const rootElement = document.createElement('div');
    rootElement.className = 'modal_container__all';

    return rootElement;
};

const rootElement = createRoot();
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Modal: React.FC<ModalProps> = ({
    width = '41.4rem',
    height = '21.2rem',
    show,
    children,
    onClose,
}): JSX.Element => {
    const hasRoot = !!document.getElementsByClassName('modal_container_all')[0];

    useEffect(() => {
        !hasRoot && document.body.appendChild(rootElement);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return ReactDOM.createPortal(
        <div className={classnames(style.modal_container, { [style.show]: show })}>
            <div className={style.modal_mask}></div>
            <div className={style.modal_wrapper} style={{ width: width, height: height }}>
                <div className={style.modal_content}>{children}</div>
                <div className={style.modal_closeIcon} onClick={onClose}>
                    <Icon type="close"></Icon>
                </div>
            </div>
        </div>,
        rootElement,
    );
};

export default Modal;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
