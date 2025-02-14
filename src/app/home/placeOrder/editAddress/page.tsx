"use client"
import React, {useEffect, useState} from "react";
import {AddressData} from "@/models/AddressData";
import axios, {AxiosResponse} from "axios";
import {useRouter} from "next/navigation";


export default function EditAddress() {

    const [address, setAddress] = useState<AddressData>();

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [submitFailure, setSubmitFailure] = React.useState(false);
    const router = useRouter();


    useEffect(() => {
        const storedAddress = sessionStorage.getItem("AddressEdit")
        if (storedAddress) {
            setAddress(JSON.parse(storedAddress));
        }
    }, []);

    useEffect(() => {

        if (address != null &&
            address.addressType.length > 0 &&
            address.addressLine1.length > 0 &&
            address.addressLine2.length > 0 &&
            address.city.length > 0 &&
            address.state.length > 0 &&
            address.country.length > 0 &&
            address.pincode.toString().length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [address]);

    const sumbitOnClick = async () => {
        console.log("sumbitOnClick");
        try {
            setLoading(true);
            setButtonDisabled(true);
            console.log(process.env.NEXT_PUBLIC_USERHUB_BASE_URL);
            const response: AxiosResponse<AddressData> = await axios.patch(process.env.NEXT_PUBLIC_USERHUB_BASE_URL + "/address/updateAddressById/" + address?.addressId, address);

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

    if (!address) return <div>Loading...</div>;

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
                    <label className="flex justify-start pl-2" htmlFor="username">Address Type : </label>
                    <input
                        id="Address Type"
                        type="text"
                        placeholder="AddressType"
                        value={address.addressType}
                        className="input input-bordered input-success w-full max-w-xs text-white text-center bg-transparent/10"
                        onChange={(event) => setAddress({...address, addressType: event.target.value})}
                    />
                </div>
                <div className="">
                    <label className="flex justify-start pl-2" htmlFor="username">addressLine1 : </label>
                    <input
                        id="addressLine1"
                        type="text"
                        placeholder="addressLine1"
                        value={address.addressLine1}
                        className="input input-bordered input-success w-full max-w-xs text-white text-center bg-transparent/10"
                        onChange={(event) => setAddress({...address, addressLine1: event.target.value})}
                    />
                </div>
                <div className="">
                    <label className="flex justify-start pl-2" htmlFor="username">addressLine2 : </label>
                    <input
                        id="addressLine2"
                        type="text"
                        placeholder="addressLine2"
                        value={address.addressLine2}
                        className="input input-bordered input-success w-full max-w-xs text-white text-center bg-transparent/10"
                        onChange={(event) => setAddress({...address, addressLine2: event.target.value})}
                    />
                </div>
                <div className="">
                    <label className="flex justify-start pl-2" htmlFor="username">city : </label>
                    <input
                        id="city"
                        type="text"
                        placeholder="city"
                        value={address.city}
                        className="input input-bordered input-success w-full max-w-xs text-white text-center bg-transparent/10"
                        onChange={(event) => setAddress({...address, city: event.target.value})}
                    />
                </div>
                <div className="">
                    <label className="flex justify-start pl-2" htmlFor="username">state : </label>
                    <input
                        id="state"
                        type="text"
                        placeholder="state"
                        value={address.state}
                        className="input input-bordered input-success w-full max-w-xs text-white text-center bg-transparent/10"
                        onChange={(event) => setAddress({...address, state: event.target.value})}
                    />
                </div>
                <div className="">
                    <label className="flex justify-start pl-2" htmlFor="username">country : </label>
                    <input
                        id="country"
                        type="text"
                        placeholder="country"
                        value={address.country}
                        className="input input-bordered input-success w-full max-w-xs text-white text-center bg-transparent/10"
                        onChange={(event) => setAddress({...address, country: event.target.value})}
                    />
                </div>
                <div className="">
                    <label className="flex justify-start pl-2" htmlFor="username">pincode : </label>
                    <input
                        id="pincode"
                        type="text"
                        placeholder="pincode"
                        value={address.pincode}

                        className="input input-bordered input-success w-full max-w-xs text-white text-center bg-transparent/10"
                        onChange={(event) => setAddress({...address, pincode: event.target.value})}
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