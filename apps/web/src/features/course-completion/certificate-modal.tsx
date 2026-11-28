import React from "react";
import { Award, Download, Printer, X, CheckCircle2 } from "lucide-react";
import type { CompletionStrings } from "./strings.types";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  strings: CompletionStrings;
}

export function CertificateModal({
  isOpen,
  onClose,
  strings,
}: CertificateModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative flex max-h-[95vh] w-full max-w-2xl flex-col overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute right-4 top-4 rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Certificate Frame */}
        <div className="relative overflow-hidden rounded-2xl border-4 border-amber-300 bg-amber-50/30 p-6 text-center sm:p-8">
          <div className="absolute inset-2 rounded-xl border border-dashed border-amber-200 pointer-events-none" />

          {/* Sri Lanka NIE Badge / Emblem */}
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 text-amber-600 shadow-inner">
            <Award className="h-8 w-8 text-amber-600" />
          </div>

          <p className="text-xs font-bold uppercase tracking-widest text-amber-800">
            SipNena • National Institute of Education (NIE)
          </p>
          <h2 className="mt-1 font-serif text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {strings.certificateModalTitle}
          </h2>
          <p className="mt-1 text-xs italic text-slate-500">
            {strings.certificateIssuedTo}
          </p>

          {/* Student Name */}
          <div className="my-4 border-b-2 border-amber-400/80 pb-2">
            <h3 className="font-serif text-2xl font-bold text-[var(--sn-text-main)] sm:text-3xl">
              {strings.studentName}
            </h3>
          </div>

          {/* Description */}
          <p className="mx-auto max-w-lg text-xs leading-relaxed text-slate-700 sm:text-sm">
            {strings.certificateSubtitle}
          </p>

          {/* Verification Badge */}
          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-medium text-emerald-700">
            <CheckCircle2 className="h-4 w-4" />
            <span>Score: 100% Modules Verified • Grade 8 Science</span>
          </div>

          {/* Signatures */}
          <div className="mt-8 flex items-end justify-between border-t border-amber-200/80 pt-4 text-left">
            <div>
              <p className="font-serif text-sm font-bold text-slate-800">
                Ms. Menaka Jayawardena
              </p>
              <p className="text-xs text-slate-500">
                Science Specialist, Colombo Zone
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-xs font-bold text-slate-700">
                SN-SCI8-2026-9481
              </p>
              <p className="text-xs text-slate-500">Certificate ID</p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            {strings.certClose}
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <Printer className="h-4 w-4" />
            <span>Print</span>
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--sn-primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[var(--sn-primary-hover)]"
          >
            <Download className="h-4 w-4" />
            <span>{strings.certDownloadPdf}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
