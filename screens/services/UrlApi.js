const baseURL = 'http://wheelsale.in'

const VehiclesList = `${baseURL}/wheelsale-app-ws/categories`
export {VehiclesList};

const AddMyVehical = `${baseURL}/wheelsale-app-ws/sub-categories/`
export {AddMyVehical};

const ShownMyVehical = `${baseURL}/wheelsale-app-ws/sub-categories?limit=100&page=1&dealerId=`
export {ShownMyVehical};

const MarketVehical = `${baseURL}/wheelsale-app-ws/sub-categories?limit=100&page=1`
export {MarketVehical};

const SoldMyVehical = `${baseURL}/wheelsale-app-ws/sub-categories?limit=100&page=1&dealerId=lBqt4o9WXrpc4asLy7WmUnMwaOF5Q9&visibility=false`
export {SoldMyVehical};

const SearchVehical = `${baseURL}/wheelsale-app-ws/sub-categories?limit=100&page=`
export {SearchVehical};