import React, { useState, useEffect } from "react"
import style from "./style.scss"

interface PaginationProps {
    count: number,  // 数据总数量
    size?: number,    // 每一页数据数量
    maxLen?: number,     // 最多显示的页数
    handleChange?: (item: number) => void   // 点击页数回调
}

export const Pagination = ({
    count,
    size = 5,
    maxLen = 7,
    handleChange
}: PaginationProps): JSX.Element => {
    // 当前页数
    const [currentPage, setCurrentPage] = useState(1);

    // 总共页数
    const [list, setList] = useState<Array<number>>();

    useEffect(() => {
        let arr = new Array(Math.ceil(count / size)).fill(0).map((item, index) => index + 1);
        setList(arr)
    }, [count, size])

    const handleFirstIcon = (e) => {
        if (e.target.classList.contains("pagicon_disable")) return;
        setCurrentPage(1);
        handleChange && handleChange(1);
    }

    const handlePreIcon = (e) => {
        if (e.target.classList.contains("pagicon_disable")) return;
        setCurrentPage(currentPage - 1);
        handleChange && handleChange(currentPage - 1);
    }

    const handleLastIcon = (e) => {
        if (e.target.classList.contains("pagicon_disable")) return;
        setCurrentPage((list as []).length);
        handleChange && handleChange((list as []).length);
    }

    const handleNextIcon = (e) => {
        if (e.target.classList.contains("pagicon_disable")) return;
        setCurrentPage(currentPage + 1);
        handleChange && handleChange(currentPage + 1);
    }

    const handlePag = (item: number) => {
        if (currentPage == item) return;
        setCurrentPage(item);
        handleChange && handleChange(item);
    }


    return <>
        <div className={style.pagenation}>
            <div onClick={handleFirstIcon} className={style.pag_firstPreIcon + " " + (currentPage === 1 && style.pagicon_disable)}>&lt;&lt;</div>
            <div onClick={handlePreIcon} className={style.pag_preIcon + " " + (currentPage === 1 && style.pagicon_disable)}>&lt;</div>
            <div className={style.pag_list}>
                {
                    list && list.map((item, index) => {
                        return item === currentPage ?
                            <div onClick={() => { handlePag(item) }} key={index} className={style.pag_item + " " + style.pag_item_current}>
                                {item}
                            </div> :
                            <div onClick={() => { handlePag(item) }} key={index} className={style.pag_item}>
                                {item}
                            </div>
                    })
                }
            </div>
            <div onClick={handleNextIcon} className={style.pag_nextIcon + " " + (currentPage === (list && list.length) && style.pagicon_disable)}>&gt;</div>
            <div onClick={handleLastIcon} className={style.pag_lastNextIcon + " " + (currentPage === (list && list.length) && style.pagicon_disable)}>&gt;&gt;</div>
        </div>
    </>
}