import {Schema, model, models} from 'mongoose';

const certificateTemplateSchema=new Schema({
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


const certificateTemplate=models.certificateTemplate || model("certificateTemplate",certificateTemplateSchema);
export default certificateTemplate;