export class Http {
  static HEADERS = { 'Content-Type': 'application/json' };

  static async get(url) {
    try {
      return await request(url);
    } catch (e) {
      console.log('GET Error');
    }
  }

  static async post(url, data = {}) {
    try {
      return await request(url, 'POST', data);
    } catch (e) {
      console.log('POST Error');
    }
  }

  static async patch(url, data = {}) {
    try {
      return await request(url, 'PATCH', data);
    } catch (e) {
      console.log('PATCH Error');
    }
  }

  static async delete(url) {
    try {
      return await request(url, 'DELETE');
    } catch (e) {
      console.log('DELETE Error');
    }
  }
}

async function request(url, method = 'GET', data) {
  const config = {
    method,
    headers: Http.HEADERS,
  };

  if (method === 'POST' || method === 'PATCH') config.body = JSON.stringify(data);

  const response = await fetch(url, config);
  return await response.json();
}
