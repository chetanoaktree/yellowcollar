import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import Layout from '../influencer/layout';
import Title from '../../title';
import Button from '../../button';
import Collabs from '../../blocks/business/collabs';
import CollabSearch from './search/collab_search'
import s from './collabs.module.scss';
import Moment from 'moment';
//import InfiniteScroll from "react-infinite-scroll-component";



const com = ({item, collab_status_options, updateHandler, ...props}) => { 
  //console.log("COLLAB Props", props)
  return (
    <Layout {...props} viewType="business_app" showFooter={true} > 
      <div className={s.main}>
        <h3 className="mb-4 mt-4">Offers</h3>
        <CollabSearch {...{collab_status_options, updateHandler}}/>
        <div className={s.items}>
          <Collabs { ...props}/>
        </div>
      </div>
    </Layout>    
  )
}
export default com

/*
const [isItems, setItems] = useState([])
const [isState, setState] = useState({hasMore:true})

const fetchMoreData = () => {
  if (isitems.length >= 500) {
    setState({ hasMore: false });
    return;
  }
  let new_items=fetch()
  setItems((prev)=>([...prev, ...new_items]));
}

<InfiniteScroll
  dataLength=isItems.length}
  next={fetchMoreData}
  hasMore={isState.hasMore}
  loader={<h4>Loading...</h4>}
  endMessage={
    <p style={{ textAlign: "center" }}>
      <b>Yay! You have seen it all</b>
    </p>
  }
>  
  {isItems.map((i, index) => (
    <div style={style} key={index}>
      div - #{index}
    </div>
  ))}
</InfiniteScroll>
*/
