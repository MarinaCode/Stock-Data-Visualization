async function parallel(operations) {
  try {
    return await Promise.all(operations);
  } catch (error) {
    return [];
  }
}

export default parallel;
