type LeadPayload = Record<string, unknown>;

const LEAD_PROXY_URL = "/api/external-website-lead";

export function sendExternalLead(payload: LeadPayload) {
  const body = JSON.stringify({
    ...payload,
    website: "Jaivik Technology.com",
    submittedAt: new Date().toISOString(),
  });

  try {
    if (typeof navigator !== "undefined" && "sendBeacon" in navigator) {
      const blob = new Blob([body], { type: "application/json" });
      if (navigator.sendBeacon(LEAD_PROXY_URL, blob)) return;
    }

    void fetch(LEAD_PROXY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body,
      keepalive: true,
    }).catch((error) => {
      console.warn("External lead background submission failed:", error);
    });
  } catch (error) {
    console.warn("External lead background submission failed:", error);
  }
}
