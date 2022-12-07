import {treshold_amount, variable} from '../../ui/lib/view/admin/action';
import {getTreshold}  from '../../ui/lib/get/influencer';

const process_collab = (i, tresholds) => {     
  i.processed=true
  i.influencer=i.influencer2
  //i=getTreshold(i, tresholds)
  i.treshold=i.influencer.influencer_treshold
  i.treshold_amount=treshold_amount(i)    
  i.variable=variable(i)
  i.init_fixed_fee=i.influencer.init_fixed_fee
  i.total=i.init_fixed_fee + i.variable
  i.can_go_upto = i.init_fixed_fee + i.treshold_amount
  i.platform_fee = 30
  i.total_init_payment=i.init_fixed_fee + i.platform_fee
  //console.log("process_collab", i)
  //console.log("tresholds", tresholds )
  return i
}
export {
  process_collab
}
