"use client";

import { useEffect, useRef } from "react";

/* Runs inside a widget embedded on the Webflow site (/embed/[location]/[widget]).
   - Tells the parent page how tall the widget is, so its iframe grows/shrinks with it.
   - Sends site links (/vancouver/events etc.) to the parent window instead of opening them
     inside the iframe. Webflow keeps the same paths, except a location home is /<slug>/home. */
export default function EmbedBridge({ id, children }: { id: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const parentOrigin = params.get("origin") || (document.referrer ? new URL(document.referrer).origin : "");

    const post = () => {
      const h = Math.ceil(ref.current?.getBoundingClientRect().height ?? 0);
      window.parent.postMessage({ dcEmbed: id, height: h }, "*");
    };
    const ro = new ResizeObserver(post);
    if (ref.current) ro.observe(ref.current);
    window.addEventListener("load", post);
    post();

    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || !parentOrigin) return;
      const href = a.getAttribute("href") || "";
      if (!href.startsWith("/") || href.startsWith("//")) return; // external links keep their own target
      e.preventDefault();
      e.stopPropagation();
      const [path, hash = ""] = href.split("#");
      const mapped = /^\/(adelaide|danforth|vancouver)\/?$/.test(path) ? `${path.replace(/\/$/, "")}/home` : path;
      window.top!.location.href = parentOrigin + mapped + (hash ? `#${hash}` : "");
    };
    document.addEventListener("click", onClick, true);

    return () => {
      ro.disconnect();
      window.removeEventListener("load", post);
      document.removeEventListener("click", onClick, true);
    };
  }, [id]);

  return <div ref={ref}>{children}</div>;
}
