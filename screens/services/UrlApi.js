const baseURL = 'http://103.159.239.52:80'

const VehiclesList = `${baseURL}/wheelsale-app-ws/categories`
export {VehiclesList};

const AddMyVehical = `${baseURL}/wheelsale-app-ws/sub-categories/lBqt4o9WXrpc4asLy7WmUnMwaOF5Q9`
export {AddMyVehical};

const ShownMyVehical = `${baseURL}/wheelsale-app-ws/sub-categories?limit=100&page=1&dealerId=lBqt4o9WXrpc4asLy7WmUnMwaOF5Q9`
export {ShownMyVehical};

const MarketVehical = `${baseURL}/wheelsale-app-ws/sub-categories?limit=100&page=1`
export {MarketVehical};

const SoldMyVehical = `${baseURL}/wheelsale-app-ws/sub-categories?limit=100&page=1&dealerId=lBqt4o9WXrpc4asLy7WmUnMwaOF5Q9&visibility=false`
export {SoldMyVehical};

const SearchVehical = `${baseURL}/wheelsale-app-ws/sub-categories?limit=100&page=`
export {SearchVehical};