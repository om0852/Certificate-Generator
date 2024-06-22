import {Schema, model, models} from 'mongoose';

const certificateTemplateSchema=new Schema({
userId:{
    type:String,
    required:[true,'User ID is required'],
},
certificateComponentData:{
    type:Array,
    default:[]
},
backgroundImg:{
    type:String,
    default:"welc,ome"
},
certificateName:{
    type:String
}
},
{ timestamps: true });


const certificateTemplate=models.certificateTemplate || model("certificateTemplate",certificateTemplateSchema);
export default certificateTemplate;