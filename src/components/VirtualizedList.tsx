import React, { useEffect, useRef, useState } from 'react'
import { FixedSizeList as List } from 'react-window';
import NavbarMenu from './NavbarMenu';

const data = Array.from({ length: 100000 }, (_, index) => `Item ${index + 1}`);
const Row: React.FC<RowProps> = ({ index, style }) => {
    return (
        <div style={{ ...style, padding: '10px', borderBottom: '1px solid #ddd' }}>
            <p style={{ margin: 0 }}>{data[index]}</p>
        </div>
    )
}

function VirtualizedList() {
    const itemCount = 100000;
    const itemSize = 50;
    const containerRef = useRef<HTMLDivElement>(null);
    const [contianerSize, setConttianerSize] = useState({
        width: 0,
        height: 0
    });

    // check size and update state
    useEffect(() => {
        const updateContainerSize = () => {
            if (containerRef.current) {
                const { clientWidth, clientHeight } = containerRef.current; // value width height container current

                setConttianerSize({
                    width: clientWidth,
                    height: clientHeight
                });
            }
        };

        updateContainerSize();
        window.addEventListener('resize', updateContainerSize)

        return () => window.removeEventListener('resize', updateContainerSize);
    }, []);

    return (
        <>
            <NavbarMenu />
            <div className="container mt-4" style={{ height: '90vh' }} ref={containerRef}>
                <List
                    height={contianerSize.height}
                    itemCount={itemCount}
                    itemSize={itemSize}
                    width={contianerSize.width}
                >
                    {({ index, style }) => <Row index={index} style={style} />}
                </List>
            </div>
        </>
    )
}

export default VirtualizedList

interface RowProps {
    index: number;
    style: React.CSSProperties;
}