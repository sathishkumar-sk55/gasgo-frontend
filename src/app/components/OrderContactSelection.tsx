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
import axios, {AxiosResponse} from "axios";
import {user} from "@/app/components/Navbar"

export let currentSelectedContactId: number | null = null;

export function OrderContactSelection() {

    const router = useRouter();

    const [contactList, setContactList] = useState<ContactData[]>([]);

    useEffect(() => {
        const getContactList = async () => {

            try {
                const response: AxiosResponse<ContactData[]> = await axios.get(process.env.NEXT_PUBLIC_USERHUB_BASE_URL +
                    "/contact/getAllContactByUserId/" + user?.userId);
                if (response.status === 200) {
                    setContactList(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        }


        getContactList();
    }, []);


    const onClickOnContactEdit = (contact: ContactData) => {
        sessionStorage.setItem('ContactEdit', JSON.stringify(contact));
        router.push("placeOrder/editContact")
    }

    const onAddressSelected = (selectedContactId: number) => {
        currentSelectedContactId = selectedContactId;
    }

    return (
        <div className=" ml-10 bg-blue-900 bg-transparent/40  divide-yellow-500 p-4">
            <div>select delivery Contact</div>
            <RadioGroup onValueChange={(value: string) => {
                onAddressSelected(parseInt(value));
            }}>
                {contactList.map((contact) => (
                    <div className="flex items-center " key={contact.contactId}>
                        <RadioGroupItem value={contact.contactId.toString()}
                                        id={`radio-${contact.contactId}`}/>
                        <Label className="pl-4 " htmlFor={`radio-${contact.contactId}`}>
                            <DropdownMenu>
                                <DropdownMenuTrigger>{contact.contactType}</DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="flex-row justify-between   bg-black text-white">
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
