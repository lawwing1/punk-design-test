/**
 * @file loading
 * @date 2022-12-30
 * @author haodong.wang
 * @lastModify  2022-12-30
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import classnames from '~/Utils/classNames';
import style from './style.scss';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
interface LoadingProps {
    width?: string;
    height?: string;
    type?: 'circle';
}
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Loading: React.FC<LoadingProps> = ({
    width = '3rem',
    height = '3rem',
    type = 'circle',
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={style.loading_container}>
            <div
                className={classnames(style.loading_content, style[type])}
                style={{ width: width, height: height }}
            ></div>
        </div>
    );
};
export default Loading;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
