import fs from 'node:fs/promises';
//Read and Write functions for the JSON file

export async function read_calls() {
    try{
        const datastream=await fs.readFile('./data/data.json');
        return JSON.parse(datastream);
    }catch(err){
        return err;
    }
}

export async function write_calls(call_stream) {
    try{
        const datastream=JSON.stringify(call_stream, null, 4);
        await fs.writeFile('./data/data.json', datastream, 'utf-8');
        console.log('Data Updated Successfully');
    }catch(err){
        console.log(err);
    }
}