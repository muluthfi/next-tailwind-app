import react from 'react';
import { render } from 'react-dom';
import { useState } from 'react';
import { redirect } from 'next/dist/server/api-utils';

export async function getServerSideProps() {
    const response = await fetch("http://localhost:3000/transaction", { headers: {
        'authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imx1dGhmaSIsImlhdCI6MTczOTkzNTc4MywiZXhwIjoxNzM5OTM5MzgzfQ.FPY-hjQQsWcwJRTVwgqVxgbuJ1XLM2SI6RonA2AdDUc'
    }});
    const datas = await response.json();
    const status = await response.status;
    return {
        props: {
            get: datas,
            status: status
        },
    }    
}

export default function Transaction({ get,status }) {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 transition-opacity duration-700 ease-in opacity-100 hover:opacity-0 text-center">Transactions</h1>
            <table className="min-w-full border-collapse border-black transition-opacity duration-700 ease-in opacity-100 hover:opacity-0">
                <thead>
                    <tr>
                        <th className="border py-2 text-center">Date</th>
                        <th className="border py-2 text-center">Amount</th>
                        <th className="border py-2 text-center">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {status!==200 && <tr><td colSpan="3">Unauthorized</td></tr>}
                    {status === 200 &&
                    get.map((data) => (
                        <tr key={data._id}>
                            <td className="border px-4 py-2 text-center">{new Date(data.date).toLocaleDateString()}</td>
                            <td className="border px-4 py-2 text-center">{data.amount}</td>
                            <td className="border px-4 py-2 text-center">{data.description}</td>
                        </tr>
                    ))
                    }
                    
                </tbody>
            </table>
        </div>
    );
}