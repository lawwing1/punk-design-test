/**
 * @file
 * @date 2022-12-28
 * @author haodong.wang
 * @lastModify  2022-12-28
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import ReactDOM from 'react-dom';
import classnames from '~/Utils/classNames';
import Icon from '../Icon';
import style from './style.scss';
import { createRoot } from './utils';
/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
interface NoticeProps {
    hasIcon?: boolean;
    type: 'error' | 'info' | 'success' | 'warning';
    // direction?: 'top' | 'left' | 'right' | 'bottom';
    title?: string;
    message?: string;
    duration?: number;
}

const rootEle = createRoot();
/** This section will include all the interface for this tsx file */
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Notice = ({
    hasIcon = true,
    type = 'info',
    // direction = 'right',
    title = '这是一条信息',
    message,
    duration = 3000,
}: NoticeProps) => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const hasRootNotice = !!document.getElementsByClassName('notice_container')[0];

    // const rootEle = !hasRootNotice && createRoot();

    const fragment = document.createDocumentFragment();

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    const noticeItem = (
        <div className={classnames(style.notice_item, style.enter, style[type])}>
            <div className={style.notice_title}>
                <div className={style.notice_icon}>{hasIcon && <Icon type={type}></Icon>}</div>
                <div className={style.notice_titleMsg}>{title}</div>
            </div>
            <div className={style.notice_message}>{message}</div>
        </div>
    );
    /************* This section will include this component parameter *************/
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    /************* This section will include this component general function *************/
    ReactDOM.render(noticeItem, fragment);

    const noticeItemElement = fragment.firstChild as HTMLDivElement;

    noticeItemElement.addEventListener(
        'webkitAnimationEnd',
        () => {
            if (noticeItemElement.classList.contains('enter')) {
                setTimeout(() => {
                    noticeItemElement.classList.remove('enter');
                    noticeItemElement.classList.add('leave');
                }, duration);
            } else if (noticeItemElement.classList.contains('leave')) {
                rootEle.removeChild(noticeItemElement);
                rootEle.children.length == 0 && document.body.removeChild(rootEle);
            }
        },
        false,
    );

    if (hasRootNotice) {
        rootEle.appendChild(fragment);
    } else {
        rootEle.appendChild(fragment);
        document.body.appendChild(rootEle);
    }
};

// Notice.right = ()=>{Notice({tyep})};
// Notice.left = Notice;

export default Notice;
/* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
