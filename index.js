import { getAllCalls, getCallById, archiveCall } from './basic services/call_service.js';
import { read_calls, write_calls } from './access data/data_read_write.js';

//Get Unarchived Calls
let unarchived_calls=await getAllCalls();
console.log(unarchived_calls);

//Get Call with id=10
let call=await getCallById('10');
console.log(call);

//Archive an Unarchived Call
let archived_call=await archiveCall('10')
console.log(archived_call);