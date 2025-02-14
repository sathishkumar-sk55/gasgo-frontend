import {OrderData} from "@/models/OrderData";
import {Button} from "@/components/ui/button";
import {currentSelectedAddressId} from "@/app/components/OrderAddressSelection"
import {currentSelectedContactId} from "@/app/components/OrderContactSelection"
import {ToastMessage} from "@/lib/utils";
import axios from "axios";
import checkIsAuthenticated from "@/lib/AuthState";
import {user} from "@/app/components/Navbar"

async function sentRequest(order: OrderData) {
    await checkIsAuthenticated()
        .then(async (userId) => {
            try {
                const response = await axios.post(process.env.NEXT_PUBLIC_ORDER_MANAGER_BASE_URL +
                    "/order/PlaceOrder", order);
                if (response.status === 201) {
                    ToastMessage("Order placed", "Order Id : " + response.data.orderId);
                    console.log(response.data.orderId);
                } else {
                    ToastMessage(response.data.message, "Error Sending Request");
                }
            } catch (error) {
                ToastMessage("Error", "Error While Sending Request")
                console.error(error);
            }
        })

}

function createRequest(userId: number): OrderData {
    return ({
        addressId: currentSelectedAddressId,
        contactId: currentSelectedContactId,
        orderType: "REFILL",
        userId: userId
    })
}

export default function OrderPlacementButton() {

    const onOrderSubmit = async () => {


        if (currentSelectedContactId == null) {
            ToastMessage("Contact missing", "please select a Contact and try again")
        } else if (currentSelectedAddressId == null) {
            ToastMessage("Address missing", "please select a address and try again")
        }
        try {

            if (user?.userId == null) {
                ToastMessage("userId not found", "userId not found in session Storage, please closed the browser and try again")
            } else {
                sentRequest(createRequest(user.userId));
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Button onClick={onOrderSubmit}>Place Order</Button>
    )


}