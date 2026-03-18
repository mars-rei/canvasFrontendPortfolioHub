import { Rnd } from "react-rnd";

function Star({ isSelected, onSelect, activeCursor }) {

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
            bounds=".bounds"
            disableDragging={locked}
            enableResizing={!locked}
            onMouseDown={(e) => { if (locked) return; e.stopPropagation(); onSelect(); }}
            className={`group ${isSelected ? "outline-2 outline-[#003c66]" : "hover:outline-2 hover:outline-[#003c66]"}`}
        >
            <i className="fa fa-star fa-4x text-amber-300" draggable={false} />
        </Rnd>
    );
}

export default Star;