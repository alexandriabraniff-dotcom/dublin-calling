"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { BookingType, FormField } from "@/lib/group-bookings";

type Status = "idle" | "sending" | "sent" | "mailto" | "error";

const inputClass =
  "w-full bg-[#0a0a0a] border border-white/50 text-[#F4EFE6] text-base px-3 py-2.5 focus:outline-none focus:border-[#F2B035] focus:ring-2 focus:ring-[#F2B035]/60 aria-[invalid=true]:border-[#ff8a80]";

/* "Get in Touch" button + its own pop-up enquiry form for one booking type */
export default function EnquiryDialog({
  type,
  location,
  locationName,
  email,
  phone,
}: {
  type: BookingType;
  location: string;
  locationName: string;
  email: string;
  phone: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const today = new Date().toISOString().slice(0, 10);

  // Lock page scroll while the pop-up is open
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    const onClose = () => { document.documentElement.style.overflow = ""; };
    d.addEventListener("close", onClose);
    return () => d.removeEventListener("close", onClose);
  }, []);

  function open() {
    setStatus("idle");
    setErrors({});
    document.documentElement.style.overflow = "hidden";
    dialogRef.current?.showModal();
    // Start keyboard and screen-reader users on the first field
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLElement>("input, select, textarea")?.focus());
  }

  function close() {
    dialogRef.current?.close();
  }

  function collect(form: HTMLFormElement) {
    const fd = new FormData(form);
    const values: Record<string, string | string[]> = {};
    for (const f of type.fields) {
      values[f.name] = f.type === "checkboxes" ? fd.getAll(f.name).map(String) : String(fd.get(f.name) ?? "").trim();
    }
    return { values, honeypot: String(fd.get("website") ?? "") };
  }

  function validate(values: Record<string, string | string[]>) {
    const errs: Record<string, string> = {};
    for (const f of type.fields) {
      const v = values[f.name];
      const empty = Array.isArray(v) ? v.length === 0 : !v;
      if (f.required && empty) errs[f.name] = f.type === "select" || f.type === "checkboxes" ? "Please choose an option." : "This field is required.";
    }
    const em = values.email as string;
    if (em && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) errs.email = "Please enter a valid email address, like name@example.com.";
    const g = Number(values.guests);
    const gf = type.fields.find((f) => f.name === "guests");
    if (values.guests && gf && (isNaN(g) || (gf.min && g < gf.min) || (gf.max && g > gf.max))) {
      errs.guests = `Please enter a number between ${gf.min} and ${gf.max}.`;
    }
    if (values.date && (values.date as string) < today) errs.date = "Please choose a date from today onwards.";
    return errs;
  }

  function mailtoFallback(values: Record<string, string | string[]>) {
    const body = type.fields
      .map((f) => `${f.label}: ${Array.isArray(values[f.name]) ? (values[f.name] as string[]).join(", ") : values[f.name] || "-"}`)
      .join("\n");
    const subject = `${type.title} enquiry from ${values.name} (Dublin Calling ${locationName})`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("mailto");
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const { values, honeypot } = collect(form);
    const errs = validate(values);
    setErrors(errs);
    const first = type.fields.find((f) => errs[f.name]);
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first.name}"]`)?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, type: type.id, location, website: honeypot }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else if (json.fallback) {
        mailtoFallback(values);
      } else {
        setStatus("error");
        if (json.error) setErrors({ _form: json.error });
      }
    } catch {
      mailtoFallback(values);
    }
  }

  const titleId = `${uid}-title`;
  const errorCount = Object.keys(errors).filter((k) => k !== "_form").length;

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        className="btn block w-full sm:w-auto text-center px-10 py-3.5 bg-[#F2B035] text-[#101010] font-semibold text-sm tracking-[0.1em] uppercase hover:bg-[#e0a020] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F4EFE6]"
        style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
      >
        Get in Touch<span className="sr-only"> about a {type.title.toLowerCase()}</span>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClick={(e) => { if (e.target === dialogRef.current) close(); }}
        className="m-auto w-[calc(100%-2rem)] max-w-2xl max-h-[92dvh] p-0 bg-transparent backdrop:bg-black/75"
      >
        <div className="border-4 border-[#F2B035] bg-[#0F5132] p-[3px]">
          <div className="border-2 border-[#F2B035] bg-[#101010] max-h-[calc(92dvh-18px)] overflow-y-auto">
            <div className="sticky top-0 z-10 bg-[#101010] border-b border-white/15 px-5 sm:px-8 py-4 flex items-start justify-between gap-4">
              <div>
                <h2
                  id={titleId}
                  className="text-[#F4EFE6] leading-tight"
                  style={{ fontFamily: "var(--font-label)", fontWeight: 700, fontSize: "clamp(1.5rem, 4vw, 2rem)", letterSpacing: "0.02em" }}
                >
                  {type.formTitle}
                </h2>
                <p className="text-[#F4EFE6]/80 text-sm mt-1">{type.formIntro}</p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label="Close form"
                className="shrink-0 w-12 h-12 flex items-center justify-center border-2 border-white/50 text-[#F4EFE6] hover:border-[#F2B035] hover:text-[#F2B035] transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              </button>
            </div>

            {status === "sent" || status === "mailto" ? (
              <div className="px-5 sm:px-8 py-10 flex flex-col gap-4" role="status">
                <p className="text-[#F2B035] text-xl" style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}>
                  {status === "sent" ? "Thanks, we've got it!" : "Almost there!"}
                </p>
                <p className="text-[#F4EFE6]/85 text-base leading-relaxed">
                  {status === "sent"
                    ? `Our team at Dublin Calling ${locationName} will be in touch soon to plan your ${type.title.toLowerCase()}.`
                    : `Your email app should have opened with your details filled in. Just press send. If it didn't open, email us at ${email} or call ${phone}.`}
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="btn self-start px-8 py-3 border-2 border-[#F2B035] text-[#F2B035] font-semibold text-sm uppercase tracking-[0.1em] hover:bg-[#F2B035] hover:text-[#101010] transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <form ref={formRef} noValidate onSubmit={onSubmit} className="px-5 sm:px-8 py-6 flex flex-col gap-5">
                <p className="text-[#F4EFE6]/80 text-sm">
                  Fields marked <span aria-hidden="true" className="text-[#F2B035]">*</span><span className="sr-only">with an asterisk</span> are required.
                </p>

                <div role="alert" aria-live="assertive">
                  {(errorCount > 0 || errors._form) && (
                    <p className="border border-[#ff8a80] bg-[#ff8a80]/10 text-[#ffb3ab] text-sm px-4 py-3">
                      {errors._form ?? `Please fix ${errorCount === 1 ? "1 field" : `${errorCount} fields`} below.`}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-5">
                  {type.fields.map((f) => (
                    <Field key={f.name} field={f} uid={uid} error={errors[f.name]} today={today} />
                  ))}
                </div>

                {/* Honeypot for bots, hidden from people and assistive tech */}
                <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
                  <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn px-10 py-3.5 bg-[#F2B035] text-[#101010] font-semibold text-sm tracking-[0.1em] uppercase hover:bg-[#e0a020] disabled:opacity-60 transition-colors"
                    style={{ fontFamily: "var(--font-label)", fontWeight: 700 }}
                  >
                    {status === "sending" ? "Sending..." : "Send Enquiry"}
                  </button>
                  <p className="text-[#F4EFE6]/80 text-sm">
                    Prefer to talk? Call <a href={`tel:${phone}`} className="underline hover:text-[#F2B035]">{phone}</a>
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}

function Field({ field: f, uid, error, today }: { field: FormField; uid: string; error?: string; today: string }) {
  const id = `${uid}-${f.name}`;
  const errId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [f.hint ? hintId : "", error ? errId : ""].filter(Boolean).join(" ") || undefined;
  const span = f.half ? "" : "sm:col-span-2";
  const label = (
    <>
      {f.label}
      {f.required && <span aria-hidden="true" className="text-[#F2B035]"> *</span>}
    </>
  );
  const hint = f.hint && <p id={hintId} className="text-[#F4EFE6]/75 text-xs">{f.hint}</p>;
  const err = error && <p id={errId} className="text-[#ffb3ab] text-sm">{error}</p>;

  if (f.type === "checkboxes") {
    return (
      <fieldset className={`${span} flex flex-col gap-2`} aria-describedby={describedBy}>
        <legend className="text-[#F4EFE6] text-sm font-medium mb-2">{label}</legend>
        {hint}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {f.options!.map((o) => (
            <label key={o} className="flex items-center gap-3 min-h-11 px-3 border border-white/30 hover:border-[#F2B035] has-[:checked]:border-[#F2B035] has-[:checked]:bg-[#F2B035]/10 cursor-pointer text-[#F4EFE6]/90 text-sm">
              <input type="checkbox" name={f.name} value={o} className="w-5 h-5 accent-[#F2B035] shrink-0" />
              {o}
            </label>
          ))}
        </div>
        {err}
      </fieldset>
    );
  }

  const common = {
    id,
    name: f.name,
    required: f.required,
    "aria-required": f.required || undefined,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    autoComplete: f.autoComplete,
    className: inputClass,
  };

  return (
    <div className={`${span} flex flex-col gap-1.5`}>
      <label htmlFor={id} className="text-[#F4EFE6] text-sm font-medium">{label}</label>
      {f.type === "select" ? (
        <select {...common} defaultValue="">
          <option value="" disabled>Choose one</option>
          {f.options!.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : f.type === "textarea" ? (
        <textarea {...common} rows={4} />
      ) : (
        <input
          {...common}
          type={f.type}
          min={f.type === "date" ? today : f.min}
          max={f.max}
          inputMode={f.type === "number" ? "numeric" : undefined}
          className={`${inputClass} [color-scheme:dark]`}
        />
      )}
      {hint}
      {err}
    </div>
  );
}
