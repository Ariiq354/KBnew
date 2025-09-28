export async function assertToErr<T>(
  label: string,
  promise: Promise<T>
): Promise<T> {
  try {
    return await promise;
  } catch (err) {
    console.error(label, err);
    throw InternalError;
  }
}
