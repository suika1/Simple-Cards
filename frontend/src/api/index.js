export const get = async ({
  url,
  options = {},
  headers = {},
}) => {
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    headers: {
      ...headers,
    },
    ...options,
  });

  return await response.json();
};

export const post = async ({
  url,
  body = {},
  options = {},
  headers = {},
}) => {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...options,
  });

  return await response.json();
};

export const put = async ({
  url,
  body = {},
  options = {},
  headers = {},
}) => {
  const response = await fetch(url, {
    method: "PUT",
    mode: "cors",
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...options,
  });

  return await response.json();
};

export const deleteReq = async ({
  url,
  options = {},
  headers = {},
}) => {
  const response = await fetch(url, {
    method: "DELETE",
    mode: "cors",
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    ...options,
  });

  return await response.json();
};
