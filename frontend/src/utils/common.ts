export const getSessionDataByKey = (key: string) => {
  return JSON.parse(`${sessionStorage.getItem(key)}`) || {};
};
