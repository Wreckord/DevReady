import fs from 'node:fs/promises';
//Read and Write functions for the JSON file

export async function read_calls(property, value) {
    try{
        const datastream=await fs.readFile('./data/data.json');
        const parsedData=JSON.parse(datastream);
        if((property===null)||(value===null)){
            return parsedData;
        }else{
            return parsedData.filter((call)=>call[property]===value);
        }
    }catch(err){
        console.error(err);
        return null;
    }
}

export async function write_calls(call_stream) {
    try{
        const datastream=JSON.stringify(call_stream, null, 4);
        await fs.writeFile('./data/data.json', datastream, 'utf-8');
        console.log('Data Updated Successfully');
        return 1;
    }catch(err){
        console.error(err);
        return null
    }
}