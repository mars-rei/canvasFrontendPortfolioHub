// https://github.com/bokuweb/react-rnd/blob/master/stories/bounds-and-offset.js

import { useEffect } from "react";

import Carousel from './Carousel';
import Image from './Image';
import Slides from './Slides';

// the last component to be declared is on the top layer

function Canvas({ items, selectedId, onSelect, onRemove }) {

    // for deleting components from canvas
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.key === "Delete" || e.key === "Backspace") && selectedId) {
                onRemove(selectedId);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedId]);

    // for rendering items onto canvas
    const showItem = (item) => {
        const props = {
            key: item.id,
            isSelected: selectedId === item.id,
            onSelect: () => onSelect(item.id),
            onRemove: () => onRemove(item.id),
        };

        if (item.type === 'image') return <Image {...props} src={item.src} />;
        if (item.type === 'slides') return <Slides {...props} />;
        if (item.type === 'carousel') return <Carousel {...props} />;
    };

    return (
        <div className="bounds w-216 h-144 bg-[#B5446E]" onClick={() => onSelect(null)}>
            <div className="offsetParent">
                {items.map(showItem)}
            </div>
        </div>
    );
}

export default Canvas;