import React, {useEffect, useState} from 'react';
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import {ContactData} from "@/models/ContactData";
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


export let currentSelectedContactId: string | null = null;

export function OrderContactSelection() {

    const router = useRouter();

    const [contactList, setContactList] = useState<ContactData[]>([]);

    useEffect(() => {
        const getContactList = async () => {
            try {
                const response = await axios.get(process.env.NEXT_PUBLIC_USERHUB_BASE_URL +
                    "/contact/getAllContactByUserId/" + sessionStorage.getItem("userId"));
                if (response.status === 200) {
                    setContactList(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };

        getContactList();
    }, []); // Empty dependency array means this effect runs once on component mount


    const onClickOnContactEdit = (contact: ContactData) => {
        sessionStorage.setItem('ContactEdit', JSON.stringify(contact));
        router.push("placeOrder/editContact")
    }

    const onAddressSelected = (selectedContactId: string) => {
        currentSelectedContactId = selectedContactId;
        sessionStorage.setItem('selectedContactId', selectedContactId);
        console.log("saved selectedContactId : " + selectedContactId);
    }

    return (
        <div className="border-8 rounded-8xl divide-y-2 divide-yellow-500 pb-2.5">
            <div>select delivery Contact</div>
            <RadioGroup onValueChange={(value) => {
                onAddressSelected(value);
            }}>
                {contactList.map((contact) => (
                    <div className="flex items-center" key={contact.contactId}>
                        <RadioGroupItem value={String(contact.contactId)}
                                        id={`radio-${contact.contactId}`}/>
                        <Label className="pl-4" htmlFor={`radio-${contact.contactId}`}>
                            <DropdownMenu>
                                <DropdownMenuTrigger>{contact.contactType}</DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="flex-row justify-between bg-amber-900 bg-black bg-transparent/75 text-white">
                                    <DropdownMenuLabel>
                                        <div
                                            className="relative flex flex-row justify-between border-black text-white text-2xl">
                                            <div className="">{contact.contactType}</div>
                                            <button className="pr-2" onClick={() => {
                                                onClickOnContactEdit(contact)
                                            }}>
                                                <Pencil2Icon/></button>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator/>
                                    <DropdownMenuItem>mobileNumber1 : {contact.mobileNumber1}</DropdownMenuItem>
                                    <DropdownMenuItem>mobileNumber2 : {contact.mobileNumber2}</DropdownMenuItem>
                                    <DropdownMenuItem>email : {contact.email}</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
}
