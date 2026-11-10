import { read_calls } from "../access data/data_read_write.js";
import { isNotArchived } from "../utility_functions/utility.js";

//Get the Non-Archived Calls from JSON file
export async function getAllCalls(){
    let calls=await read_calls();
    try{
        return calls.filter(isNotArchived);
    }catch(err){
        console.error(err);
        return null;
    }
}

//Get a single call by ID
export async function getCallById(callId) {
    try{
        let calls=await read_calls();
        for(let i=0; i<calls.length; i++){
            if(calls[i].id===callId){
                return calls[i];
            }
        }
        return null;
    }catch(err){
        console.error(err);
        return -1;
    }
}

//Archive a Call
export async function archiveCall(callId) {
    let call=await getCallById(callId);
    if(call!==null && call!==-1){
        call['is_archived']=true;
        return call;
    }else{
        return null;
    }
}