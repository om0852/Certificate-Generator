import {Schema, model, models} from 'mongoose';

const shapeSchema=new Schema({
img:{
    type:String,
},
title:{
    type:String
}

});


const shapeModel=models.shape || model("shape",shapeSchema);
export default shapeModel;