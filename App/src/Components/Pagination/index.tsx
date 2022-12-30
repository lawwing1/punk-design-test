/**
 * @file index file of Pager component
 * @date 2022-01-06
 * @author dualless
 * @lastModify lidaoping 2022-01-06
 */
/* <------------------------------------ **** DEPENDENCE IMPORT START **** ------------------------------------ */
/** This section will include all the necessary dependence for this tsx file */
import React, { useEffect, useState } from 'react';
import classnames from '~/Utils/classNames';
import styles from './style.scss';
import Icon from '~/Components/Icon';

/* <------------------------------------ **** DEPENDENCE IMPORT END **** ------------------------------------ */
/* <------------------------------------ **** INTERFACE START **** ------------------------------------ */
/** This section will include all the interface for this tsx file */
interface PaginationProps {
    count: number;
    size?: number;
    maxLength?: number;
    current: number;
    type?: 'solid' | 'default';
    onChange?: (number: number) => void;
}
/* <------------------------------------ **** INTERFACE END **** ------------------------------------ */
/* <------------------------------------ **** FUNCTION COMPONENT START **** ------------------------------------ */
const Pagination: React.FC<PaginationProps> = ({
    count,
    size = 5,
    maxLength = 7,
    current,
    type = 'default',
    onChange,
}): JSX.Element => {
    /* <------------------------------------ **** STATE START **** ------------------------------------ */
    /************* This section will include this component HOOK function *************/
    const [firstArr, setFirstArr] = useState<number[]>([]);
    const [centerArr, setCenterArr] = useState<number[]>([]);
    const [lastArr, setLastArr] = useState<number[]>([]);
    // all page
    const pageCount = Math.ceil(count / size);

    const isFirstPage = current == 1;

    const isLastPage = current === pageCount;

    useEffect(() => {
        createArr();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [current]);

    /* <------------------------------------ **** STATE END **** ------------------------------------ */
    /* <------------------------------------ **** PARAMETER START **** ------------------------------------ */
    /************* This section will include this component parameter *************/
    const pageItemClassName = (active: boolean) => {
        return classnames([
            styles.pagination_pageItem,
            styles['pagination_pageItem_' + type],
            { [styles.active]: active },
        ]);
    };
    /* <------------------------------------ **** PARAMETER END **** ------------------------------------ */
    /* <------------------------------------ **** FUNCTION START **** ------------------------------------ */
    // create array item
    const createArr = () => {
        let i = 0;
        const first: number[] = [];
        const center: number[] = [];
        const last: number[] = [];
        while (++i <= pageCount) {
            // if page max all page
            if (pageCount > maxLength && first.length + center.length + last.length < maxLength) {
                const currentCeilGap = Math.ceil(maxLength / 2);
                const currentFloorGap = Math.floor(maxLength / 2);
                if (current < currentCeilGap) {
                    first.push(i);
                } else if (current >= currentCeilGap && current <= pageCount - currentCeilGap) {
                    if (maxLength % 2 == 0) {
                        center.push(i + current - currentFloorGap + 1);
                    } else {
                        center.push(i + current - currentFloorGap);
                    }
                } else if (current > pageCount - currentCeilGap) {
                    last.push(i + pageCount - currentCeilGap - currentFloorGap + 1);
                }

                if (first.length == 0) first.push(1);
                if (last.length == 0) last.push(pageCount);
            } else if (pageCount <= maxLength) {
                first.push(i);
            }
        }
        setFirstArr(first);
        setCenterArr(center);
        setLastArr(last);
    };

    // create pager item
    const createPaginationItem = (arr: number[]) => {
        return arr.map((value) => {
            return (
                <li
                    key={value}
                    className={pageItemClassName(value === current)}
                    onClick={() => handleSelectPage(value)}
                >
                    {value}
                </li>
            );
        });
    };

    const handleChange = (number: number) => {
        onChange?.(number);
    };

    const handleChangeList = (number: number) => {
        handleChange(number);
    };

    const handlePrevPage = () => {
        if (isFirstPage) {
            return;
        }
        handleChange(current - 1);
    };

    const handleNextPage = () => {
        if (isLastPage) {
            return;
        }
        handleChange(current + 1);
    };

    const handlePrevList = () => {
        if (isFirstPage) {
            return;
        }
        handleChangeList(1);
    };

    const handleNextList = () => {
        if (isLastPage) {
            return;
        }
        handleChangeList(pageCount);
    };

    const handleSelectPage = (value: number) => {
        handleChange(value);
    };
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    /************* This section will include this component general function *************/
    /* <------------------------------------ **** FUNCTION END **** ------------------------------------ */
    return (
        <div className={styles.pagination_container}>
            <div
                className={classnames([
                    styles.pagination_prevFirstPageContainer,
                    styles['pagination_prevFirstPageContainer_' + type],
                    { disabled: isFirstPage },
                ])}
                onClick={() => handlePrevList()}
            >
                <Icon type={'verticalRightOutlined'} />
            </div>
            <div
                className={classnames([
                    styles.pagination_prevPageContainer,
                    styles['pagination_prevPageContainer_' + type],
                    { disabled: isFirstPage },
                ])}
                onClick={() => handlePrevPage()}
            >
                <Icon type={'leftOutlined'} />
            </div>
            <ul className={styles.pagination_pages}>
                {createPaginationItem(firstArr)}
                {pageCount > maxLength && current > Math.ceil(maxLength / 2) && (
                    <li className={styles.pagination_point}>...</li>
                )}

                {createPaginationItem(centerArr)}
                {pageCount > maxLength && current < pageCount - Math.floor(maxLength / 2) && (
                    <li className={styles.pagination_point}>...</li>
                )}
                {createPaginationItem(lastArr)}
            </ul>
            <div
                className={classnames([
                    styles.pagination_nextPageContainer,
                    styles['pagination_nextPageContainer_' + type],
                    { disabled: isLastPage },
                ])}
                onClick={() => handleNextPage()}
            >
                <Icon type={'rightOutlined'} />
            </div>
            <div
                className={classnames([
                    styles.pagination_nextLastPageContainer,
                    styles['pagination_nextLastPageContainer_' + type],
                    { disabled: isLastPage },
                ])}
                onClick={() => handleNextList()}
            >
                <Icon type={'verticalLeftOutlined'} />
            </div>
        </div>
    );
};

export default Pagination;
/* <------------------------------------ **** FUNCTION COMPONENT END **** ------------------------------------ */
