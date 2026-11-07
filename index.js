import { getAllCalls, getCallById, archiveCall } from './basic services/call_service.js';
import { read_calls, write_calls } from './access data/data_read_write.js';
import { getArchivedCalls, unarchiveCall, updateCall, addNote, deleteCall} from './advanced services/advanced_call_service.js';

//Get Unarchived Calls
let unarchived_calls=await getAllCalls();
console.log(unarchived_calls);

//Get Call with id=10
let call=await getCallById('10');
console.log(call);

//Archive an Unarchived Call
let archived_call=await archiveCall('10')
console.log(archived_call);

//Get Archived Calls
let archived_calls=await getArchivedCalls();
console.log(archived_calls);

//Unarchive an Archived Call
let unarchived_call=await unarchiveCall('11');
console.log(unarchived_call);

//Updating a Call's Property
let call_to_be_updated=await getCallById('3');
let updated_call=await updateCall(call_to_be_updated, 'direction', 'outbound');
console.log(updated_call);

//Adding a Note on two Calls
let first_call_to_be_noted=await getCallById('6');
let first_noted_call=addNote(first_call_to_be_noted, 'Person is extremely rude. Caution advised');
let second_call_to_be_noted=await getCallById('4');
let second_noted_call=addNote(second_call_to_be_noted, 'Call was full of static. Haunted line is a plausible explanation');
console.log(first_noted_call);
console.log(second_noted_call);

//Updating the JSON File with the changes
let all_calls=await read_calls();
all_calls[2]=updated_call;
all_calls[3]=second_noted_call;
all_calls[5]=first_noted_call;
all_calls[9]=archived_call;
all_calls[10]=unarchived_call;
await write_calls(all_calls);

//Delete a Call from the JSON file
let calls_after_delete=await deleteCall('12');
await write_calls(calls_after_delete);