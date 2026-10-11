import GoldFrame from "@/components/GoldFrame";
import { getInstagramProfile, instagramHandle } from "@/lib/instagram";

const POST_COUNT = 6;

function InstagramIcon({ className, size = 22 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white drop-shadow" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

const compact = (n: number) => new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n);

/* Latest posts from the location's Instagram (refreshed hourly) with a Follow button.
   Each tile opens that post on Instagram. Same setup as the Yale Saloon site. */
export default async function InstagramFeed({ profileUrl, locationName }: { profileUrl: string; locationName: string }) {
  const handle = instagramHandle(profileUrl);
  const profile = await getInstagramProfile(handle);
  const posts = profile?.posts.slice(0, POST_COUNT) ?? [];

  return (
    <section className="bg-[#101010] border-t border-white/10 py-14 md:py-16" aria-labelledby="instagram-heading">
      {/* Profile info */}
      <div className="max-w-7xl mx-auto px-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 group">
          {profile?.profilePic ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.profilePic}
              alt=""
              width={64}
              height={64}
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-full bg-white border-2 border-[#F2B035] shrink-0"
            />
          ) : (
            <span className="w-16 h-16 rounded-full bg-[#0F5132] border-2 border-[#F2B035] flex items-center justify-center shrink-0">
              <InstagramIcon className="text-[#F4EFE6]" />
            </span>
          )}
          <div>
            <p className="text-[11px] uppercase tracking-[0.25em] text-[#F4EFE6]/75 mb-1">Follow Dublin Calling {locationName} on Instagram</p>
            <h2
              id="instagram-heading"
              className="leading-none text-[#F4EFE6] group-hover:text-[#F2B035] transition-colors"
              style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", letterSpacing: "0.02em" }}
            >
              @{handle}
            </h2>
            {profile?.followers != null && (
              <p className="mt-2 text-xs text-[#F4EFE6]/75 uppercase tracking-wider">
                {compact(profile.followers)} followers
                {profile.postCount != null && <> &middot; {profile.postCount.toLocaleString("en")} posts</>}
              </p>
            )}
          </div>
        </a>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn self-start sm:self-auto inline-flex items-center gap-2 px-8 py-3.5 bg-[#F2B035] text-[#101010] font-semibold text-xs tracking-[0.12em] uppercase hover:bg-[#e0a020] transition-colors"
          style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700 }}
        >
          <InstagramIcon size={16} />
          Follow Us<span className="sr-only"> on Instagram (opens in a new tab)</span>
        </a>
      </div>

      {/* Posts: full width. Each opens that post on Instagram. */}
      <ul className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-5 px-4">
        {posts.length > 0
          ? posts.map((post) => (
              <li key={post.shortcode}>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4EFE6]"
                  aria-label={post.caption ? `Instagram post: ${post.caption.slice(0, 100)} (opens in a new tab)` : "View post on Instagram (opens in a new tab)"}
                >
                  <GoldFrame size="sm" className="aspect-square">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.image}
                      alt=""
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {post.isVideo && (
                      <span className="absolute top-2 right-2"><PlayIcon /></span>
                    )}
                    {/* Hover overlay */}
                    <span className="absolute inset-0 bg-[#101010]/80 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-4 text-center">
                      <InstagramIcon className="text-[#F2B035]" size={26} />
                      {post.caption && (
                        <span className="hidden lg:block text-xs text-[#F4EFE6]/90 leading-relaxed line-clamp-4" aria-hidden="true">
                          {post.caption}
                        </span>
                      )}
                    </span>
                  </GoldFrame>
                </a>
              </li>
            ))
          : [...Array(POST_COUNT)].map((_, i) => (
              <li key={i}>
                <a
                  href={profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Dublin Calling ${locationName} on Instagram (opens in a new tab)`}
                  className="block hover:opacity-90 transition-opacity"
                >
                  <GoldFrame size="sm" className="aspect-square">
                    <span className="absolute inset-0 bg-[#0F5132] flex items-center justify-center">
                      <InstagramIcon className="text-[#F4EFE6]/70" />
                    </span>
                  </GoldFrame>
                </a>
              </li>
            ))}
      </ul>
    </section>
  );
}
