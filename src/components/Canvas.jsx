// https://github.com/bokuweb/react-rnd/blob/master/stories/bounds-and-offset.js

import { Rnd } from "react-rnd";

function Canvas() {

    const style = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    const handleClick = () => {
        console.log('click work.')
    }

    const handleDragStart = (e, data) => {
        console.log(data.x, data.y)
    }

    const handleDrag = (e, data) => {
        console.log(data.x, data.y)
    }

    const handleDragStop = (e, data) => {
        console.log(data.x, data.y)
    }

    const handleResizeStart = (_, __, ele) => {
        console.log(ele.clientWidth, ele.clientHeight)
    }

    const handleResize = (_, __, ele, ___, pos) => {
        console.log(ele.clientWidth, ele.clientHeight, pos.x, pos.y)
    }

    const handleResizeStop = (_, __, ele, ___, pos) => {
        console.log(ele.clientWidth, ele.clientHeight, pos.x, pos.y)
    }

    return (
        <>
            <div className="bounds w-216 h-144 bg-[#B5446E]">
                <div className="offsetParent">
                    <Rnd
                        extendsProps={{ onClick: handleClick }}
                        style={style}
                        default={{ x: 0, y: 0, width: 100, height: 100 }}
                        bounds=".bounds"
                        onResizeStart={handleResizeStart}
                        onResize={handleResize}
                        onResizeStop={handleResizeStop}
                        onDragStart={handleDragStart}
                        onDrag={handleDrag}
                        onDragStop={handleDragStop}
                        className="hover:outline-2 outline-[#003c66]"
                        >
                        <img 
                            src="/images/1.png" 
                            className="w-full h-full"
                        />
                    </Rnd>
                </div>
            </div>
        </>
    );
}

export default Canvas;