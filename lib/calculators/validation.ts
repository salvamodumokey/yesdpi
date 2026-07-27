export type CalcResult<T> = { ok: true; value: T } | { ok: false; error: string };

export function ok<T>(value: T): CalcResult<T> {
  return { ok: true, value };
}

export function err<T>(error: string): CalcResult<T> {
  return { ok: false, error };
}

const MAX_SAFE_INPUT = 1_000_000;

/**
 * Parses a user-entered number for calculator fields, rejecting the inputs
 * called out in the spec: empty, NaN, +/-Infinity, negative, (optionally)
 * zero, and unreasonably large values.
 */
export function parsePositiveNumber(
  input: string | number,
  options: { allowZero?: boolean } = {}
): CalcResult<number> {
  if (typeof input === "string" && input.trim() === "") {
    return err("Enter a value.");
  }

  const value = typeof input === "number" ? input : Number(input);

  if (Number.isNaN(value)) {
    return err("Enter a valid number.");
  }
  if (!Number.isFinite(value)) {
    return err("Enter a finite number.");
  }
  if (value < 0) {
    return err("Value must be positive.");
  }
  if (value === 0 && !options.allowZero) {
    return err("Value must be greater than zero.");
  }
  if (value > MAX_SAFE_INPUT) {
    return err(`Value must be ${MAX_SAFE_INPUT.toLocaleString()} or less.`);
  }

  return ok(value);
}

/** Rounds to a sensible display precision without floating-point noise. */
export function roundTo(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round((value + Number.EPSILON) * factor) / factor;
}
