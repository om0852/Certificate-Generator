import {Schema, model, models} from 'mongoose';

const certificateTemplateSchema=new Schema({
userId:{
    type:String,
    required:[true,'User ID is required'],
},
certificateComponentData:{
    type:Array,
    default:[
        { id: 1, x: 0, y: 0, text: 'Text 1', fontFamily: "Times New Roman",letterSpacing:0,lineHeight:10, size: 10, bold: "normal", italic: "normal", alignment: "justify", underline: "normal", textOrientation: "none", color: "black", z_index: 100, type: "textfield", transparency: 100, width: "200", height: "100", isSelected: true, isLocked: false },
    ]
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