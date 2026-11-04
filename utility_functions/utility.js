//Check if call is not archived
export function isNotArchived(call){
    return !(call['is_archived']);
}

//Check if a call is archived
export function isArchived(call){
    return call['is_archived'];
}