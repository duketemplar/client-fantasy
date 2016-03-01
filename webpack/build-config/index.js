var config = {
  prod: {
    SERVICE_CUSTOMER_CREATION: JSON.stringify("http://service-customer-creation/service-customer-creation/v1"),
  },
  dev: {
    SERVICE_CUSTOMER_CREATION: JSON.stringify("/api/2/customer-creation"),
  },
};

module.exports = config[process.env.npm_package_config_node_env === 'development' ? 'dev' : 'prod'];
