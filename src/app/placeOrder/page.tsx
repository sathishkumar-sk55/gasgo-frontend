"use client"
import {OrderAddressSelection} from "@/app/components/OrderAddressSelection";
import {OrderContactSelection} from "@/app/components/OrderContactSelection";
import OrderPlacementButton from "@/app/components/OrderPlacementButton";


export default function PlaceOrderPage() {

    return (
        <div className="relative flex  justify-center border-black">
            <div>
                <OrderAddressSelection/>
                <OrderContactSelection/>
                <OrderPlacementButton/>
            </div>
        </div>
    );
}
