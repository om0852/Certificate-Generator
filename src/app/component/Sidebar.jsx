import React from 'react'


const Input = ({ placeholder, name, type, handleChange, value }) => (
    <input placeholder={placeholder} type={type} step='0.0001 ' value={value} onChange={(e) => handleChange(name, e)} className='my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism' />
)
const Sidebar = ({addFields,handleTextFieldChange,textFields}) => {
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


        <div className='bg-blue-700' style={{width:"30vh",height:"100vh"}}>
<button onClick={()=>{addFields()}}>submit</button>
{textFields && textFields.map((data,index)=>{
    return(
        <>
    <input id={data.id} value={data.text} onChange={(e)=>{handleTextFieldChange(e,index)}} placeholder='enter some text' style={{width:"90%",color:"black",margin:"2vh auto", marginLeft:"1vh"}}/>
        </>
    )
})}
                </div>
    )

}

export default Sidebar
