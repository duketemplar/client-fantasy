export default function getBasePath(hostname) {
  const mapHost = {
    local: '/#/',
    default: '/sc/webapp-customer-registration/init/#/',
  };
  const basePath = hostname.includes('localhost') ? mapHost.local : mapHost.default;

  return basePath;
}
