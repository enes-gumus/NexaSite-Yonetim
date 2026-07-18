import api from "./api";



export async function getPayments(){

    const response = await api.get(
        "/payments"
    );

    return response.data;

}





export async function createPayment(payment){

    const response = await api.post(
        "/payments",
        payment
    );

    return response.data;

}





export async function updatePayment(
    id,
    payment
){

    const response = await api.put(
        `/payments/${id}`,
        payment
    );

    return response.data;

}





export async function deletePayment(id){

    const response = await api.delete(
        `/payments/${id}`
    );

    return response.data;

}
