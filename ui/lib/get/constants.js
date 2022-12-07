const COLLAB_CONSTANTS={
  requested:1,
  business_accepted:2,
  influencer_accepted:3,
  collaborate:3,
  init_payment:3,
  init_payment_paid:5,
  live:7,
  completed:8,
  paid:9
}

const collab_levels={
  requested:COLLAB_CONSTANTS.requested,
  business_accepted:COLLAB_CONSTANTS.business_accepted,
  influencer_accepted:COLLAB_CONSTANTS.influencer_accepted,
  collaborate:COLLAB_CONSTANTS.collaborate,
  init_payment:COLLAB_CONSTANTS.init_payment,
  init_payment_paid:COLLAB_CONSTANTS.init_payment_paid,
  share_link:COLLAB_CONSTANTS.share_link,
  live:COLLAB_CONSTANTS.live,
  completed:COLLAB_CONSTANTS.completed,
  paid:COLLAB_CONSTANTS.paid,
}


export { 
  COLLAB_CONSTANTS,
  collab_levels
}
