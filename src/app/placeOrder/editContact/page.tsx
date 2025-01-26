"use client"
import React, {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {useRouter} from "next/navigation";
import {ContactData} from "@/models/ContactData";


export default function EditContact() {

    const [contact, setcontact] = useState<ContactData>();

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [submitFailure, setSubmitFailure] = React.useState(false);
    const router = useRouter();


    useEffect(() => {
        const storedContact = sessionStorage.getItem("ContactEdit")
        if (storedContact) {
            setcontact(JSON.parse(storedContact));
        }
    }, []);

    useEffect(() => {

        if (contact != null &&
            contact.contactType.length > 0 &&
            contact.mobileNumber1.length > 0 &&
            contact.mobileNumber2.length > 0 &&
            contact.email.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [contact]);

    const sumbitOnClick = async () => {
        console.log("sumbitOnClick");
        try {
            setLoading(true);
            setButtonDisabled(true);
            const response: AxiosResponse<ContactData> = await axios.patch(process.env.NEXT_PUBLIC_USERHUB_BASE_URL + "/contact/updateContactById/" + contact?.contactId, contact);

            console.log(response);

            if (response.status == 200) {
                router.push("/placeOrder");
            }

        } catch (error: any) {
            console.log(error.message);
            setSubmitFailure(true);
            setLoading(false);
        }
    }

    if (!contact) return <div>Loading...</div>;

    return (
        <div
            className="h-screen flex items-center justify-center text-center text-black ">
            <div className="bg-black bg-transparent/5">
                <h1 className="text-center text-2xl pb-2">Edit Address</h1>
                <hr className="border-black border-t-2 border-opacity-50"/>
                <label className="text-center text-red-600"
                       htmlFor="login error"
                >{submitFailure ? "Invalid Inputs!!!" : ""}</label>
                <form className="mt-6">
                </form>

                <div className="">
                    <label className="flex justify-start pl-2" htmlFor="username">contactType : </label>
                    <input
                        id="contactType"
                        type="text"
                        placeholder="contactType"
                        value={contact.contactType}
                        className="input input-bordered input-success w-full max-w-xs text-white text-center bg-transparent/10"
                        onChange={(event) => setcontact({...contact, contactType: event.target.value})}
                    />
                </div>
                <div className="">
                    <label className="flex justify-start pl-2" htmlFor="username">mobileNumber1 : </label>
                    <input
                        id="mobileNumber1"
                        type="text"
                        placeholder="mobileNumber1"
                        value={contact.mobileNumber1}
                        className="input input-bordered input-success w-full max-w-xs text-white text-center bg-transparent/10"
                        onChange={(event) => setcontact({...contact, mobileNumber1: event.target.value})}
                    />
                </div>
                <div className="">
                    <label className="flex justify-start pl-2" htmlFor="username">mobileNumber2 : </label>
                    <input
                        id="mobileNumber2"
                        type="text"
                        placeholder="mobileNumber2"
                        value={contact.mobileNumber2}
                        className="input input-bordered input-success w-full max-w-xs text-white text-center bg-transparent/10"
                        onChange={(event) => setcontact({...contact, mobileNumber2: event.target.value})}
                    />
                </div>
                <div className="">
                    <label className="flex justify-start pl-2" htmlFor="username">email : </label>
                    <input
                        id="email"
                        type="text"
                        placeholder="email"
                        value={contact.email}
                        className="input input-bordered input-success w-full max-w-xs text-white text-center bg-transparent/10"
                        onChange={(event) => setcontact({...contact, email: event.target.value})}
                    />
                </div>


                <div className="flex items-center justify-between pt-2.5 pb-2.5">
                    <button
                        onClick={sumbitOnClick}
                        disabled={buttonDisabled}
                        className="btn btn-wide flex bg-emerald-300 pl-2 pr-1 pt-0.5 pb-0.5">{loading ? "Loading..." : "Sumbit"}
                    </button>
                    <button
                        onClick={() => {
                            router.push("/placeOrder");
                        }}
                        className="btn btn-wide flex bg-emerald-300 pl-1 pr-2 pt-0.5 pb-0.5">Cancel
                    </button>
                </div>

            </div>
        </div>
    );

}