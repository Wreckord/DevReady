import { read_calls } from "../access data/data_read_write.js";
import { isArchived } from "../utility_functions/utility.js";
import { getCallById } from "../basic services/call_service.js";

//Get the Archived Calls from the JSON file
export async function getArchivedCalls(){
    let calls=await read_calls();
    try{
        return calls.filter(isArchived);
    }catch(err){
        console.error(err);
        return null;
    }
}

//Unrchive a Call
export async function unarchiveCall(callId) {
    let call=await getCallById(callId);
    if(call!==null && call!==-1){
        call['is_archived']=false;
        return call;
    }else{
        return null;
    }
}

//Filter a Call's Property
export function updateCall(call, property_name, updated_value){
    try{
        call[property_name]=updated_value;
        return call;
    }catch(err){
        console.error(err);
        return null;
    }
}

//Add a new Note
export function addNote(call, content) {
    if(!content || typeof(content)!=='string' || content.trim()===''){
        return null;
    }
    let notes=[];
    if(call['notes']===undefined){
        notes.push({
            id: 'note-1',
            content: content
        });
        call['notes']=notes;
    }else{
        notes=call['notes'];
        let last_id=Number(notes[notes.length-1].id.substring(5));
        notes.push({
            id: 'note-'+String(last_id+1),
            content: content
        });
        call['notes']=notes;
    }
    return call;
}

//Delete a call
export async function deleteCall(call_id) {
    let calls=await read_calls();
    if(calls===null){
        return null;
    }
    return calls.filter((call)=>call['id']!==String(call_id));
}