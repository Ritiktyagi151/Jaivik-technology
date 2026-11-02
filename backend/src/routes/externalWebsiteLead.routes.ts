import express from "express";

const router = express.Router();

const EXTERNAL_LEAD_URL =
  "https://leadmanagementsystem-4.onrender.com/api/website-leads/sources/6a1180d5d02b94671372ddeb/submit";

router.post("/", async (req, res) => {
  try {
    const response = await fetch(EXTERNAL_LEAD_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(req.body),
    });

    if (!response.ok) {
      const message = await response.text().catch(() => "");
      console.error("External lead API failed:", response.status, message);
    }
  } catch (error) {
    console.error("External lead submission failed:", error);
  }

  res.status(200).json({ success: true });
});

export default router;
