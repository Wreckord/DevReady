import { read_calls, write_calls } from "../access data/data_read_write.js";
import { getCallById,archiveCall } from "../basic services/call_service.js";
import { addNote, deleteCall, unarchiveCall } from "../advanced services/advanced_call_service.js";
import express from 'express';

export const app=express();
export const PORT=8000;

//Middleware to Parse JSON for any Body types that may need to appear
app.use(express.json());

//Getting All Calls
app.get('/calls', async (req,res)=>{
    const queries=req.query;
    let calls=await read_calls(Object.keys(queries)[0],Object.values(queries)[0]);
    if(calls[0]===undefined){
        return res.status(500).send({message: "Server Error: Calls can't be read"});
    }
    res.status(200).send(calls);
});

//Getting Specific Call
app.get('/calls/:callId', async (req,res)=>{
    const callId=req.params.callId;
    let call=await getCallById(callId);
    if(call===null){
        return res.status(404).send({message: 'Call not found'});
    }
    res.status(200).send(call);
})

//Archiving a Call
app.patch('/calls/:callId/archive', async (req,res)=>{
    const callId=req.params.callId;
    let call=await archiveCall(callId);
    if (call===null){
        return res.status(404).send({message: 'Call Not Found'});
    }
    let calls=await read_calls();
    if(calls[0]===undefined){
        return res.status(500).send({message: "Server Error: Calls can't be read"});
    }
    for(let i=0; i<calls.length; i++){
        if(calls[i]['id']===callId){
            calls[i]=call;
            break;
        }
    }
    await write_calls(calls);
    res.status(200).send(call);
})

//Unarchiving a Call
app.patch('/calls/:callId/unarchive', async (req,res)=>{
    const callId=req.params.callId;
    let call=await unarchiveCall(callId);
    if (call===null){
        return res.status(404).send({message: 'Call Not Found'});
    }
    let calls=await read_calls();
    if(calls[0]===undefined){
        return res.status(500).send({message: "Server Error: Calls can't be read"});
    }
    for(let i=0; i<calls.length; i++){
        if(calls[i]['id']===callId){
            calls[i]=call;
            break;
        }
    }
    await write_calls(calls);
    res.status(200).send(call);
})

//Writing a Note
app.post('/calls/:callId/notes', async(req,res)=>{
    const callId=req.params.callId;
    let call=await getCallById(callId);
    if(call===null){
        return res.status(404).send({message: 'Call not found'});
    }
    const content=req.body.content;
    let addedCall=addNote(call,content);
    let calls=await read_calls();
    if(calls[0]===undefined){
        return res.status(500).send({message: "Server Error: Calls can't be read"});
    }
    for(let i=0; i<calls.length; i++){
        if(calls[i]['id']===callId){
            calls[i]=addedCall;
            break;
        }
    }
    await write_calls(calls);
    res.status(200).send(addedCall);     
})

//Delete a Call
app.delete('/calls/:callId', async (req,res)=>{
    const callId=req.params.callId;
    let calls=await deleteCall(callId);
    if(calls===null){
        return res.status(500).send({message: "Server Error: Calls can't be read"});
    }
    await write_calls(calls);
    res.status(200).send(calls);
})