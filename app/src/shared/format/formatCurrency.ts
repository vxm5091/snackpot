const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  signDisplay: 'exceptZero',
  minimumFractionDigits: 2,
  
  });

// export const formatCurrency = (value: number) => value < 0 ? formatter.format(value) : value;
export const formatCurrency = (value: number) => formatter.format(value);
