# 🧠 Revive Edge – Don't You Dare Give Up

**Built for Next.js Global Hackathon 2025**

Revive Edge is a psychological slap-in-the-face platform for people who are on the verge of giving up on their goals. It’s powered by AI-generated motivation that hits hard — combining manipulative summaries, cinematic imagery, and voice messages.

## 🔥 Features

- ⚡ **One-click "Give Up" button**
- 🧠 Brutally honest AI motivation (Gemini 1.5 Flash)
- 🖼️ Cinematic image generation (Gemini Vision)
- 🎧 Spoken audio feedback (ElevenLabs API yet to apply)
- 🔐 Auth with Clerk
- ☁️ Firestore + MongoDB hybrid data flow
- ⚙️ Built with Next.js 15, App Router, Server Actions

## 🛠️ Stack

- **Framework**: Next.js 15 (App Router)
- **AI**: Google Gemini, ElevenLabs
- **Auth**: Clerk
- **Database**: MongoDB (GiveUpEvents)
- **Storage**: Local / public dir for image generation
- **UI**: TailwindCSS + HeroUI

## 💡 Flow

1. User clicks **“Give Up”**
2. Enters their goal + reason
3. App generates:
   - 🔥 Motivational text (Gemini)
   - 🖼️ Custom symbolic image
   - 🎧 Audio message via ElevenLabs
4. Data is saved, response shown

## 🚀 Vision

A SaaS for dark days — where giving up triggers a personalized, manipulative, cinematic pep talk.

---

> "Even AI failed to motivate you? Maybe that's your real problem."  
– Revive Edge