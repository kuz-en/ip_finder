export async function getAddress(ip = '0.0.0.0') {
  const response = await fetch(`
    https://geo.ipify.org/api/v1?apiKey=at_uUXrCcPXIHM8aaAQf7Q6YtAiS2ivQ&ipAddress=${ip}`);

      return await response.json();
}
