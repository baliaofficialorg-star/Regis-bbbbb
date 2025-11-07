import { erc20Abi } from 'viem';

export const ERC20_ABI = erc20Abi;

export const REGIS_TOKEN_DECIMALS = 18;

export function formatTokenAmount(amount: bigint | string, decimals = REGIS_TOKEN_DECIMALS): string {
  const amountBigInt = typeof amount === 'string' ? BigInt(amount) : amount;
  const divisor = BigInt(10 ** decimals);
  const quotient = amountBigInt / divisor;
  const remainder = amountBigInt % divisor;
  
  if (remainder === 0n) {
    return quotient.toString();
  }
  
  const remainderStr = remainder.toString().padStart(decimals, '0');
  const trimmedRemainder = remainderStr.replace(/0+$/, '');
  
  if (trimmedRemainder === '') {
    return quotient.toString();
  }
  
  return `${quotient}.${trimmedRemainder}`;
}

export function parseTokenAmount(amount: string, decimals = REGIS_TOKEN_DECIMALS): bigint {
  const [whole, fractional = ''] = amount.split('.');
  const fractionalPadded = fractional.padEnd(decimals, '0').slice(0, decimals);
  return BigInt(whole + fractionalPadded);
}