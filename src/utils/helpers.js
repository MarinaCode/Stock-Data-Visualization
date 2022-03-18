const API_KEY = 'CY6peqYDQp7xulUrkJcyk59CfPUykJN34nTdIXlb';
const SYMBOL_LIST = ['VMW', 'AAPL', 'MSFT', 'AMZN', 'VMC']

const collectData = () => {
  return SYMBOL_LIST.map((item) => {
    let options = {
      headers: {
        'x-api-key': API_KEY
      }
    };

    let url = `https://yfapi.net/v8/finance/chart/${item}/?range=1mo&interval=1d`
    return {
      url,
      options
    }
  });
}

export default collectData;
