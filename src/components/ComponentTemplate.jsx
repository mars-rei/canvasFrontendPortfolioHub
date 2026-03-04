import { Rnd } from "react-rnd";

function ComponentTemplate({ isSelected, onSelect }) {

    const style = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <Rnd
            style={style}
            default={{ x: 0, y: 0, width: 600, height: 400 }}
            bounds=".bounds"
            onMouseDown={(e) => { e.stopPropagation(); onSelect(); }}
        >
            {/* insert component */}
        </Rnd>
    );
}

export default ComponentTemplate();