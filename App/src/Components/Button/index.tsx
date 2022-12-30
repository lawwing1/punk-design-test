/**
 * @file button
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
type btnType = 'primary' | 'secondary' | 'text' | 'dashed';
type colorType = 'primary' | 'auxiliary' | 'danger' | 'warning' | 'success' | 'info';
type sizeType = 'small' | 'normal' | 'large';

interface ButtonProps {
    type?: btnType;
    color?: colorType;
    size?: sizeType;
    isLoading?: boolean;
    disabled?: boolean;
    children?: React.ReactNode;
    onClick?: (e: React.BaseSyntheticEvent) => void;
}
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Button: React.FC<ButtonProps> = ({
    type = 'primary',
    color = 'primary',
    size = 'normal',
    isLoading,
    disabled,
    children,
    onClick,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    const buttonClassNames = classnames(
        style.button_content,
        style[`type_${type}`],
        style[`size_${size}`],
        style[`color_${color}`],
        { [style.disabled]: disabled, [style.loading]: isLoading },
    );
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    const handleClick = (e: React.BaseSyntheticEvent) => {
        if (disabled || isLoading) return;
        onClick && onClick(e);
    };
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={style.button_container} onClick={handleClick}>
            <div className={buttonClassNames}>{children}</div>
        </div>
    );
};
export default Button;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
