export type LiveConditions = {
  airTemp: string;
  wind: string;
  waterTemp: string;
  gageHeight: string;
};

export async function getLiveConditions(
  lat: number,
  lon: number,
  usgsSiteId: string | null
): Promise<LiveConditions> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

  const [weatherRes, usgsRes] = await Promise.allSettled([
    fetch(`${baseUrl}/api/weather?lat=${lat}&lon=${lon}`, { next: { revalidate: 1800 } }),
    usgsSiteId
      ? fetch(`${baseUrl}/api/conditions?siteId=${usgsSiteId}`, { next: { revalidate: 3600 } })
      : Promise.resolve(null),
  ]);

  let airTemp = "—";
  let wind = "—";
  let waterTemp = "—";
  let gageHeight = "—";

  if (weatherRes.status === "fulfilled" && weatherRes.value?.ok) {
    const data = await weatherRes.value.json();
    airTemp = data.airTemp ?? "—";
    wind = data.wind ?? "—";
  }

  if (usgsRes.status === "fulfilled" && usgsRes.value && (usgsRes.value as Response).ok) {
    const data = await (usgsRes.value as Response).json();
    waterTemp = data.waterTemp ?? "—";
    gageHeight = data.gageHeight ?? "—";
  }

  return { airTemp, wind, waterTemp, gageHeight };
}
