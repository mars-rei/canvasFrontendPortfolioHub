// svg from: https://www.shapes.gallery/

import { useRef, useState } from 'react';

// https://daybrush.com/moveable/storybook/index.html?path=/story/advanced-rotatable--advanced-rotatable-custom-origin - testing
import Moveable from "react-moveable"; 

function Shape1({ isSelected, onSelect, activeCursor, itemStyle = {} }) {
    const fill = itemStyle.fill ?? 'rgb(84, 84, 84)';
    const targetRef = useRef(null);
    const [transform, setTransform] = useState("");
    
    return (
        <div className="shape-container">
            <div
                ref={targetRef}
                className={`target group ${isSelected ? "outline-2 outline-[#003c66]" : "hover:outline-2 hover:outline-[#003c66]"}`}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100px',
                    height: '100px',
                    transform: transform,
                    position: 'absolute',
                    cursor: activeCursor === 'hand' ? 'default' : 'move'
                }}
                onMouseDown={(e) => { 
                    if (activeCursor !== 'hand') {
                        e.stopPropagation();
                        onSelect(); 
                    }
                }}
            >
                <svg 
                    viewBox="0 0 256 256" 
                    width="100%" 
                    height="100%"
                >
                    <path d="M 228 0 C 172.772 0 128 44.772 128 100 L 128 0 L 0 0 L 0 28 C 0 83.228 44.772 128 100 128 L 0 128 L 0 256 L 28 256 C 83.228 256 128 211.228 128 156 L 128 256 L 256 256 L 256 228 C 256 172.772 211.228 128 156 128 L 256 128 L 256 0 Z" fill={fill}></path>
                </svg>
            </div>
            {isSelected && (
                <Moveable
                    target={targetRef.current}
                    draggable={true}
                    rotatable={true}
                    resizable={true}
                    keepRatio={true}      
                    origin={true}         
                    bounds={{              
                        left: 0,
                        top: 0,
                        right: window.innerWidth,
                        bottom: window.innerHeight
                    }}
                    onDragStart={e => e.stopPropagation()}
                    onDrag={e => {
                        e.target.style.transform = e.transform;
                        setTransform(e.transform);
                    }}
                    onRotateStart={e => e.stopPropagation()}
                    onRotate={e => {
                        e.target.style.transform = e.drag.transform;
                        setTransform(e.drag.transform);
                    }}
                    onResizeStart={e => e.stopPropagation()}
                    onResize={e => {
                        e.target.style.width = `${e.width}px`;
                        e.target.style.height = `${e.height}px`;
                        e.target.style.transform = e.drag.transform;
                        setTransform(e.drag.transform);
                    }}
                />
            )}
        </div>
    );
}

export default Shape1;