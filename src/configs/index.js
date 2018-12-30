import localConfigs from './local';
// import devConfigs from './dev';
// import prodConfigs from './prod';
// import stagingConfigs from './staging';

const configs = localConfigs;

// if (process.env.REACT_APP_ENV === 'prod') {
//   configs = prodConfigs;
// } else if (process.env.REACT_APP_ENV === 'dev') {
//   configs = devConfigs;
// } else if (process.env.REACT_APP_ENV === 'staging') {
//   configs = stagingConfigs;
// }

export default Object.freeze(Object.assign({}, configs));
