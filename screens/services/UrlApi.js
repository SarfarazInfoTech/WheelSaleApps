const baseURL = 'http://wheelsale.in'

const VehiclesList = `${baseURL}/wheelsale-app-ws/categories`
export {VehiclesList};

const AddMyVehical = `${baseURL}/wheelsale-app-ws/sub-categories/`
export {AddMyVehical};

const ShownMyVehical = `${baseURL}/wheelsale-app-ws/sub-categories?limit=100&page=1&dealerId=`
export {ShownMyVehical};

const MarketVehical = `${baseURL}/wheelsale-app-ws/sub-categories?limit=100&page=1`
export {MarketVehical};

const SoldMyVehical = `${baseURL}/wheelsale-app-ws/sub-categories?limit=100&page=1&visibility=false&dealerId=`
export {SoldMyVehical};

const SearchVehical = `${baseURL}/wheelsale-app-ws/sub-categories?limit=100&page=`
export {SearchVehical};