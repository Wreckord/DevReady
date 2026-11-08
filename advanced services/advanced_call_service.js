import { read_calls } from "../access data/data_read_write.js";
import { isArchived } from "../utility_functions/utility.js";
import { getCallById } from "../basic services/call_service.js";

//Get the Archived Calls from the JSON file
export async function getArchivedCalls(){
    let calls=await read_calls();
    try{
        return calls.filter(isArchived);
    }catch(err){
        return err;
    }
}

//Unrchive a Call
export async function unarchiveCall(callId) {
    let call=await getCallById(callId);
    if(call!==null){
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
        return err;
    }
}

//Add a new Note
export function addNote(call, content) {
    let notes=[];
    if(call['notes']===undefined){
        notes[0]={
            id: 'note-1',
            content: content
        };
        call['notes']=notes;
    }else{
        notes=call['notes'];
        let last_id=Number(notes[notes.length-1]['id'].substring(5));
        notes[notes.length]={
            id: 'note-'+String(last_id+1),
            content: content
        };
        call['notes']=notes;
    }
    return call;
}

//Delete a call
export async function deleteCall(call_id) {
    let calls=await read_calls();
    if(calls[0]===undefined){
        return null;
    }
    return calls.filter((call)=>call['id']!==String(call_id));
}