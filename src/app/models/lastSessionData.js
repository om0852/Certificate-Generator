import {Schema, model, models} from 'mongoose';

const lastSessionDataSchema=new Schema({
userId:{
    type:String,
    required:[true,'User ID is required'],
},
certificateComponentData:{
    type:Array
},
backgroundImage:{
    type:String,
required:[true,'Background Image is required']
}

},
{ timestamps: true });


const lastSessionData=models.LastSessionData || model("LastSessionData",lastSessionDataSchema);
export default lastSessionData;