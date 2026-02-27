import { useState } from "react";

import Canvas from './components/Canvas';

function App() {

    // for toggling project media and component library tabs
    const [openPanel, setOpenPanel] = useState(null);

    const togglePanel = (panel) => {
        setOpenPanel(prev => prev === panel ? null : panel);
    };

    // folders for project media and component libraries
    const projects = {
        'fire on marz': ["/images/1.png", "/images/2.png"], 
        'portfolioHub': [], 
        'The Green Room': [],
    };

    const components = {
        'Graphic Design': ['fa-bezier-curve', 
            {
                'h': 'h'
            }
        ],
        'Illustration': ['fa-paint-brush',
            {
                'h': 'h'
            }
        ],
        'Animation': ['fa-person-walking',
            {
                'h': 'h'
            }
        ],
        'UI/UX Design': ['fa-user-check',
            {
                'h': 'h'
            }
        ],
        'Software Design': ['fa-laptop-code',
            {
                'h': 'h'
            }
        ],
        'Game Design': ['fa-gamepad',
            {
                'h': 'h'
            }
        ],
        '3d Art / Animation': ['fa-cube',
            {
                'h': 'h'
            }
        ],
        'Photography': ['fa-camera',
            {
                'h': 'h'
            }
        ],
        'Film Production': ['fa-film',
            {
                'h': 'h'
            }
        ],
        'Fashion Design': ['fa-shirt',
            {
                'h': 'h'
            }
        ],
        'Architecture': ['fa-archway',
            {
                'h': 'h'
            }
        ],
        'Product Design': ['fa-box-open',
            {
                'h': 'h'
            }
        ],
        'Content Creation': ['fa-lightbulb',
            {
                'Social media embed': 'h'
            }
        ],
        'Marketing': ['fa-magnifying-glass-chart',
            {
                'h': 'h'
            }
        ],
        'Social Media Management': ['fa-hashtag',
            {
                'h': 'h'
            }
        ],
        'Journalism': ['fa-book-open',
            {
                'h': 'h'
            }
        ],
        'Screen Writing': ['fa-pen-clip',
            {
                'h': 'h'
            }
        ],
        'Creative Writing': ['fa-bookmark',
            {
                'h': 'h'
            }
        ],
        'Music': ['fa-music',
            {
                'h': 'h'
            }
        ],
    };


    // for toggling and directing individual project media or industry folders
    const [openFolder, setOpenFolder] = useState(null); 

    const toggleFolder = (name) => {
        setOpenFolder(prev => prev === name ? null : name);
    };


    // for toggling dark mode
    const [darkMode, setDarkMode] = useState(false);

    return (
        <>
            <div>
                <div className="h-screen w-screen flex flex-row">
                    <div className={`w-1/6 flex flex-col
                        ${darkMode ? "bg-[#111317]" : "bg-[#EBFFF2]"}`}
                    >
                        <div className={`flex flex-row items-center w-full px-4 h-20 text-lg font-fustat-bold space-x-2 justify-between shrink-0
                            ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}
                        >
                            <i className="fa fa-xl fa-briefcase text-[#003c66]"></i>
                            <div className="flex flex-row items-center space-x-2">
                                <p>art</p>
                                <i className="fa fa-circle-user text-[#B5446E] fa-xl"></i>
                            </div>
                        </div>

                        <div className={`flex-1 space-y-4 p-4 border-y-2 overflow-hidden
                            ${darkMode ? "border-[#EBFFF2]" : "border-[#111317]"}`}
                        >
                            <div className={`flex flex-row items-center w-full px-4 py-1 border-2 rounded-md text-lg font-fustat-medium space-x-2
                                ${darkMode ? "border-[#EBFFF2] text-[#EBFFF2]" : "border-[#111317] text-[#111317]"}`}
                            >
                                <i className="fa fa-search fa-sm"></i>
                                <p>Search</p>
                            </div>
                            <div className={`space-y-2 text-lg font-fustat-semibold
                                ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}
                            >
                                <p>Layers</p>
                                <div className="text-base font-fustat-medium">
                                    <p>Home</p>
                                </div>
                            </div>
                        </div>

                        <div className={`shrink-0
                            ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}
                        >
                            <div
                                className="flex flex-row items-center justify-between w-full px-4 py-2 text-lg font-fustat-medium cursor-pointer select-none hover:bg-[#B5446E]/2"
                                onClick={() => togglePanel('media')}
                            >
                                <div className="flex flex-row items-center space-x-2">
                                    <i className="fa fa-folder fa-sm"></i>
                                    <p>Project Media</p>
                                </div>
                                <i className={`fa fa-chevron-down fa-xs ${openPanel === 'media' ? 'rotate-180' : ''}`}></i>
                            </div>
                            {openPanel === 'media' && (
                                <div className="scrollbar-hide overflow-y-auto max-h-full space-y-2 p-4 text-sm font-fustat-medium border-t border-[#111317]">
                                    {openFolder && projects[openFolder] ? (
                                        // inner level - project media
                                        <div className="space-y-2">
                                            <div
                                                className="flex flex-row items-center space-x-2 text-base hover:text-[#B5446E] cursor-pointer mb-3"
                                                onClick={() => setOpenFolder(null)}
                                            >
                                                <i className="fa fa-chevron-left fa-xs"></i>
                                                <span>{openFolder}</span>
                                            </div>

                                            {/* checking if there are contents */}
                                            {projects[openFolder].length === 0 ? (
                                                <p className="text-xs text-gray-500 text-center">No media yet</p>
                                            ) : (
                                                projects[openFolder].map((item) => (
                                                    <div key={item} className="flex flex-row items-center space-x-2 px-2 py-1 hover:bg-[#B5446E]/8 rounded cursor-pointer">
                                                        <div className="w-full h-full">
                                                            <img 
                                                                src={item} 
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    ) : (
                                        // outer level - project folders
                                        <div className="grid grid-cols-2">
                                            {Object.entries(projects).map(([project, media]) => (
                                                <div key={project} className="flex flex-col items-center justify-center text-center space-y-2 p-2 hover:bg-[#B5446E]/8 rounded cursor-pointer" onClick={() => toggleFolder(project)}>
                                                    <i className="fa fa-folder fa-3x text-[#B5446E]"></i>
                                                    <span className="truncate">{project}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className={`shrink-0
                            ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}
                        >
                            <div
                                className="flex flex-row items-center justify-between w-full px-4 py-2 text-lg font-fustat-medium cursor-pointer select-none hover:bg-[#B5446E]/2 border-t-2 border-[#111317]"
                                onClick={() => togglePanel('components')}
                            >
                                <div className="flex flex-row items-center space-x-2">
                                    <i className="fa fa-shapes fa-sm"></i>
                                    <p>Component Libraries</p>
                                </div>
                                <i className={`fa fa-chevron-down fa-xs ${openPanel === 'components' ? 'rotate-180' : ''}`}></i>
                            </div>
                            {openPanel === 'components' && (
                                <div className="scrollbar-hide overflow-y-auto max-h-96 border-t border-[#111317]">
                                    {openFolder && components[openFolder] ? (
                                        // library components
                                        <div className="p-4 space-y-2">
                                            <div
                                                className="flex flex-row items-center space-x-2 text-base hover:text-[#B5446E] cursor-pointer mb-3"
                                                onClick={() => setOpenFolder(null)}
                                            >
                                                <i className="fa fa-chevron-left fa-xs"></i>
                                                <span>{openFolder}</span>
                                            </div>

                                            {/* checking if there are contents */}
                                            {Object.entries(components[openFolder][1]).map(([componentName, component]) => (
                                                <div key={componentName} className="flex flex-row items-center space-x-2 px-2 py-1 hover:bg-[#B5446E]/8 rounded cursor-pointer">
                                                    <i className="fa fa-shapes fa-xs text-[#B5446E]"></i>
                                                    <span className="font-fustat-medium">{componentName}</span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        // industry libraries
                                        <div className="grid grid-cols-2 gap-2 p-4">
                                            {Object.entries(components).map(([industry, [icon, subComponents]]) => (
                                                <div key={industry} className="flex flex-col items-center justify-center text-center space-y-2 p-2 hover:bg-[#B5446E]/8 rounded cursor-pointer" onClick={() => toggleFolder(industry)}>
                                                    <i className={`fa ${icon} fa-2x text-[#B5446E]`}></i>
                                                    <span className="text-sm line-clamp-2 leading-tight">{industry}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                    </div>

                    <div className="w-2/3 h-full flex items-center justify-center bg-[#1d2025]">
                        <div className="w-216 flex flex-col space-y-2 text-[#EBFFF2] font-fustat-medium text-md">
                            <div className="w-full flex flex-row justify-between">
                                <p>Home</p>
                                <p>720 x 480</p>
                            </div>
                            <Canvas />
                        </div>
                    </div>

                    <div className={`w-1/6 flex flex-col
                        ${darkMode ? "bg-[#111317]" : "bg-[#EBFFF2]"}`}
                    >
                        <div className="flex flex-row items-center w-full px-4 h-20 justify-between shrink-0">
                            <div className="rounded-full px-4 h-8 text-md bg-[#B5446E] text-[#EBFFF2] font-fustat-medium items-center justify-center flex">
                                Publish Portfolio
                            </div>
                            <div className="rounded-full px-4 h-8 border-[#B5446E] border-2 text-[#B5446E] font-fustat-medium items-center justify-center flex">
                                <i className="fa fa-download fa-md"></i>
                            </div>
                        </div>
                        <div className={`h-full space-y-4 p-4 border-t-2
                            ${darkMode ? "border-[#EBFFF2]" : "border-[#111317]"}`}
                        >
                            <div className={`space-y-2 text-lg font-fustat-semibold
                                ${darkMode ? "text-[#EBFFF2]" : "text-[#111317]"}`}
                            >
                                <p>Canvas</p>
                                <div className={`flex flex-row items-center w-full px-2 py-1 border-2 rounded-md text-base font-fustat-medium space-x-2
                                    ${darkMode ? "border-[#EBFFF2]" : "border-[#111317]"}`}
                                >
                                    <i className="fa fa-square fa-lg text-[#1d2025]"></i>
                                    <p>#1d2025</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="w-1/3 absolute left-1/2 -translate-x-1/2 bottom-8">
                        <div className={`py-2 px-8 flex items-center justify-between rounded-2xl fa-xl
                            ${darkMode ? "text-[#EBFFF2] bg-[#1F1F1F]" : "text-[#1F1F1F] bg-[#EBFFF2]"}`}
                        >
                            <i className="fa fa-arrow-pointer"></i>
                            <i className="fa fa-hand"></i>
                            <i className="fa fa-file-circle-plus"></i>
                            <i className="fa fa-draw-polygon"></i>
                            <i className="fa fa-font"></i>
                            <div className={`inline-block h-full min-h-[2em] w-1 self-stretch rounded-full
                                ${darkMode ? "bg-[#EBFFF2] " : "bg-[#1F1F1F]"}`}
                            ></div>
                            <div className={`flex flex-row items-center px-2 py-1 border-3 rounded-md text-lg font-fustat-semibold space-x-2
                                ${darkMode ? "border-[#EBFFF2] " : "border-[#1F1F1F]"}`}
                            >
                                <i className="fa-solid fa-magnifying-glass fa-sm"></i>
                                <p>60%</p>
                            </div>
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                            >
                                <i className={`fa ${darkMode ? "fa-sun" : "fa-moon"}`}></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;