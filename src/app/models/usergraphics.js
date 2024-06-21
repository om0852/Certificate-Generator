import {Schema, model, models} from 'mongoose';

const graphicsSchema=new Schema({
userId:{
    type:String,
},
img:{
    type:Array
}

});


const GrpahicsModel=models.graphics || model("graphics",graphicsSchema);
export default GrpahicsModel;