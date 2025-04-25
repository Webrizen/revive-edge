export async function POST(req) {
  const { text } = await req.json();

  const response = await fetch("https://api.fish.audio/v1/tts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.FISH_AUDIO_API_KEY}`,
    },
    body: JSON.stringify({
      text,
      reference_id: "6fb84253b20442fb92298c892e0ff239",
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error("Fish API error:", error);
    return new Response(error, { status: response.status });
  }

  const data = await response.json();
  return Response.json({ data });
}
