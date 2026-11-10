import { read_calls, write_calls } from "../access data/data_read_write.js";
import { getCallById,archiveCall } from "../basic services/call_service.js";
import { addNote, deleteCall, unarchiveCall } from "../advanced services/advanced_call_service.js";
import express from 'express';

export const app=express();
export const PORT=8000;

//Call Update helper function
function updateCall(calls,call,callId){
    for(let i=0; i<calls.length; i++){
        if(calls[i].id===callId){
            calls[i]=call;
            break;
        }
    }
    return calls    
}

//Middleware to Parse JSON for any Body types that may need to appear
app.use(express.json());

//Middleware to allow basic Cross-Origin Resourse Sharing (CORS)
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

//Getting All Calls
app.get('/calls', async (req,res)=>{
    const queries=req.query;
    let calls=await read_calls(Object.keys(queries)[0],Object.values(queries)[0]);
    if(calls===null){
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
    if(call===-1){
        return res.status(500).send({message: "Server Error: Calls can't be read"});
    }
    res.status(200).send(call);
});

//Archiving a Call
app.patch('/calls/:callId/archive', async (req,res)=>{
    const callId=req.params.callId;
    let calls=await read_calls();
    if(calls===null){
        return res.status(500).send({message: "Server Error: Calls can't be read"});
    }
    let call=await archiveCall(callId);
    if (call===null){
        return res.status(404).send({message: 'Call Not Found'});
    }
    calls=updateCall(calls,call,callId);
    let update=await write_calls(calls);
    if(update===1){
        res.status(200).send(call);
    }else{
        return res.status(500).send({message: "Server Error: Calls can't be updated"});
    }
});

//Unarchiving a Call
app.patch('/calls/:callId/unarchive', async (req,res)=>{
    const callId=req.params.callId;
    let calls=await read_calls();
    if(calls===null){
        return res.status(500).send({message: "Server Error: Calls can't be read"});
    }
    let call=await unarchiveCall(callId);
    if (call===null){
        return res.status(404).send({message: 'Call Not Found'});
    }
    calls=updateCall(calls,call,callId);
    let update=await write_calls(calls);
    if(update===1){
        res.status(200).send(call);
    }else{
        return res.status(500).send({message: "Server Error: Calls can't be updated"});
    }
});

//Writing a Note
app.post('/calls/:callId/notes', async(req,res)=>{
    const callId=req.params.callId;
    let calls=await read_calls();
    if(calls===null){
        return res.status(500).send({message: "Server Error: Calls can't be read"});
    }
    let call=await getCallById(callId);
    if(call===null){
        return res.status(404).send({message: 'Call not found'});
    }
    const content=req.body.content;
    let addedCall=addNote(call,content);
    if(addedCall===null){
        return res.status(400).send({message: 'Note must be existent and a Non-Empty String'});
    }
    calls=updateCall(calls,call,callId);
    let update=await write_calls(calls);
    if(update===1){
        res.status(200).send(addedCall);
    }else{
        return res.status(500).send({message: "Server Error: Calls can't be updated"});
    }    
});

//Delete a Call
app.delete('/calls/:callId', async (req,res)=>{
    const callId=req.params.callId;
    let calls=await deleteCall(callId);
    if(calls===null){
        return res.status(500).send({message: "Server Error: Calls can't be read"});
    }
    let update=await write_calls(calls);
    if(update===1){
        res.status(200).send(calls);
    }else{
        return res.status(500).send({message: "Server Error: Calls can't be updated"});
    }
});

//Health Check Endpoint
app.get('/health', async (req,res)=>{
    const uptime=process.uptime();
    try{
        res.status(200).send({message: `Process Running Time: ${uptime} seconds`});
    }catch(err){
        res.status(503).send({message: err});
    }
});

