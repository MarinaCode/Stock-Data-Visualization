const fetcher = (url, options) =>
  fetch(url, options)
    .then(res => {
      if (res?.json) {
        return res?.json?.();
      }
      return res;
    })
  .catch(error => console.info(error));


export default fetcher;
