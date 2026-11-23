"use client";

import React, { useState } from "react";
import {
  Mail,
  Server,
  FileCode,
  Send,
  CheckCircle,
  AlertCircle,
  Eye,
  Key,
  Globe,
  Copy,
  Check,
  RefreshCw,
  Smartphone,
  Monitor,
  Terminal,
  ShieldCheck,
  Save,
  Clock,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { useAdminData } from "@/context/admin/AdminDataContext";
import AdminCard from "@/components/admin/ui/AdminCard";
import Modal from "@/components/admin/ui/Modal";
import { EmailProviderType, EmailTemplateConfig, EmailLog } from "@/types/admin";

export default function EmailConfigPage() {
  const {
    emailSmtpConfig,
    updateEmailSmtpConfig,
    emailTemplates,
    updateEmailTemplate,
    emailLogs,
    sendTestEmail,
    resendEmail,
  } = useAdminData();

  const [activeTab, setActiveTab] = useState<"credentials" | "templates" | "logs" | "dns">("credentials");

  // SMTP Form state
  const [smtpForm, setSmtpForm] = useState(emailSmtpConfig);
  const [showPassword, setShowPassword] = useState(false);
  const [isSavedSmtp, setIsSavedSmtp] = useState(false);

  // Test email state
  const [testRecipient, setTestRecipient] = useState("admin@elvoradigital.com");
  const [isTesting, setIsTesting] = useState(false);
  const [testOutput, setTestOutput] = useState<string[] | null>(null);

  // Template editor state
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(emailTemplates[0]?.id || "access_grant");
  const selectedTemplate = emailTemplates.find((t) => t.id === selectedTemplateId) || emailTemplates[0];
  const [templateForm, setTemplateForm] = useState<EmailTemplateConfig>(selectedTemplate);
  const [isSavedTemplate, setIsSavedTemplate] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");

  // Selected Log inspection modal
  const [inspectingLog, setInspectingLog] = useState<EmailLog | null>(null);
  const [copiedDns, setCopiedDns] = useState<string | null>(null);

  // Quick provider preset definitions
  const applyProviderPreset = (provider: EmailProviderType) => {
    let host = "";
    let port = 587;
    let encryption: "tls" | "ssl" = "tls";
    let username = "";

    switch (provider) {
      case "resend":
        host = "smtp.resend.com";
        port = 587;
        encryption = "tls";
        username = "resend";
        break;
      case "sendgrid":
        host = "smtp.sendgrid.net";
        port = 587;
        encryption = "tls";
        username = "apikey";
        break;
      case "ses":
        host = "email-smtp.us-east-1.amazonaws.com";
        port = 587;
        encryption = "tls";
        username = "AKIAIOSFODNN7EXAMPLE";
        break;
      case "mailgun":
        host = "smtp.mailgun.org";
        port = 587;
        encryption = "tls";
        username = "postmaster@elvoradigital.com";
        break;
      case "postmark":
        host = "smtp.postmarkapp.com";
        port = 587;
        encryption = "tls";
        username = "your-postmark-server-token";
        break;
      default:
        host = "mail.yourdomain.com";
        port = 587;
        encryption = "tls";
        username = "noreply@yourdomain.com";
        break;
    }

    const updated = {
      ...smtpForm,
      provider,
      host,
      port,
      encryption,
      username,
    };
    setSmtpForm(updated);
  };

  const handleSaveSmtp = (e: React.FormEvent) => {
    e.preventDefault();
    updateEmailSmtpConfig(smtpForm);
    setIsSavedSmtp(true);
    setTimeout(() => setIsSavedSmtp(false), 2000);
  };

  const handleRunTestEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testRecipient) return;
    setIsTesting(true);
    setTestOutput(null);

    const res = await sendTestEmail(testRecipient);
    setTestOutput(res.log);
    setIsTesting(false);
  };

  const handleSelectTemplate = (tId: string) => {
    setSelectedTemplateId(tId);
    const target = emailTemplates.find((t) => t.id === tId);
    if (target) setTemplateForm(target);
  };

  const handleSaveTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    updateEmailTemplate(templateForm.id, templateForm);
    setIsSavedTemplate(true);
    setTimeout(() => setIsSavedTemplate(false), 2000);
  };

  const handleInsertTag = (tag: string) => {
    setTemplateForm((prev) => ({
      ...prev,
      body: prev.body + " " + tag,
    }));
  };

  const handleCopyDns = (val: string, key: string) => {
    navigator.clipboard.writeText(val);
    setCopiedDns(key);
    setTimeout(() => setCopiedDns(null), 2000);
  };

  // Interpolate mock data for live email preview
  const previewSubject = templateForm.subject
    .replace("{{product_name}}", "Meta Ads Mastery 2026")
    .replace("{{order_number}}", "#ELV-9041")
    .replace("{{amount}}", "499")
    .replace("{{coupon_code}}", "SAVE15NOW")
    .replace("{{license_key}}", "ELVA-4920-K192-M941")
    .replace("{{ticket_number}}", "TICK-702");

  const previewBody = templateForm.body
    .replace(/{{customer_name}}/g, "Priya Sharma")
    .replace(/{{customer_email}}/g, "priya.sharma@gmail.com")
    .replace(/{{product_name}}/g, "Meta Ads Mastery 2026 – PRO Edition")
    .replace(/{{order_number}}/g, "#ELV-9041")
    .replace(/{{amount}}/g, "499")
    .replace(/{{transaction_id}}/g, "TXN_UPI_84920194")
    .replace(/{{order_date}}/g, "24 March 2026")
    .replace(/{{coupon_code}}/g, "SAVE15NOW")
    .replace(/{{license_key}}/g, "ELVA-4920-K192-M941")
    .replace(/{{ticket_number}}/g, "TICK-702");

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Mail className="w-6 h-6 text-[#8B5CF6]" />
            Email Configuration & Delivery Center
          </h1>
          <p className="text-sm text-[#A7A3BC] mt-1">
            Connect custom SMTP or cloud email infrastructure, customize branded transactional notifications, and verify DNS deliverability.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            SMTP Provider: {emailSmtpConfig.provider.toUpperCase()} (Verified)
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/5">
        {[
          { id: "credentials", label: "SMTP & Connection", icon: Server },
          { id: "templates", label: "Transactional Templates", icon: FileCode },
          { id: "logs", label: "Delivery Logs & Queue", icon: Clock },
          { id: "dns", label: "DNS & Deliverability", icon: Globe },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? "bg-[#8B5CF6] text-white shadow-lg shadow-purple-500/20"
                  : "bg-[#17152E] text-[#A7A3BC] hover:text-white border border-white/5"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: SMTP CREDENTIALS & TEST SENDER */}
      {activeTab === "credentials" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* SMTP Form */}
          <div className="lg:col-span-2">
            <AdminCard
              title="Mail Transfer Protocol (SMTP) Settings"
              subtitle="Configure your sending infrastructure for customer product invitations and receipts"
            >
              {/* Cloud Provider Quick Presets */}
              <div className="mb-6">
                <label className="text-xs font-semibold text-[#A7A3BC] uppercase block mb-2">
                  Select Provider Preset
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {(["resend", "sendgrid", "ses", "postmark", "mailgun", "smtp"] as const).map((prov) => (
                    <button
                      key={prov}
                      type="button"
                      onClick={() => applyProviderPreset(prov)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize border transition-all text-center ${
                        smtpForm.provider === prov
                          ? "bg-purple-600/20 border-purple-500 text-purple-300 shadow-md"
                          : "bg-white/5 border-white/10 text-[#A7A3BC] hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {prov}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSaveSmtp} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-xs font-semibold text-[#A7A3BC] uppercase">SMTP Host / Server</label>
                    <input
                      type="text"
                      required
                      value={smtpForm.host}
                      onChange={(e) => setSmtpForm({ ...smtpForm, host: e.target.value })}
                      className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-mono text-purple-300 focus:outline-none focus:border-[#8B5CF6]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Port</label>
                    <input
                      type="number"
                      required
                      value={smtpForm.port}
                      onChange={(e) => setSmtpForm({ ...smtpForm, port: Number(e.target.value) })}
                      className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-[#8B5CF6]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Encryption Protocol</label>
                    <select
                      value={smtpForm.encryption}
                      onChange={(e) =>
                        setSmtpForm({
                          ...smtpForm,
                          encryption: e.target.value as "tls" | "ssl" | "none",
                        })
                      }
                      className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
                    >
                      <option value="tls" className="bg-[#17152E]">TLS (Recommended on port 587)</option>
                      <option value="ssl" className="bg-[#17152E]">SSL (Port 465)</option>
                      <option value="none" className="bg-[#17152E]">None / Unencrypted</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Username / API Key ID</label>
                    <input
                      type="text"
                      required
                      value={smtpForm.username}
                      onChange={(e) => setSmtpForm({ ...smtpForm, username: e.target.value })}
                      className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-[#8B5CF6]"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-[#A7A3BC] uppercase">
                      SMTP Password / Secret API Key
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-xs text-[#22D3EE] hover:underline flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      {showPassword ? "Hide" : "Reveal"}
                    </button>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={smtpForm.password}
                    onChange={(e) => setSmtpForm({ ...smtpForm, password: e.target.value })}
                    className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>

                <div className="border-t border-white/5 pt-4">
                  <h4 className="text-sm font-semibold text-white mb-3">Sender Identification (Headers)</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-[#A7A3BC] uppercase">From Name</label>
                      <input
                        type="text"
                        value={smtpForm.fromName}
                        onChange={(e) => setSmtpForm({ ...smtpForm, fromName: e.target.value })}
                        className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#A7A3BC] uppercase">From Email Address</label>
                      <input
                        type="email"
                        value={smtpForm.fromEmail}
                        onChange={(e) => setSmtpForm({ ...smtpForm, fromEmail: e.target.value })}
                        className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Reply-To Email</label>
                      <input
                        type="email"
                        value={smtpForm.replyToEmail}
                        onChange={(e) => setSmtpForm({ ...smtpForm, replyToEmail: e.target.value })}
                        className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  {isSavedSmtp ? (
                    <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                      <CheckCircle className="w-4 h-4" />
                      SMTP configuration saved and cached!
                    </span>
                  ) : (
                    <span className="text-xs text-[#A7A3BC]">Changes will be stored in local admin state.</span>
                  )}

                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] hover:from-[#7C3AED] hover:to-[#4F46E5] text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-purple-500/25"
                  >
                    <Save className="w-4 h-4" />
                    Save Connection
                  </button>
                </div>
              </form>
            </AdminCard>
          </div>

          {/* Test Dispatch Console */}
          <div>
            <AdminCard
              title="SMTP Handshake Diagnostic"
              subtitle="Send a live test verification email to confirm credentials"
            >
              <form onSubmit={handleRunTestEmail} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Test Destination Email</label>
                  <input
                    type="email"
                    required
                    placeholder="your-email@gmail.com"
                    value={testRecipient}
                    onChange={(e) => setTestRecipient(e.target.value)}
                    className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isTesting}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-white/10 hover:bg-white/15 text-white border border-white/15 rounded-xl text-xs font-semibold transition-all disabled:opacity-50"
                >
                  {isTesting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#8B5CF6]" />
                      Testing SMTP Handshake...
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5 text-[#22D3EE]" />
                      Dispatch Diagnostic Test
                    </>
                  )}
                </button>
              </form>

              {/* Console log display */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-xs text-[#A7A3BC] mb-1.5">
                  <span className="font-mono flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-purple-400" />
                    RFC 5321 Session Trace
                  </span>
                  {testOutput && (
                    <span className="text-emerald-400 font-semibold text-[10px]">CONNECTED 250 OK</span>
                  )}
                </div>

                <div className="p-3 bg-black/60 rounded-xl border border-white/5 font-mono text-[11px] text-[#A7A3BC] space-y-1 max-h-60 overflow-y-auto">
                  {testOutput ? (
                    testOutput.map((line, idx) => (
                      <p
                        key={idx}
                        className={
                          line.includes("250") || line.includes("235")
                            ? "text-emerald-400"
                            : line.includes("EHLO") || line.includes("MAIL FROM")
                            ? "text-purple-300"
                            : "text-[#A7A3BC]"
                        }
                      >
                        {line}
                      </p>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">
                      Click &quot;Dispatch Diagnostic Test&quot; above to simulate real-time SMTP socket handshake and authentication trace.
                    </p>
                  )}
                </div>
              </div>
            </AdminCard>
          </div>
        </div>
      )}

      {/* TAB 2: TRANSACTIONAL TEMPLATES & LIVE VISUAL PREVIEW */}
      {activeTab === "templates" && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Template Selector & Editor (5 cols) */}
          <div className="xl:col-span-5 space-y-4">
            <AdminCard
              title="Select Transactional Template"
              subtitle="Pick an automated message type to customize"
            >
              <div className="space-y-2">
                {emailTemplates.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    onClick={() => handleSelectTemplate(tmpl.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      selectedTemplateId === tmpl.id
                        ? "bg-purple-950/40 border-[#8B5CF6] text-white shadow-md"
                        : "bg-white/5 border-white/5 text-[#A7A3BC] hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white">{tmpl.name}</h4>
                      {selectedTemplateId === tmpl.id && (
                        <span className="w-2 h-2 rounded-full bg-[#8B5CF6]"></span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#A7A3BC] mt-0.5 line-clamp-1">{tmpl.description}</p>
                  </button>
                ))}
              </div>
            </AdminCard>

            {/* Template Editor Form */}
            <AdminCard title="Template Copy & Formatting" subtitle="Custom subject, copy, and call-to-action button">
              <form onSubmit={handleSaveTemplate} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Email Subject Line</label>
                  <input
                    type="text"
                    required
                    value={templateForm.subject}
                    onChange={(e) => setTemplateForm({ ...templateForm, subject: e.target.value })}
                    className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Preheader / Preview Text</label>
                  <input
                    type="text"
                    value={templateForm.preheader}
                    onChange={(e) => setTemplateForm({ ...templateForm, preheader: e.target.value })}
                    className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Hero Headline</label>
                  <input
                    type="text"
                    value={templateForm.heading}
                    onChange={(e) => setTemplateForm({ ...templateForm, heading: e.target.value })}
                    className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#8B5CF6]"
                  />
                </div>

                {/* Available Variables */}
                <div>
                  <span className="text-[11px] font-semibold text-[#A7A3BC] block mb-1.5">
                    Click to insert dynamic tags:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "{{customer_name}}",
                      "{{product_name}}",
                      "{{order_number}}",
                      "{{amount}}",
                      "{{license_key}}",
                      "{{coupon_code}}",
                    ].map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => handleInsertTag(tag)}
                        className="px-2 py-0.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-md text-[10px] font-mono text-purple-300 transition-colors"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Message Body Text</label>
                  <textarea
                    rows={6}
                    required
                    value={templateForm.body}
                    onChange={(e) => setTemplateForm({ ...templateForm, body: e.target.value })}
                    className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white font-sans leading-relaxed focus:outline-none focus:border-[#8B5CF6]"
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Button Text</label>
                    <input
                      type="text"
                      value={templateForm.ctaText}
                      onChange={(e) => setTemplateForm({ ...templateForm, ctaText: e.target.value })}
                      className="w-full mt-1.5 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#8B5CF6]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#A7A3BC] uppercase">Button Accent Color</label>
                    <div className="flex items-center gap-2 mt-1.5">
                      <input
                        type="color"
                        value={templateForm.ctaColor}
                        onChange={(e) => setTemplateForm({ ...templateForm, ctaColor: e.target.value })}
                        className="w-8 h-8 rounded-lg bg-transparent border-0 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={templateForm.ctaColor}
                        onChange={(e) => setTemplateForm({ ...templateForm, ctaColor: e.target.value })}
                        className="flex-1 px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-[#8B5CF6]"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  {isSavedTemplate ? (
                    <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Template saved!
                    </span>
                  ) : (
                    <span className="text-[11px] text-[#A7A3BC]">Saves across storefront automated dispatches.</span>
                  )}
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-xl text-xs font-semibold transition-all shadow-md"
                  >
                    Save Template
                  </button>
                </div>
              </form>
            </AdminCard>
          </div>

          {/* Live Email Visual Client Preview (7 cols) */}
          <div className="xl:col-span-7">
            <AdminCard
              title="Live Responsive Email Preview"
              subtitle="Renders real-time styling exactly as customer email clients (Gmail, Apple Mail, Outlook) will display"
              action={
                <div className="flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
                  <button
                    onClick={() => setPreviewDevice("desktop")}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                      previewDevice === "desktop"
                        ? "bg-[#8B5CF6] text-white"
                        : "text-[#A7A3BC] hover:text-white"
                    }`}
                  >
                    <Monitor className="w-3.5 h-3.5" />
                    Desktop (600px)
                  </button>
                  <button
                    onClick={() => setPreviewDevice("mobile")}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                      previewDevice === "mobile"
                        ? "bg-[#8B5CF6] text-white"
                        : "text-[#A7A3BC] hover:text-white"
                    }`}
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    Mobile (375px)
                  </button>
                </div>
              }
            >
              {/* Mail client container */}
              <div className="flex justify-center p-4 bg-[#0a081a] rounded-2xl border border-white/10 overflow-x-auto min-h-[580px]">
                <div
                  className={`transition-all duration-300 bg-[#0e0c24] rounded-2xl border border-white/15 overflow-hidden shadow-2xl flex flex-col ${
                    previewDevice === "desktop" ? "w-[580px]" : "w-[360px]"
                  }`}
                >
                  {/* Email Client Header bar */}
                  <div className="px-5 py-4 bg-[#14122d] border-b border-white/10 text-xs space-y-1.5">
                    <div className="flex justify-between text-[#A7A3BC]">
                      <span>
                        From: <strong className="text-white">{smtpForm.fromName}</strong> &lt;
                        {smtpForm.fromEmail}&gt;
                      </span>
                      <span>Today, 18:24</span>
                    </div>
                    <div className="text-[#A7A3BC]">
                      To: <span className="text-purple-300">priya.sharma@gmail.com</span>
                    </div>
                    <div className="text-white font-semibold text-sm pt-1 truncate">
                      {previewSubject}
                    </div>
                  </div>

                  {/* Email Body Content */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                    {/* Brand Banner */}
                    <div className="flex items-center justify-between pb-4 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#8B5CF6] to-[#EC4899] flex items-center justify-center font-black text-xs text-white">
                          Z
                        </div>
                        <span className="font-bold text-sm tracking-tight text-white">
                          Elvora<span>Digital</span>
                        </span>
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#22D3EE] bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20">
                        Digital Vault
                      </span>
                    </div>

                    {/* Headline */}
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                        {templateForm.heading}
                      </h2>
                    </div>

                    {/* Interpolated Body */}
                    <div className="text-xs sm:text-sm text-[#c5c2db] leading-relaxed whitespace-pre-line bg-white/[0.02] p-4 rounded-xl border border-white/5">
                      {previewBody}
                    </div>

                    {/* CTA Button */}
                    <div className="text-center py-2">
                      <a
                        href="#preview"
                        style={{ backgroundColor: templateForm.ctaColor }}
                        className="inline-block px-7 py-3 rounded-xl text-white font-bold text-xs sm:text-sm shadow-xl transition-all hover:opacity-90"
                      >
                        {templateForm.ctaText}
                      </a>
                    </div>

                    {/* Security Notice & Footer */}
                    <div className="pt-6 border-t border-white/10 text-center text-[11px] text-[#A7A3BC] space-y-1">
                      <p>
                        Need assistance with your files? Reach us at{" "}
                        <a href="mailto:support@elvoradigital.com" className="text-[#8B5CF6] underline">
                          {smtpForm.replyToEmail}
                        </a>
                      </p>
                      <p className="text-[10px] text-gray-500">
                        © 2026 ElvoraDigital Marketplace Inc. • Encrypted Digital License Assurance
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AdminCard>
          </div>
        </div>
      )}

      {/* TAB 3: DISPATCH DELIVERY LOGS */}
      {activeTab === "logs" && (
        <AdminCard
          title="Automated Email Delivery Queue"
          subtitle={`Ledger of ${emailLogs.length} automated messages dispatched to customers`}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[#A7A3BC]">
              <thead className="bg-white/5 text-xs uppercase font-semibold text-[#A7A3BC]">
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">Recipient</th>
                  <th className="px-4 py-3">Template Type</th>
                  <th className="px-4 py-3">Subject Line</th>
                  <th className="px-4 py-3">Sent Timestamp</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right rounded-r-lg">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {emailLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-semibold text-white">{log.recipientName}</p>
                      <p className="text-xs text-[#A7A3BC]">{log.recipient}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 bg-purple-500/10 text-purple-300 rounded text-xs font-medium">
                        {log.templateName}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-white max-w-xs truncate text-xs">
                      {log.subject}
                    </td>
                    <td className="px-4 py-3 text-xs text-[#A7A3BC] whitespace-nowrap">
                      {log.sentAt}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold ${
                          log.status === "delivered"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                            : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setInspectingLog(log)}
                          className="px-2.5 py-1 bg-white/5 hover:bg-white/10 text-white rounded-lg text-xs transition-colors"
                        >
                          Inspect
                        </button>
                        <button
                          onClick={() => {
                            resendEmail(log.id);
                            alert(`Resent "${log.subject}" to ${log.recipient}`);
                          }}
                          className="px-2.5 py-1 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 rounded-lg text-xs font-semibold transition-all"
                        >
                          Resend
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AdminCard>
      )}

      {/* TAB 4: DNS & DELIVERABILITY RECORDS */}
      {activeTab === "dns" && (
        <div className="space-y-6">
          <AdminCard
            title="Domain DNS Authenticity Records (SPF, DKIM, DMARC)"
            subtitle="Add these records to your domain provider (Cloudflare, GoDaddy, Namecheap) to guarantee 100% inbox deliverability"
          >
            <div className="space-y-4">
              {[
                {
                  type: "TXT",
                  host: "@",
                  value: "v=spf1 include:_spf.elvoradigital.com ~all",
                  purpose: "SPF (Sender Policy Framework): Authorizes your SMTP servers to send email.",
                },
                {
                  type: "CNAME",
                  host: "resend._domainkey.elvoradigital.com",
                  value: "feedback-smtp.us-east-1.amazonses.com",
                  purpose: "DKIM (DomainKeys Identified Mail): Cryptographically signs outgoing emails.",
                },
                {
                  type: "TXT",
                  host: "_dmarc.elvoradigital.com",
                  value: "v=DMARC1; p=reject; rua=mailto:dmarc-reports@elvoradigital.com",
                  purpose: "DMARC Policy: Protects your domain from spoofing and phishing.",
                },
                {
                  type: "MX",
                  host: "inbound.elvoradigital.com",
                  value: "feedback-smtp.us-east-1.amazonses.com (Priority 10)",
                  purpose: "Inbound MX: Handles bounce events and customer replies.",
                },
              ].map((dns, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white/5 border border-white/10 rounded-xl space-y-2 hover:border-white/20 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 font-mono text-xs font-bold rounded">
                        {dns.type}
                      </span>
                      <span className="text-xs font-mono text-white">Host: {dns.host}</span>
                    </div>
                    <button
                      onClick={() => handleCopyDns(dns.value, `dns-${idx}`)}
                      className="flex items-center gap-1.5 text-xs text-[#22D3EE] hover:underline"
                    >
                      {copiedDns === `dns-${idx}` ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied Value!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Record Value</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-2.5 bg-black/40 rounded-lg font-mono text-xs text-purple-200 select-all break-all">
                    {dns.value}
                  </div>
                  <p className="text-xs text-[#A7A3BC]">{dns.purpose}</p>
                </div>
              ))}
            </div>
          </AdminCard>
        </div>
      )}

      {/* Inspect Log Modal */}
      {inspectingLog && (
        <Modal
          isOpen={!!inspectingLog}
          onClose={() => setInspectingLog(null)}
          title={`Delivered Message: ${inspectingLog.subject}`}
        >
          <div className="space-y-4">
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#A7A3BC]">Recipient:</span>
                <span className="text-white font-medium">{inspectingLog.recipient}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A7A3BC]">Template ID:</span>
                <span className="text-purple-300 font-mono">{inspectingLog.templateId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A7A3BC]">Dispatched At:</span>
                <span className="text-white">{inspectingLog.sentAt}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A7A3BC]">Delivery Confirmation:</span>
                <span className="text-emerald-400 font-semibold">250 2.0.0 Message Accepted for Delivery</span>
              </div>
            </div>

            <div className="p-4 bg-[#0e0c24] border border-white/10 rounded-xl text-xs space-y-3">
              <h4 className="font-bold text-white text-sm">Dispatched Email Content Preview</h4>
              <p className="text-[#A7A3BC]">
                This notification contained direct access tokens and was dispatched from{" "}
                <strong>{smtpForm.fromEmail}</strong>.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setInspectingLog(null)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-xs font-semibold"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  resendEmail(inspectingLog.id);
                  setInspectingLog(null);
                  alert(`Resent email to ${inspectingLog.recipient}`);
                }}
                className="px-4 py-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-xl text-xs font-semibold"
              >
                Resend Message
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
