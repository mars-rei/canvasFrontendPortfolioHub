import { Rnd } from "react-rnd";

function Image({ src, isSelected, onSelect }) {

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
            onMouseDown={(e) => { e.stopPropagation(); onSelect(); }}
            className={`group ${isSelected ? "outline-2 outline-[#003c66]" : "hover:outline-2 hover:outline-[#003c66]"}`}
        >
            <img src={src} className="w-full h-full" draggable={false} />
        </Rnd>
    );
}

export default Image;