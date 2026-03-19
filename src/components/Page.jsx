// https://github.com/bokuweb/react-rnd/blob/master/stories/bounds-and-offset.js

import { useEffect } from "react";

import Carousel from './Carousel';
import Image from './Image';
import Slides from './Slides';
import Text from './Text';

import Star from './shapes/ordinary/Star';
import Square from './shapes/ordinary/Square';
import Circle from './shapes/ordinary/Circle';
import Rectangle from './shapes/ordinary/Rectangle';
import Triangle from './shapes/ordinary/Triangle';

import Shape1 from './shapes/svgShapesByMo/Shape1';
import Shape2 from './shapes/svgShapesByMo/Shape2';


// the last component to be declared is on the top layer

function Page({ items, selectedId, onSelect, onRemove, activeCursor }) {

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
            activeCursor,
        };

        // components
        if (item.type === 'image') return <Image {...props} src={item.src} />;
        if (item.type === 'slides') return <Slides {...props} />;
        if (item.type === 'carousel') return <Carousel {...props} />;
        if (item.type === 'text') return <Text {...props} />;

        // ordinary shapes


        // shapesByMo

        // integrating
        if (item.type === 'star') return <Star {...props} />;
        if (item.type === 'square') return <Square {...props} />;
        if (item.type === 'circle') return <Circle {...props} />;
        if (item.type === 'rectangle') return <Rectangle {...props} />;
        if (item.type === 'triangle') return <Triangle {...props} />;

        if (item.type === 'shape1') return <Shape1 {...props} />;
        if (item.type === 'shape2') return <Shape2 {...props} />;
    };

    return (
        <>
            <div className="w-216 flex flex-col text-[#EBFFF2] font-fustat-medium text-md">
                <div className="w-full flex flex-row justify-between">
                    {/* page name */}
                    <textarea 
                        className="resize-none bg-transparent outline-none -mb-4"
                        onMouseDown={(e) => e.stopPropagation()}
                        placeholder="Enter page name..."
                        defaultValue="Home"
                    />

                    {/* height and width of page */}
                    <p>720 x 480</p> 
                </div>
                <div 
                    className="bounds w-216 h-144 bg-[#B5446E] relative" 
                    onClick={() => onSelect(null)}
                    onDragStart={(e) => e.stopPropagation()}
                    onDrag={(e) => e.stopPropagation()}
                >
                    <div className="offsetParent relative w-full h-full">
                        {items.map(showItem)}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Page;