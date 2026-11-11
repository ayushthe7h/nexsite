import { NextRequest, NextResponse } from "next/server";

// Resolves a Minecraft username to its current skin texture URL, straight
// from Mojang (api.mojang.com for the UUID, sessionserver.mojang.com for the
// profile, which carries a base64-encoded "textures" property pointing at
// the actual PNG on textures.minecraft.net).
//
// We go directly to Mojang instead of a third-party proxy like minotar.net
// or crafatar.com: those have been observed to occasionally hand back the
// wrong (or a stale/shared) image for less-common usernames under
// concurrent cold-cache requests - exactly what this page does on load,
// fetching several staff skins at once. Mojang's own endpoints don't have
// that problem, and textures.minecraft.net serves with CORS headers that
// are safe to use as a WebGL texture.
interface MojangProfileResponse {
  id: string;
  name: string;
}

interface MojangSessionProperty {
  name: string;
  value: string;
}

interface MojangSessionResponse {
  properties?: MojangSessionProperty[];
}

interface DecodedTextures {
  textures?: {
    SKIN?: { url?: string };
  };
}

const cache = new Map<string, { skinUrl: string | null; expires: number }>();
const TTL_MS = 10 * 60 * 1000; // 10 minutes - skins don't change often, and this is a low-traffic page.

export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get("username")?.trim();
  if (!username) {
    return NextResponse.json({ error: "Missing username" }, { status: 400 });
  }

  const cacheKey = username.toLowerCase();
  const cached = cache.get(cacheKey);
  if (cached && cached.expires > Date.now()) {
    return NextResponse.json({ skinUrl: cached.skinUrl });
  }

  try {
    const profileRes = await fetch(
      `https://api.mojang.com/users/profiles/minecraft/${encodeURIComponent(username)}`,
      { cache: "no-store" }
    );
    if (!profileRes.ok) {
      cache.set(cacheKey, { skinUrl: null, expires: Date.now() + TTL_MS });
      return NextResponse.json({ skinUrl: null });
    }
    const profile = (await profileRes.json()) as MojangProfileResponse;

    const sessionRes = await fetch(
      `https://sessionserver.mojang.com/session/minecraft/profile/${profile.id}`,
      { cache: "no-store" }
    );
    if (!sessionRes.ok) {
      cache.set(cacheKey, { skinUrl: null, expires: Date.now() + TTL_MS });
      return NextResponse.json({ skinUrl: null });
    }
    const session = (await sessionRes.json()) as MojangSessionResponse;
    const texturesProp = session.properties?.find((p) => p.name === "textures");

    let skinUrl: string | null = null;
    if (texturesProp) {
      const decoded = JSON.parse(
        Buffer.from(texturesProp.value, "base64").toString("utf-8")
      ) as DecodedTextures;
      skinUrl = decoded.textures?.SKIN?.url ?? null;
      // Mojang sometimes returns the texture URL over plain http - force
      // https so it loads cleanly from our https page.
      if (skinUrl?.startsWith("http://")) {
        skinUrl = `https://${skinUrl.slice("http://".length)}`;
      }
    }

    cache.set(cacheKey, { skinUrl, expires: Date.now() + TTL_MS });
    return NextResponse.json({ skinUrl });
  } catch {
    return NextResponse.json({ skinUrl: null });
  }
}
