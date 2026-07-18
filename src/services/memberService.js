import api from "./api";



export async function getMembers(){

    const response = await api.get(
        "/members"
    );

    return response.data;

}





export async function createMember(member){

    const response = await api.post(
        "/members",
        member
    );

    return response.data;

}





export async function updateMember(
    id,
    member
){

    const response = await api.put(
        `/members/${id}`,
        member
    );

    return response.data;

}





export async function deleteMember(id){

    const response = await api.delete(
        `/members/${id}`
    );

    return response.data;

}
