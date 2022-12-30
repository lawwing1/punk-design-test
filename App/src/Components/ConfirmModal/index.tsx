/**
 * @file confirmModal
 * @date 2022-12-30
 * @author haodong.wang
 * @lastModify  2022-12-30
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import Modal, { ModalProps } from '../Modal';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
interface ConfirmModalProps extends ModalProps {
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;
    onCancel: () => void;
}
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const ConfirmModal: React.FC<ConfirmModalProps> = ({
    confirmText,
    cancelText,
    onConfirm,
    onCancel,
    ...props
}): JSX.Element => {
    const { width, height, show, children, onClose } = props;
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return <Modal width={width} height={height} show={show} onClose={onClose}></Modal>;
};
export default ConfirmModal;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
