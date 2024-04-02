import Decimal from 'decimal.js';

export const decimalAdd = (arg1: number, arg2: number): number =>
  Decimal.add(arg1, arg2).toNumber();

export const decimalSub = (arg1: number, arg2: number): number =>
  Decimal.sub(arg1, arg2).toNumber();

export const calcPerformance = (arg: number[], baseIndex = 0): number[] => {
  if (arg.length < 1) return [0];

  let fixedBaseIndex = baseIndex;
  if (!Number.isFinite(arg[baseIndex] || arg[baseIndex] === 0)) {
    for (let i = baseIndex + 1; i < arg.length; i += 1) {
      if (Number.isFinite(arg[i]) && arg[i] !== 0) {
        fixedBaseIndex = i;
        break;
      }
    }
  }

  const baseValue = arg[fixedBaseIndex];
  const calculated = arg.reduce<number[]>((acc, v) => {
    const roc = ((v - baseValue) / baseValue) * 100;
    acc.push(roc);

    return acc;
  }, []);

  return calculated;
};

export const format = (value: number, option?: Intl.NumberFormatOptions) =>
  new Intl.NumberFormat('native', option).format(value);

const getLang = () => document.documentElement.lang;

export const abbreviate = (
  value: number,
  option?: { digit?: number } & Intl.NumberFormatOptions
): string => {
  const lang = getLang();
  switch (lang) {
    case 'ja': {
      const maps = {
        K: '千',
        M: '百万',
        B: '十億',
        T: '兆',
      } as const;

      const prefixAsKMBT = new Intl.NumberFormat('en', {
        ...option,
        notation: 'compact',
        maximumFractionDigits: option?.digit || 0,
      }).format(value);

      const result = Object.entries(maps).reduce(
        (acc, [enPrefix, jaPrefix]) => acc.replace(enPrefix, jaPrefix),
        prefixAsKMBT
      );

      return result;
    }

    default: {
      return new Intl.NumberFormat(lang, {
        ...option,
        notation: 'compact',
        maximumFractionDigits: option?.digit || 0,
      }).format(value);
    }
  }
};

export const isFiniteNumber = (value: unknown): value is number =>
  Number.isFinite(value);

export const parseNumber = (
  value: number | string | null | undefined
): number => Number(String(value));

export const formatNumber = ({
  value,
  type,
  decimal = 0,
  roundType = 'round',
}: {
  value: number;
  type?: 'K' | 'M';
  decimal?: number;
  roundType?: 'round' | 'floor';
}): string => {
  let roundedValue;
  const divisor = type === 'K' ? 1000 : 1000000;
  const decimalValue = new Decimal(type ? value / divisor : value);

  if (roundType === 'floor') {
    roundedValue = decimalValue
      .toDecimalPlaces(decimal, Decimal.ROUND_DOWN)
      .toNumber();
  } else {
    roundedValue = decimalValue.toDecimalPlaces(decimal).toNumber();
  }

  const formattedValue = roundedValue.toLocaleString('en-US', {
    minimumFractionDigits: decimal,
    maximumFractionDigits: decimal,
  });

  return formattedValue;
};

const breakpoints = {
  T: 1000000000000,
  B: 1000000000,
  M: 1000000,
  K: 1000,
};

export const abbreviateToParts = (
  value: Nullish<number>,
  option?: {
    fixedBreakpoint?: keyof typeof breakpoints;
  } & Intl.NumberFormatOptions
): [string, string] => {
  if (!isFiniteNumber(value)) return ['', ''];

  const breakpoint = Object.entries(breakpoints)
    .filter(([, breakpointValue]) =>
      option?.fixedBreakpoint
        ? breakpointValue <= breakpoints[option.fixedBreakpoint]
        : true
    )
    .find(([, breakpointValue]) => value >= breakpointValue);

  if (!breakpoint) return ['', ''];

  const [unit, divisor] = breakpoint;
  const roundedValue = value / divisor;
  const formattedValue = new Intl.NumberFormat('en', option).format(
    roundedValue
  );

  const lang = getLang();
  switch (lang) {
    case 'ja': {
      const maps = {
        K: '千',
        M: '百万',
        B: '十億',
        T: '兆',
      } as const;

      return [formattedValue, maps[unit]];
    }

    default: {
      return [formattedValue, unit];
    }
  }
};
