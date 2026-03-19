// just need to manage colouring

import { Rnd } from "react-rnd";

function Circle({ src, isSelected, onSelect, activeCursor }) {

    const locked = activeCursor === 'hand';

    const style = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <Rnd
            style={style}
            default={{ x: 0, y: 0, width: 100, height: 100 }}
            bounds="parent" 
            disableDragging={locked}
            enableResizing={!locked}
            onDragStart={(e) => e.stopPropagation()}
            onResizeStart={(e) => e.stopPropagation()}
            onMouseDown={(e) => { if (locked) return; e.stopPropagation(); onSelect(); }}
            className={`group ${isSelected ? "outline-2 outline-[#003c66]" : "hover:outline-2 hover:outline-[#003c66]"}`}
        >
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                <circle cx="50" cy="50" r="50" fill="rgb(84, 84, 84)"/>
            </svg>
        </Rnd>
    );
}

export default Circle;