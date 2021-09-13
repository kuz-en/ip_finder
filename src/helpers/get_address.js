export async function getAddress(ip = '0.0.0.0') {
  const response = await fetch(`https://geo.ipify.org/api/v1?apiKey=${process.env.IPIFY_API_KEY}&ipAddress=${ip}`);

      return await response.json();
}
