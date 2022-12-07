import React from 'react';
import { injectCheckout } from 'paytm-blink-checkout-react';

function InjectedCheckout(props) {
    const checkoutJsInstance = props.checkoutJsInstance2;

    console.log("InjectedCheckout props", props)

    return (<div>
            <b>IS CHECKOUT JS INJECTED : </b>{Boolean(checkoutJsInstance).toString()}
        </div>);
}

export default injectCheckout(InjectedCheckout);