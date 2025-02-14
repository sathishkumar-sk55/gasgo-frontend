import React, {useEffect, useState} from 'react';
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import {AddressData} from "@/models/AddressData";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Pencil2Icon} from "@radix-ui/react-icons";
import {useRouter} from "next/navigation";
import axios from "axios";
import checkIsAuthenticated from "@/lib/AuthState";


export let currentSelectedAddressId: string | null = null;

export function OrderAddressSelection() {

    const router = useRouter();

    const [addressList, setAddressList] = useState<AddressData[]>([]);

    useEffect(() => {
        const getAddressList = async () => {
            await checkIsAuthenticated()
                .then(async (userId) => {
                    try {

                        const response = await axios.get(process.env.NEXT_PUBLIC_USERHUB_BASE_URL +
                            "/address/getAllAddressByUserId/" + userId);
                        if (response.status === 200) {
                            setAddressList(response.data);
                        }
                    } catch (error) {
                        console.error(error);
                    }
                })
        };

        getAddressList();
    }, []);


    const onClickOnAddressEdit = (address: AddressData) => {
        sessionStorage.setItem('AddressEdit', JSON.stringify(address));
        router.push("placeOrder/editAddress")
    }

    const onAddressSelected = (selectedAddressId: string) => {
        currentSelectedAddressId = selectedAddressId
        sessionStorage.setItem('selectedAddressId', selectedAddressId);
        console.log("saved selectedAddressId : " + selectedAddressId);
    }

    return (
        <div className="border-8 rounded-8xl divide-y-2 divide-yellow-500 pb-2.5">
            <div>select delivery Address</div>
            <RadioGroup onValueChange={(value) => {
                onAddressSelected(value);
            }}>
                {addressList.map((address) => (
                    <div className="flex items-center" key={address.addressId}>
                        <RadioGroupItem value={String(address.addressId)}
                                        id={`radio-${address.addressId}`}/>
                        <Label className="pl-4" htmlFor={`radio-${address.addressId}`}>
                            <DropdownMenu>
                                <DropdownMenuTrigger>{address.addressType}</DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="flex-row justify-between bg-amber-900 bg-black bg-transparent/75 text-white">
                                    <DropdownMenuLabel>
                                        <div
                                            className="relative flex flex-row justify-between border-black text-white text-2xl">
                                            <div className="">{address.addressType}</div>
                                            <button className="pr-2" onClick={() => {
                                                onClickOnAddressEdit(address)
                                            }}>
                                                <Pencil2Icon/></button>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem>Address
                                        : {address.addressLine1} {address.addressLine2}</DropdownMenuItem>
                                    <DropdownMenuItem>City : {address.city}</DropdownMenuItem>
                                    <DropdownMenuItem>State : {address.state}</DropdownMenuItem>
                                    <DropdownMenuItem>Country : {address.country}</DropdownMenuItem>
                                    <DropdownMenuItem>PinCode : {address.pincode}</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                        </Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
}
