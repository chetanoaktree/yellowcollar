import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
//import { CheckoutProvider, Checkout } from 'paytm-blink-checkout-react';
import { CheckoutProvider, Checkout } from '/libs/paytm-blink-checkout-react';
import InjectedCheckout from './inject_checkout';
import CONFIG from '../../../../config/pw_config';

import Link from 'next/link'
import Title from '../../title';
import Button from '../../button';
//import s from './recent_products.module.scss';
import _ from 'lodash'


const com = (props) => {   
  if(!props.isPW) return (<div className={"hidden"}>no token</div>)  
  if(!props.isPW.token) return (<div className={"hidden"}>no token</div>)  
  console.log("CHECKOUT token", props.isPW)
  const textAreaRef = useRef()

  const appendHandler = (config) => {
    let data={...config.data, token:props.isPW.token}
    data.token=props.isPW.token
    data.orderId=props.isPW.order_id
    const newConfig = { ...config};
    newConfig.data = data
    newConfig.handler = {
      notifyMerchant: notifyMerchantHandler
    }

    return newConfig;
  }
  /*
  useEffect(()=>{
    if(props.isPW.isPopupOpen==true){
      renderUpdateConfig()
    }
  },[props.isPW.isPopupOpen])*/

  const renderUpdateConfig = () => {
    setState({
      config: getUpdatedConfig()
    });
  }
 
  
  const notifyMerchantHandler = (eventType, data) => {
    console.log('MERCHANT NOTIFY LOG', eventType, data);
  }

  const getUpdatedConfig = () => {
    const config = parse(textAreaRef.current.value);

    return appendHandler(config);
  }

  const parse = (value) => {
    try {
      return JSON.parse(value)
    }
    catch (err) {
      console.error("Invalid config JSON");
      return {};
    }
  }

  const toggleOpenInPopup = () => {
    setState((prevState, _) => ({
      openInPopup: !prevState.openInPopup
    }));
  }

  const toggleCheckout = () => {
    setState((prevState, _) => ({
      showCheckout: !prevState.showCheckout
    }));
  }

  const loadCheckoutScript = () => {
    let url = 'https://pgp-hotfix.paytm.in/merchantpgpui/checkoutjs/merchants/';
    url = url.concat(CONFIG.merchant.mid);
    console.log("SCRIPT url", url);

    const scriptElement = document.createElement('script');
    scriptElement.async = true;
    scriptElement.src = url;
    scriptElement.type = 'application/javascript';
    scriptElement.onload = () => {
      const checkoutJsInstance = getCheckoutJsObj();

      if (checkoutJsInstance && checkoutJsInstance.onLoad) {
        checkoutJsInstance.onLoad(() => {
          setState({
            config: getUpdatedConfig(),
            checkoutJsInstance
          });
          console.log("SCRIPT LOADED");
        });
      }
      else {
        console.error(USE_EXISTING_CHECKOUT_INSTANCE + 'onload not available!');
      }
    };
    scriptElement.onerror = error => {
      console.error(USE_EXISTING_CHECKOUT_INSTANCE + 'script load fail!');
    }
    //console.log("SCRIPT", scriptElement);
    document.body.appendChild(scriptElement);
  }

  const getCheckoutJsObj = () => {
    if (window && window.Paytm && window.Paytm.CheckoutJS) {
      console.log('CHECKOUT instance found');
      return window.Paytm.CheckoutJS;
    }
    else {
      console.error(USE_EXISTING_CHECKOUT_INSTANCE + 'Checkout instance not found!');
    }

    return null;
  }

  const [isState, setState] = useState({
    config: appendHandler(CONFIG),
    showCheckout: props.isPW.isPopupOpen,
    openInPopup: true,
    checkoutJsInstance: null
  })
  console.log("config", isState.config)  

  const { showCheckout, openInPopup, config } = isState;
  const textAreaVal = JSON.stringify(config, null, 4);

  return(
    <div className={' mt-24 px-8'}>
      <div className={"hidden"}>
        <textarea cols="50"
          rows="10"
          defaultValue={textAreaVal}
          ref={textAreaRef} />
        <div>
          <Button type="link"
            clickHandler={toggleCheckout}>
            Toggle Checkout Screen
          </Button><br/>
          <Button type="link"
            clickHandler={renderUpdateConfig}>
            Re-render updated config
          </Button><br/>
          <Button type="link"
            clickHandler={loadCheckoutScript}>
            Use existing checkout instance
          </Button><br/>
          <input type="checkbox" onClick={toggleOpenInPopup}
            defaultChecked={openInPopup}>
          </input> Open in popup
        </div>
        <br />

        <div><b>CHECKOUT VISIBILITY :</b> {Boolean(showCheckout).toString()}</div>
        
      </div>
      <CheckoutProvider config={isState.config}
          checkoutJsInstance={isState.checkoutJsInstance}
          openInPopup={openInPopup} 
          env="PROD">
          <InjectedCheckout/>
          {showCheckout && <Checkout />}
        </CheckoutProvider>
    </div>
  )
}
export default com
