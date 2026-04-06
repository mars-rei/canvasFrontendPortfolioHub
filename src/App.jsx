import { useState } from "react";

// components
import Page from './components/Page';
import ColourPicker from './components/ColourPicker';

// layout
import Canvas from './layout/Canvas';
import Toolbar from "./layout/ToolBar";
import LeftBar from "./layout/LeftBar";
import RightBar from "./layout/RightBar";

function App() {

    // to set the colour of the whole canvas (where the page canvases sit)
    const [canvasColour, setCanvasColour] = useState('#1d2025'); 

    /* ---------- pages ---------- */
    const [pages, setPages] = useState([
        { 
            id: 'p1', 
            name: 'Home', 
            colour: '#B5446E', 
            items: [], 
            itemStyles: {},
            dimensions: { width: 720, height: 480 } 
        }
    ]);
    const [currentPageId, setCurrentPageId] = useState('p1');

    // to get current page data
    const currentPage = pages.find(p => p.id === currentPageId);
    const currentPageItems = currentPage?.items || [];
    const currentPageColour = currentPage?.colour || '#B5446E';
    const currentItemStyles = currentPage?.itemStyles || {};

    // new page
    const addPage = (pageConfig) => {
        const newPageId = `page-${Date.now()}`;
        setPages(prev => [...prev, {
            id: newPageId,
            name: pageConfig.name || 'Untitled',
            colour: pageConfig.colour || '#B5446E',
            items: [],
            itemStyles: {},
            dimensions: pageConfig.dimensions || { width: 720, height: 480 }
        }]);
        setCurrentPageId(newPageId);
    };

    // defaults for a new page
    const [newPageName, setNewPageName] = useState('Untitled Page');
    const [newPageColour, setNewPageColour] = useState('#B5446E');
    const [selectedDimensions, setSelectedDimensions] = useState('720x480');

    // delete page
    const removePage = (pageId) => {
        if (pages.length === 1) {
            alert("Cannot remove the last page");
            return;
        }
        
        setPages(prev => prev.filter(p => p.id !== pageId));
        
        // If removing current page, switch to another page
        if (currentPageId === pageId) {
            const remainingPages = pages.filter(p => p.id !== pageId);
            if (remainingPages.length > 0) {
                setCurrentPageId(remainingPages[0].id);
            }
        }
    };

    // update page name
    const updatePageName = (pageId, newName) => {
        setPages(prev => prev.map(page => 
            page.id === pageId ? { ...page, name: newName } : page
        ));
    };

    // update page colour
    const updatePageColour = (pageId, newColour) => {
        setPages(prev => prev.map(page => 
            page.id === pageId ? { ...page, colour: newColour } : page
        ));
    };

    // add elements to current page on canvas
    const addToCanvas = (type, src = null) => {
        setPages(prev => prev.map(page => {
            if (page.id === currentPageId) {
                return {
                    ...page,
                    items: [...page.items, { id: Date.now(), type, src }]
                };
            }
            return page;
        }));
    };

    // remove elements from current page on canvas
    const removeFromCanvas = (id) => {
        setPages(prev => prev.map(page => {
            if (page.id === currentPageId) {
                return {
                    ...page,
                    items: page.items.filter(item => item.id !== id)
                };
            }
            return page;
        }));
        setSelectedId(null);
    };

    // update styles of elements of current page on canvas
    const onStyleChange = (id, key, value) => {
        setPages(prev => prev.map(page => {
            if (page.id === currentPageId) {
                const currentStyles = page.itemStyles || {};
                return {
                    ...page,
                    itemStyles: {
                        ...currentStyles,
                        [id]: { ...currentStyles[id], [key]: value }
                    }
                };
            }
            return page;
        }));
    };


    // for removing items from canvas
    const [selectedId, setSelectedId] = useState(null);

    // for opening component panels (on the left)
    const [openPanel, setOpenPanel] = useState(null);

    const togglePanel = (panel) => {
        setOpenPanel(prev => prev === panel ? null : panel);
    };

    // for opening folders in media and component panels
    const [openFolder, setOpenFolder] = useState({ panel: null, name: null });

    const toggleFolder = (panel, name) => {
        setOpenFolder(prev => prev.name === name ? { panel: null, name: null } : { panel, name });
    };

    // default colour for components
    const defaultColour = { 
        circle: '#545454',
        square: '#545454',
        rectangle: '#545454',
        triangle: '#545454',
        star: '#545454',
        shape1: '#545454',
        shape2: '#545454',
        text: '#ffffff',
    };

    // find element for menu to show
    const selectedItem = currentPageItems.find(i => i.id === selectedId) ?? null;

    // panel for editing (adding a shape or page)
    const [openEditPanel, setOpenEditPanel] = useState(null);

    const toggleEditPanel = (panel) => {
        setOpenEditPanel(prev => prev === panel ? null : panel);
    };

    // for toggling cursor to edit or move around canvas
    const [activeCursor, setActiveCursor] = useState('pointer');

    // project directory
    const projects = {
        'fire on marz': ["/images/1.png", "/images/2.png"],
        'portfolioHub': [],
        'The Green Room': [],
    };

    // general components
    const general = ['slides', 'carousel', 'text'];

    // industry library components directory
    const components = {
        'Graphic Design': ['fa-bezier-curve', { 'h': 'h' }],
        'Illustration': ['fa-paint-brush', { 'h': 'h' }],
        'Animation': ['fa-person-walking', { 'h': 'h' }],
        'UI/UX Design': ['fa-user-check', { 'h': 'h' }],
        'Software Design': ['fa-laptop-code', { 'h': 'h' }],
        'Game Design': ['fa-gamepad', { 'h': 'h' }],
        '3d Art / Animation': ['fa-cube', { 'h': 'h' }],
        'Photography': ['fa-camera', { 'h': 'h' }],
        'Film Production': ['fa-film', { 'h': 'h' }],
        'Fashion Design': ['fa-shirt', { 'h': 'h' }],
        'Architecture': ['fa-archway', { 'h': 'h' }],
        'Product Design': ['fa-box-open', { 'h': 'h' }],
        'Content Creation': ['fa-lightbulb', { 'Social media embed': 'h' }],
        'Marketing': ['fa-magnifying-glass-chart', { 'h': 'h' }],
        'Social Media Management': ['fa-hashtag', { 'h': 'h' }],
        'Journalism': ['fa-book-open', { 'h': 'h' }],
        'Screen Writing': ['fa-pen-clip', { 'h': 'h' }],
        'Creative Writing': ['fa-bookmark', { 'h': 'h' }],
        'Music': ['fa-music', { 'h': 'h' }],
    };

    // shapes library
    const shapes = ['square', 'triangle', 'circle', 'star'];

    // for toggling dark and light mode
    const [darkMode, setDarkMode] = useState(false);

    return (
        <>
            <div style={{ backgroundColor: canvasColour }}>
                <div className="h-screen w-screen flex flex-row">

                    <LeftBar
                        darkMode={darkMode}
                        toggleEditPanel={toggleEditPanel}
                        pages={pages}
                        currentPageId={currentPageId}
                        setCurrentPageId={setCurrentPageId}
                        removePage={removePage}
                        currentPageItems={currentPageItems}
                        selectedId={selectedId}
                        setSelectedId={setSelectedId}
                        removeFromCanvas={removeFromCanvas}
                        openPanel={openPanel}
                        openFolder={openFolder}
                        togglePanel={togglePanel}
                        toggleFolder={toggleFolder}
                        projects={projects}
                        setOpenFolder={setOpenFolder}
                        addToCanvas={addToCanvas}
                        components={components}
                    />

                    {/* canvas */}
                    <div className="flex-1 h-full" />

                    <Canvas canvasColour={canvasColour} activeCursor={activeCursor} onSelect={setSelectedId}>
                        <Page
                            pageId={currentPageId}
                            pageName={currentPage.name}
                            onPageNameChange={updatePageName}
                            items={currentPageItems}
                            itemStyles={currentItemStyles}          
                            selectedId={selectedId}
                            onSelect={setSelectedId}
                            onRemove={removeFromCanvas}
                            activeCursor={activeCursor}
                            pageColour={currentPageColour}
                            dimensions={currentPage.dimensions}
                        />
                    </Canvas>

                    {/* right side bar menu - mainly for editing styles of components on the canvas */}
                    <div className={`w-1/6 flex flex-col relative z-10 ${darkMode ? "bg-[#111317]" : "bg-[#EBFFF2]"}`}>
                        <div className="flex flex-row items-center w-full px-4 h-20 justify-between shrink-0">
                            <div className="rounded-full px-4 h-8 text-md bg-[#B5446E] text-[#EBFFF2] font-fustat-medium items-center justify-center flex">
                                Publish Portfolio
                            </div>
                            <div className="rounded-full px-4 h-8 border-[#B5446E] border-2 text-[#B5446E] font-fustat-medium items-center justify-center flex">
                                <i className="fa fa-download fa-md"></i>
                            </div>
                        </div>

                        {openEditPanel === 'shapes' ? (
                            /* shapes creation menu */
                            <div>
                                <div className={`space-y-4 p-4 border-t-2 ${darkMode ? "border-[#EBFFF2]" : "border-[#111317]"}`}>
                                    <div className={`space-y-2 text-lg font-fustat-semibold ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}>
                                        <p>Shapes</p>
                                    </div>
                                </div>
                                <div className={`scrollbar-hide border-[#111317] ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}>
                                    <div className="grid grid-cols-2 gap-2 px-4">
                                        <div onClick={() => { addToCanvas('square'); toggleEditPanel('shapes'); }} className="flex flex-col items-center justify-center text-center space-y-2 p-2 hover:bg-[#B5446E]/8 rounded cursor-pointer">
                                            <i className="fa fa-square fa-2x text-[#B5446E]"></i>
                                            <span className="text-sm">Square</span>
                                        </div>
                                        <div onClick={() => { addToCanvas('rectangle'); toggleEditPanel('shapes'); }} className="flex flex-col items-center justify-center text-center space-y-2 p-2 hover:bg-[#B5446E]/8 rounded cursor-pointer">
                                            <i className="fa fa-square fa-2x text-[#B5446E]"></i>
                                            <span className="text-sm">Rectangle</span>
                                        </div>
                                        <div onClick={() => { addToCanvas('triangle');  toggleEditPanel('shapes'); }} className="flex flex-col items-center justify-center text-center space-y-2 p-2 hover:bg-[#B5446E]/8 rounded cursor-pointer">
                                            <i className="fa fa-play fa-2x text-[#B5446E]"></i>
                                            <span className="text-sm">Triangle</span>
                                        </div>
                                        <div onClick={() => { addToCanvas('circle'); toggleEditPanel('shapes'); }} className="flex flex-col items-center justify-center text-center space-y-2 p-2 hover:bg-[#B5446E]/8 rounded cursor-pointer">
                                            <i className="fa fa-circle fa-2x text-[#B5446E]"></i>
                                            <span className="text-sm">Circle</span>
                                        </div>
                                        <div onClick={() => { addToCanvas('star'); toggleEditPanel('shapes'); }} className="flex flex-col items-center justify-center text-center space-y-2 p-2 hover:bg-[#B5446E]/8 rounded cursor-pointer">
                                            <i className="fa fa-star fa-2x text-[#B5446E]"></i>
                                            <span className="text-sm">Star</span>
                                        </div>
                                    </div>
                                </div>

                                {/* for shapes by mo */}
                                <div className={`mt-12 scrollbar-hide border-[#111317] ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}>
                                    <div className="grid grid-cols-2 gap-2 px-4">
                                        <div onClick={() => { addToCanvas('shape1'); toggleEditPanel('shapes'); }} className="flex flex-col items-center justify-center text-center space-y-2 p-2 hover:bg-[#B5446E]/8 rounded cursor-pointer">
                                            <i className="fa fa-shapes fa-2x text-[#B5446E]"></i>
                                            <span className="text-sm">Shape 1</span>
                                        </div>
                                        <div onClick={() => { addToCanvas('shape2'); toggleEditPanel('shapes'); }} className="flex flex-col items-center justify-center text-center space-y-2 p-2 hover:bg-[#B5446E]/8 rounded cursor-pointer">
                                            <i className="fa fa-shapes fa-2x text-[#B5446E]"></i>
                                            <span className="text-sm">Shape 2</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : openEditPanel === 'pages' ? (
                            /* pages creation menu */
                            <div>
                                <div className={`space-y-4 p-4 border-t-2 ${darkMode ? "border-[#EBFFF2]" : "border-[#111317]"}`}>
                                    <div className={`space-y-2 text-lg font-fustat-semibold ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}>
                                        <p>Add new page</p>
                                    </div>
                                </div>

                                <div className={`scrollbar-hide space-y-4 text-md font-fustat-semibold border-[#111317] ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}>
                                    {/* page name input */}
                                    <div className="px-4">
                                        <p className="text-md font-fustat-semibold mb-1">Page Name</p>
                                        <input 
                                            type="text"
                                            value={newPageName}
                                            onChange={(e) => setNewPageName(e.target.value)}
                                            className={`bg-transparent flex flex-row items-center w-full px-2 py-1 border-2 rounded-md text-base font-fustat-medium space-x-2 ${darkMode ? "border-[#EBFFF2]" : "border-[#111317]"}`}                                            
                                            placeholder="Enter page name..."
                                        />
                                    </div>

                                    {/* page colour picker */}
                                    <div className="px-4">
                                        <p className="text-md font-fustat-semibold mb-1">Page Colour</p>
                                        <ColourPicker 
                                            color={newPageColour}
                                            onChange={setNewPageColour}
                                            darkMode={darkMode}
                                        />
                                    </div>

                                    {/* screen size input */}
                                    <div className="px-4">
                                        <p className="text-md font-fustat-semibold mb-1">Dimensions</p>
                                        <select 
                                            value={selectedDimensions} 
                                            onChange={(e) => setSelectedDimensions(e.target.value)}
                                            className={`bg-transparent flex flex-row items-center w-full px-2 py-1 border-2 rounded-md text-base font-fustat-medium space-x-2 ${darkMode ? "border-[#EBFFF2]" : "border-[#111317]"}`}      
                                        >
                                            <option value="720x480">720 x 480</option>
                                            <option value="1280x720">1280 x 720</option>
                                            <option value="1920x1080">1920 x 1080</option>
                                            <option value="2480x3508">A4 - 2480 x 3508</option>
                                        </select>
                                    </div>

                                    <div className="px-4 flex justify-center">
                                        <button 
                                            onClick={() => {
                                                const [width, height] = selectedDimensions.split('x').map(Number);
                                                addPage({ 
                                                    name: newPageName, 
                                                    colour: newPageColour, 
                                                    dimensions: { width, height } 
                                                });
                                                toggleEditPanel('pages');

                                                setNewPageName('Untitled Page');
                                                setNewPageColour('#B5446E');
                                                setSelectedDimensions('720x480');
                                            }}
                                            className="rounded-full px-4 h-8 text-md bg-[#B5446E] text-[#EBFFF2] font-fustat-medium items-center justify-center flex"
                                        >
                                            Create Page
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* styling menus */
                            <div className={`flex-1 p-4 border-t-2 ${darkMode ? "border-[#EBFFF2] text-[#EBFFF2]" : "border-[#111317] text-[#111317]"}`}>
                                {selectedId === null ? (
                                    <>
                                        {/* default styling menu is for colouring canvas */}
                                        <p className="text-lg font-fustat-semibold mb-1">Canvas</p>
                                        <ColourPicker color={canvasColour} onChange={setCanvasColour} darkMode={darkMode} />
                                    </>
                                ) : selectedId === 'page' ? (
                                    <>
                                        {/* styling menu for colouring page */}
                                        <p className="text-lg font-fustat-semibold mb-1">Page</p>
                                        <ColourPicker 
                                            color={currentPageColour} 
                                            onChange={(val) => updatePageColour(currentPageId, val)} 
                                            darkMode={darkMode} 
                                        />
                                    </>
                                ) : (
                                    <>
                                        {/* styling menu for components such as shapes and text */}
                                        <p className="text-lg font-fustat-semibold mb-1 capitalize">{selectedItem?.type}</p>
                                        <ColourPicker
                                            color={currentItemStyles[selectedItem.id]?.fill ?? defaultColour[selectedItem.type]}
                                            onChange={val => onStyleChange(selectedItem?.id, 'fill', val)}
                                            darkMode={darkMode}
                                        />
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <Toolbar
                    activeCursor={activeCursor}
                    setActiveCursor={setActiveCursor}
                    toggleEditPanel={toggleEditPanel}
                    addToCanvas={addToCanvas}
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                />
            </div>
        </>
    );
}

export default App;