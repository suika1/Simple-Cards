export const generateResponse = ({
    res,
    status = 200,
    results = '',
    error = '',
    ok = true,
    ...another
  }) => {
    if (error && error.length) ok = false;
    return res.status(status).send(
      JSON.stringify({
        results,
        ok,
        error,
        ...another,
      }),
    );
  };