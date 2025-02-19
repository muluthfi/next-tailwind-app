import react from 'react';
import { render } from 'react-dom';
import { useState } from 'react';
import { redirect } from 'next/dist/server/api-utils';

export async function getServerSideProps() {
    const response = await fetch("http://localhost:3000/transaction");
    const headers = response.headers;
    const datas = await response.json();
    if(headers!=200){
        return {
            error: {
                status: headers,
                message: headers.message,
            }
        }
    }

    return {
        props: {
            get: datas,
        },
    }    
}

export default function Transaction({ get }) {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 transition-opacity duration-700 ease-in opacity-100 hover:opacity-0">Transactions</h1>
            <table className="min-w-full border-collapse border-black transition-opacity duration-700 ease-in opacity-100 hover:opacity-0">
                <thead>
                    <tr>
                        <th className="border py-2 text-center">Date</th>
                        <th className="border py-2 text-center">Amount</th>
                        <th className="border py-2 text-center">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {get.map((data) => (
                        <tr key={data._id}>
                            <td className="border px-4 py-2 text-center">{data.date}</td>
                            <td className="border px-4 py-2 text-center">{data.amount}</td>
                            <td className="border px-4 py-2 text-center">{data.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}