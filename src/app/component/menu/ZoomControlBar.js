"use client"

export default function ZoomControlBar({
    handleZoomControl,
zoomValue
}){
return(
    <>
    <div style={{
        width:"100%",
        position:"fixed",
        bottom:"0",
        zIndex:1600,
        height:"5vh",
        display:"flex",
        alignItems:"center",
        background:"white",
        marginTop:"-13vh",
        boxShadow:"rgba(64, 87, 109, 0.07) 0px 0px 0px 1px, rgba(53, 71, 90, 0.2) 0px 2px 12px" 
    }}>
        <div style={{
            width:"60vh",
            height:"3vh",
            position:"absolute",
            right:"50vh",
            display:"flex",
            alignItems:"center",
            justifyContent:"center"
            }}>

        <input onChange={(e)=>{ console.log((e.target.value/100).toFixed(2)); const data=(e.target.value/100).toFixed(2); handleZoomControl(data)}} type="range" style={{
            width:"45vh",
            height:"3vh",
        }}
        value={((zoomValue*100).toFixed(2))}
        />
        <div style={{width:"10vh",height:"100%",marginLeft:"5vh"}}>{((zoomValue*100).toFixed(0))}%</div>
        </div>
    </div>
    </>
)

}