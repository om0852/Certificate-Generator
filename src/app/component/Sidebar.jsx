import React from 'react'


const Input = ({ placeholder, name, type, handleChange, value }) => (
    <input placeholder={placeholder} type={type} step='0.0001 ' value={value} onChange={(e) => handleChange(name, e)} className='my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism' />
)
const Sidebar = (props) => {
    return (
        // <div className=''>
        //     <div className='p-5 sm:w-96 w-full flex flex-col justify-start  items-center bg-gray-700 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 border border-gray-200'>
        //         <Input placeholder="Main Title" name="addressTo" type="text" handleChange={() => { }} />
        //         <Input placeholder="Subtitle" name="amount" type="number" handleChange={() => { }} />
        //         <Input placeholder="Text" name="keyword" type="text" handleChange={() => { }} />
        //         <Input placeholder="Signature" name="message" type="text" handleChange={() => { }} />
        //         <div className='h-[1px] w-full bg-gray-400 my-2' />
        //         {/* {true ?
        //                     (<Loader />)
        //                     : (<button type="button" onClick={handleSubmit} className='text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer'>
        //                         Send Now
        //                     </button>)} */}
        //     </div>
        // </div>


        <div className='bg-blue-700'>


            <span
                class="absolute text-white text-4xl top-5 left-4 cursor-pointer"
                onclick="openSidebar()"
            >
                <i class="bi bi-filter-left px-2 bg-gray-900 rounded-md"></i>
            </span>
            <div
                class="sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900"
            >
                <div class="text-gray-100 text-xl">
                    <div class="p-2.5 mt-1 flex items-center">
                        <i class="bi bi-app-indicator px-2 py-1 rounded-md bg-blue-600"></i>
                        <h1 class="font-bold text-gray-200 text-[15px] ml-3">Customize</h1>
                        <i
                            class="bi bi-x cursor-pointer ml-28 lg:hidden"
                            onclick="openSidebar()"
                        ></i>
                    </div>
                    <div class="my-2 bg-gray-600 h-[1px]"></div>
                </div>
                <div
                    class="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white"
                >
                    <i class="bi bi-search text-sm"></i>
                    <input
                        type="text"
                        placeholder="Search"
                        class="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
                    />
                </div>
                <div
                    class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                >
                    <i class="bi bi-house-door-fill"></i>
                    <span class="text-[15px] ml-4 text-gray-200 font-bold"><Input placeholder={"Main Title"} value={""} /></span>
                </div>
                <div
                    class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                >
                    <i class="bi bi-bookmark-fill"></i>
                    <span class="text-[15px] ml-4 text-gray-200 font-bold">
                        <Input placeholder={"Subtitle"} value={""} />
                    </span>
                </div>
                <div
                    class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                >
                    <i class="bi bi-house-door-fill"></i>
                    <span class="text-[15px] ml-4 text-gray-200 font-bold"><Input placeholder={"Descripotion"} value={""} /></span>
                </div>
                <div class="my-4 bg-gray-600 h-[1px]"></div>
                <div
                    class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                    onclick="dropdown()"
                >
                    <i class="bi bi-chat-left-text-fill"></i>
                    <div class="flex justify-between w-full items-center">

                        <span class="text-sm rotate-180" id="arrow">
                            <i class="bi bi-chevron-down"></i>
                        </span>
                    </div>
                </div>
                <div
                    class="text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold"
                    id="submenu"
                >

                </div>
                <div
                    class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
                >
                    <i class="bi bi-box-arrow-in-right"></i>
                    <span class="text-[15px] ml-4 text-gray-200 font-bold">Logout</span>
                </div>
            </div>
        </div>
    )

}

export default Sidebar
