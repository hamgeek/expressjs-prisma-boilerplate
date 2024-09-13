const httpPrismaCode = (code: string) => {
  const prismaErrorHttpCodes = [
    { code: 'P2000', httpCode: 400 },
    { code: 'P2001', httpCode: 404 },
    { code: 'P2002', httpCode: 409 },
    { code: 'P2003', httpCode: 409 },
    { code: 'P2004', httpCode: 400 },
    { code: 'P2005', httpCode: 400 },
    { code: 'P2006', httpCode: 400 },
    { code: 'P2007', httpCode: 400 },
    { code: 'P2008', httpCode: 400 },
    { code: 'P2009', httpCode: 400 },
    { code: 'P2010', httpCode: 400 },
    { code: 'P2011', httpCode: 400 },
    { code: 'P2012', httpCode: 400 },
    { code: 'P2013', httpCode: 400 },
    { code: 'P2014', httpCode: 409 },
    { code: 'P2015', httpCode: 404 },
    { code: 'P2016', httpCode: 400 },
    { code: 'P2017', httpCode: 409 },
    { code: 'P2018', httpCode: 404 },
    { code: 'P2019', httpCode: 400 },
    { code: 'P2020', httpCode: 400 },
    { code: 'P2021', httpCode: 404 },
    { code: 'P2022', httpCode: 404 },
    { code: 'P2023', httpCode: 500 },
    { code: 'P2024', httpCode: 503 },
    { code: 'P2025', httpCode: 400 },
    { code: 'P2026', httpCode: 501 },
    { code: 'P2027', httpCode: 500 },
    { code: 'P2028', httpCode: 500 },
    { code: 'P2029', httpCode: 400 },
    { code: 'P2030', httpCode: 500 },
    { code: 'P2031', httpCode: 500 },
    { code: 'P2033', httpCode: 400 },
    { code: 'P2034', httpCode: 409 },
    { code: 'P2035', httpCode: 500 },
    { code: 'P2036', httpCode: 500 },
    { code: 'P2037', httpCode: 503 },
  ];

  return (
    prismaErrorHttpCodes.find((item) => item.code === code)?.httpCode || 500
  );
};

export { httpPrismaCode };
