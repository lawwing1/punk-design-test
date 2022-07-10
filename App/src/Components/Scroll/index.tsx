import { transform } from "@babel/core";
import React, { useState, useEffect, ReactNode, ReactChild, ReactElement, useRef } from "react"
import style from "./style.scss"

interface scrollProps {
    width?: number,
    height?: number,
    children?: ReactElement
}

export const Scroll = ({ width = 500, height = 500, children }: scrollProps): JSX.Element => {
    const [childNode, setChildNode] = useState<Element>();
    const [childHeight, setChildHeight] = useState(0);
    const [siderBarPos, setSiderBarPos] = useState(0);
    const [isSiderBarMove, setIsSiderBarMove] = useState(false);
    const [checkSiderBarPos, setCheckSiderBarPos] = useState(0);
    // const
    // 元素获取
    const contentBox = useRef<HTMLDivElement>(null);
    const barSider = useRef<HTMLDivElement>(null);



    useEffect(() => {
        const childNode = contentBox?.current?.children[0];
        setChildNode(childNode);
    }, [])

    useEffect(() => {
        if (childNode) {
            const childHeight = childNode.clientHeight;
            setChildHeight(childHeight as number)
        }
    }, [childNode])

    useEffect(() => {
        barSider.current?.addEventListener("mousedown", handleBarSiderDown, false);
        document.addEventListener("mouseup", handleBarSiderUp, false);
        return () => {
            barSider.current?.removeEventListener("mousedown", handleBarSiderDown, false);
            document.removeEventListener("mouseup", handleBarSiderUp, false);
        }
    }, [siderBarPos, isSiderBarMove, checkSiderBarPos])

    useEffect(() => {
        if (!isSiderBarMove) return;
        document?.addEventListener('mousemove', handleBarSiderMove, false);
        return () => {
            document?.removeEventListener('mousemove', handleBarSiderMove, false);
        }
    }, [isSiderBarMove, siderBarPos])

    const handleBarSiderDown = (e) => {
        setCheckSiderBarPos(e.pageY);
        setIsSiderBarMove(true);
    }

    const handleBarSiderMove = (e) => {
        const currentPosition = e.pageY;
        if (currentPosition - checkSiderBarPos > 0) {
            siderBarPos < 100 - height * height / childHeight / 5 && setSiderBarPos(siderBarPos + 1);
        } else {
            siderBarPos > 0 && setSiderBarPos(siderBarPos - 1);
        }
        setCheckSiderBarPos(currentPosition);
    }

    const handleBarSiderUp = () => {
        setIsSiderBarMove(false);
    }


    const getBarHeight = () => {
        return {
            height: height * height / childHeight
        }
    }


    return <div className={style.scroll_container} style={{ height: height + "px", width: (width + 10) + "px" }}>
        <div className="container_contentBox" ref={contentBox}>
            <div className="contentBox_list" style={{ transform: `translateY(${-siderBarPos * ((childHeight - height) / (100 - height * height / childHeight / 5))}px)` }}>
                {children}
            </div>
        </div>
        <div className="container_sidebar">
            <div className="sidebar_bar" ref={barSider} style={{ ...getBarHeight(), ...{ transform: `translateY(${siderBarPos * 5}px)` } }}></div>
        </div>
    </div >
}