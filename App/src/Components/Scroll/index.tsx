import React, { useState, useEffect, ReactNode, useRef } from 'react';
import styles from './style.scss';

interface scrollProps {
    width?: string;
    height?: string;
    hidden?: boolean;
    children?: ReactNode;
}

const mouseOffset = { x: 0, y: 0 };
const Scroll: React.FC<scrollProps> = ({ children, width, height }): JSX.Element => {
    const scrollBox = useRef<HTMLDivElement>(null);
    const scrollContainer = useRef<HTMLDivElement>(null);
    const rowBar = useRef<HTMLDivElement>(null);
    const [scrollBoxWidth, setScrollBoxWidth] = useState(0);
    const [scrollBoxHeight, setScrollBoxHeight] = useState(0);

    const [colbarHeight, setColbarHeight] = useState(0);
    const [rowbarWidth, setRowbarWidth] = useState(0);

    const containerWidth = parseInt(width as string);
    const containerHeight = parseInt(height as string);

    const [colMoveDistance, setColMoveDistance] = useState(0);
    const [rowMoveDistance, setRowMoveDistance] = useState(0);

    const [colbarMoveDistance, setColbarMoveDistance] = useState(0);
    const [rowbarMoveDistance, setRowbarMoveDistance] = useState(0);

    useEffect(() => {
        // set box length
        setScrollBoxWidth((scrollBox.current?.children[0] as HTMLElement).offsetWidth);
        setScrollBoxHeight(scrollBox.current?.offsetHeight as number);
    }, []);

    useEffect(() => {
        // set bar length
        setColbarHeight((containerHeight * containerHeight) / scrollBoxHeight);
        setRowbarWidth((containerWidth * containerWidth) / scrollBoxWidth);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [scrollBoxWidth, scrollBoxHeight]);

    const scrollContainerWhell = (e: React.WheelEvent) => {
        if (e.deltaY > 0) {
            // bottom direct
            if (colMoveDistance * 50 > containerHeight - scrollBoxHeight) {
                setColMoveDistance(colMoveDistance - 1);
                setColbarMoveDistance(colbarMoveDistance - 1);
            }
        } else {
            // top direct
            if (colMoveDistance < 0) {
                setColMoveDistance(colMoveDistance + 1);
                setColbarMoveDistance(colbarMoveDistance + 1);
            }
        }
    };

    const colbarMouseDown = () => {
        document.addEventListener('mousemove', colbarMouseMove, false);
        document.addEventListener('mouseup', colbarMouseUp, false);
    };

    const colbarMouseMove = (e) => {
        e.preventDefault();
        // setColMoveDistance(Math.floor(e.offsetY / 50) * -1);
        console.log(e);
    };

    const colbarMouseUp = () => {
        document.removeEventListener('mousemove', colbarMouseMove, false);
        document.removeEventListener('mouseup', colbarMouseUp, false);
    };

    const rowbarMouseDown = (e) => {
        const containerOffsetLeft = scrollContainer?.current?.offsetLeft;
        mouseOffset.x = e.pageX - (containerOffsetLeft as number);

        // console.log(mouseEndOffset);
        document.addEventListener('mousemove', rowbarMouseMove, false);
        document.addEventListener('mouseup', rowbarMouseUp, false);
    };

    const rowbarMouseMove = (e) => {
        const containerOffsetLeft = scrollContainer?.current?.offsetLeft;
        e.preventDefault();
        setRowbarMoveDistance(e.pageX - (containerOffsetLeft as number) - mouseOffset.x);
        // console.log('@@', mouseOffset.x);
        // console.log(e.offsetX);
    };

    const rowbarMouseUp = (e) => {
        document.removeEventListener('mousemove', rowbarMouseMove, false);
        document.removeEventListener('mouseup', rowbarMouseUp, false);
    };

    // console.log(rowbarMoveDistance);

    return (
        <div
            className={styles.scroll_container}
            style={{ width, height }}
            ref={scrollContainer}
            onWheel={scrollContainerWhell}
        >
            <div
                className={styles.scroll_box}
                ref={scrollBox}
                style={{
                    transform: `translateY(${
                        colMoveDistance * 50 > containerHeight - scrollBoxHeight
                            ? colMoveDistance * 50
                            : containerHeight - scrollBoxHeight
                    }px)`,
                    width: `${scrollBoxWidth}px`,
                }}
            >
                {children}
            </div>
            {scrollBoxHeight > containerHeight && (
                <div
                    className={styles.scroll_colbar}
                    style={{
                        height: `${colbarHeight}px`,
                        transform: `translateY(${
                            ((colbarMoveDistance * 50 * containerHeight) / scrollBoxHeight) * -1 >
                            containerHeight - colbarHeight
                                ? containerHeight - colbarHeight
                                : ((colbarMoveDistance * 50 * containerHeight) / scrollBoxHeight) *
                                  -1
                        }px)`,
                        // transform: `translateY(${
                        //     ((colbarMoveDistance * 50 * containerHeight) / scrollBoxHeight) * -1
                        // }px)`,
                    }}
                    onMouseDown={colbarMouseDown}
                ></div>
            )}
            {scrollBoxWidth > containerWidth && (
                <div
                    className={styles.scroll_rowbar}
                    style={{
                        width: `${rowbarWidth}px`,
                        transform: `translateX(${rowbarMoveDistance}px)`,
                    }}
                    ref={rowBar}
                    onMouseDown={rowbarMouseDown}
                ></div>
            )}
        </div>
    );
};

export default Scroll;
