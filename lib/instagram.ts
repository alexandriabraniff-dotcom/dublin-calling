// Reads a location's latest Instagram posts from Instagram's public profile embed page.
// No login or API key: Instagram server-renders the profile + 6 newest posts into
// the embed HTML for non-browser user agents. Results are cached for an hour.

// "https://instagram.com/dublincallingvan" -> "dublincallingvan"
export function instagramHandle(profileUrl: string) {
  return profileUrl.replace(/\/+$/, "").split("/").pop() ?? "";
}

export type InstagramPost = {
  shortcode: string;
  url: string;
  image: string;
  caption: string;
  isVideo: boolean;
};

export type InstagramProfile = {
  username: string;
  profilePic: string | null;
  followers: number | null;
  postCount: number | null;
  posts: InstagramPost[];
};

// The data sits inside an escaped JSON string; strip the escaping layers so it can be matched.
function unescape(html: string) {
  return html
    .replace(/\\+\//g, "/")
    .replace(/\\+u0026/g, "&")
    .replace(/\\+"/g, '"');
}

function cleanUrl(url: string) {
  return url.replace(/\\+u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
}

function decodeText(text: string) {
  return text
    .replace(/\\+n/g, " ")
    .replace(/\\+u([0-9a-fA-F]{4})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/\\+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function parseInstagramEmbed(html: string, username: string): InstagramProfile {
  const u = unescape(html);
  const num = (re: RegExp) => {
    const m = u.match(re);
    return m ? Number(m[1]) : null;
  };

  const posts: InstagramPost[] = [];
  const chunks = u.split('"shortcode_media":{').slice(1);
  for (const chunk of chunks) {
    const shortcode = chunk.match(/"shortcode":"([^"]+)"/)?.[1];
    const rawImage = chunk.match(/"display_url":"([^"]+)"/)?.[1];
    const image = rawImage && cleanUrl(rawImage);
    if (!shortcode || !image || posts.some((p) => p.shortcode === shortcode)) continue;
    const isVideo = /"is_video":true/.test(chunk.slice(0, 300));
    const caption = decodeText(chunk.match(/"edge_media_to_caption":\{"edges":\[\{"node":\{"text":"(.*?)"\}/)?.[1] ?? "");
    posts.push({
      shortcode,
      url: `https://www.instagram.com/${isVideo ? "reel" : "p"}/${shortcode}/`,
      image,
      caption,
      isVideo,
    });
  }

  return {
    username,
    profilePic: cleanUrl(u.match(/"profile_pic_url":"([^"]+)"/)?.[1] ?? "") || null,
    followers: num(/"followers_count":(\d+)/),
    postCount: num(/"posts_count":(\d+)/),
    posts,
  };
}

export async function getInstagramProfile(username: string): Promise<InstagramProfile | null> {
  try {
    const res = await fetch(`https://www.instagram.com/${username}/embed/`, {
      headers: { "User-Agent": "node", Accept: "text/html" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const profile = parseInstagramEmbed(await res.text(), username);
    return profile.posts.length > 0 ? profile : null;
  } catch {
    return null;
  }
}
