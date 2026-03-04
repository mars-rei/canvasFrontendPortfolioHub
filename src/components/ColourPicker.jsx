import React from 'react';
import { SketchPicker } from 'react-color';

class ColourPicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showPicker: false };
    }

    handleChange = (color) => {
        this.props.onChange(color.hex);
    }

    togglePicker = () => {
        this.setState(prev => ({ showPicker: !prev.showPicker }));
    }

    closePicker = () => {
        this.setState({ showPicker: false });
    }

    render() {
        const { color, darkMode } = this.props;
        const { showPicker } = this.state;

        return (
            <>
                <div className={`flex flex-row items-center w-full px-2 py-1 border-2 rounded-md text-base font-fustat-medium space-x-2 ${darkMode ? "border-[#EBFFF2]" : "border-[#111317]"}`}>
                    <i
                        className="fa fa-square fa-lg cursor-pointer"
                        style={{ color }}
                        onClick={this.togglePicker}
                    />
                    <input
                        className={`bg-transparent outline-none w-full font-fustat-medium text-base ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}
                        value={color}
                        onChange={(e) => this.props.onChange(e.target.value)}
                        onFocus={() => this.setState({ showPicker: true })}
                    />
                </div>

                {showPicker && (
                    <>
                        <div className="fixed inset-0 z-10" onClick={this.closePicker} />
                        <div className="relative z-20">
                            <SketchPicker color={color} onChange={this.handleChange} />
                        </div>
                    </>
                )}
            </>
        );
    }
}

export default ColourPicker;