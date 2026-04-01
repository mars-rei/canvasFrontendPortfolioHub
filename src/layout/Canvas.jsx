// draggable and resizable canvas edited from: https://stackblitz.com/edit/react-draggable-canvas-zoom?file=index.tsx
// undo and redo edited from: https://konvajs.org/docs/react/Undo-Redo.html

import { useRef, useState, useEffect } from 'react';

// for staging
import React, { Component } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';

const dragInertia = 32 // increased to slow down drag
const zoomBy = 0.01 // lowered to slow down zoom

function Canvas({ canvasColour, activeCursor, onSelect, children }) {

    const containerRef = useRef(null)

    useEffect(() => {
        const { innerHeight, innerWidth } = window
        containerRef.current.scroll(innerWidth * 1.5, innerHeight * 1.5)
    }, [])

    const [scale, setScale] = useState(1);
    const [{ clientX, clientY }, setClient] = useState({ clientX: 0, clientY: 0 });
    const [overflow, setOverflow] = useState('scroll');
    const [{ translateX, translateY }, setTranslate] = useState({ translateX: 0, translateY: 0 });


    // to allow for only the canvas to be zoomed in on and to zoom in where the mouse is rather than at 0,0
    useEffect(() => {
        const el = containerRef.current

        const handleWheel = (e) => {
            e.preventDefault()

            const rect = el.getBoundingClientRect()
            const mouseX = e.clientX - rect.left + el.scrollLeft
            const mouseY = e.clientY - rect.top + el.scrollTop

            const newScale = e.deltaY > 0
                ? Math.max(0.1, scale - zoomBy)
                : scale + zoomBy

            const scaleChange = newScale - scale
            const newTranslateX = translateX - (mouseX * scaleChange) / (scale * newScale)
            const newTranslateY = translateY - (mouseY * scaleChange) / (scale * newScale)

            setScale(newScale)
            setTranslate({ translateX: newTranslateX, translateY: newTranslateY })

            if (newScale <= 1) setOverflow('scroll')
            else setOverflow('hidden')
        }

        el.addEventListener('wheel', handleWheel, { passive: false })
        return () => el.removeEventListener('wheel', handleWheel)
    }, [scale, translateX, translateY])


    // for staging - undo and redo
    const [position, setPosition] = React.useState({ x: 20, y: 20 });
    // We use refs to keep history to avoid unnecessary re-renders
    const history = React.useRef([{ x: 20, y: 20 }]);
    const historyStep = React.useRef(0);

    const handleUndo = () => {
        if (historyStep.current === 0) {
        return;
        }
        historyStep.current -= 1;
        const previous = history.current[historyStep.current];
        setPosition(previous);
    };

    const handleRedo = () => {
        if (historyStep.current === history.current.length - 1) {
        return;
        }
        historyStep.current += 1;
        const next = history.current[historyStep.current];
        setPosition(next);
    };

    const handleDragEnd = (e) => {
        // Remove all states after current step
        history.current = history.current.slice(0, historyStep.current + 1);
        const pos = {
        x: e.target.x(),
        y: e.target.y(),
        };
        // Push the new state
        history.current = history.current.concat([pos]);
        historyStep.current += 1;
        setPosition(pos);
    };

    return (
        <div
            ref={containerRef}
            className="scrollbar-hide"
            style={{
                overflow,
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 0,
            }}
        >
            <div
                style={{
                    backgroundColor: canvasColour,
                    cursor: activeCursor === 'hand' ? 'grab' : 'default',
                    minHeight: '400vh', // to make canvas somewhat infinite
                    minWidth: '400vw', // to make canvas somewhat infinite
                    backgroundSize: `20px 20px`,
                    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
                    transform: `scale(${scale}, ${scale}) translate(${translateX}px, ${translateY}px)`,
                    transformOrigin: '0 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onClick={() => onSelect(null)} 
                onDragStart={e => {
                    const preview = document.createElement('div')
                    preview.style.display = 'none'
                    e.dataTransfer.setDragImage(preview, 0, 0)
                    setClient({ clientX: e.clientX, clientY: e.clientY })
                }}
                onDrag={e => {
                    if (e.clientX && e.clientY) {
                        const deltaX = (clientX - e.clientX) / dragInertia
                        const deltaY = (clientY - e.clientY) / dragInertia
                        containerRef.current.scrollBy(deltaX, deltaY)
                    }
                }}
                draggable
            >
                <Stage width={window.innerWidth} height={window.innerHeight}>
                    <Layer>
                        <Text text="undo" onClick={handleUndo} />
                        <Text text="redo" x={40} onClick={handleRedo} />
                        <Rect
                        x={position.x}
                        y={position.y}
                        width={50}
                        height={50}
                        fill="black"
                        draggable
                        onDragEnd={handleDragEnd}
                        />
                    </Layer>
                </Stage>
                {children}
            </div>
        </div>
    );
}

export default Canvas;