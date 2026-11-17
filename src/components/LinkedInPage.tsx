import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, Send, Check, Plus, Share2, Building2, MapPin, Users } from 'lucide-react';

interface LinkedInPageProps {
  onBackToHome: () => void;
  onRequestConsultation: () => void;
}

export const LinkedInPage: React.FC<LinkedInPageProps> = ({ onBackToHome, onRequestConsultation }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://skysynclab.com/#linkedin');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#070e17] text-slate-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between pb-2">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to SkySyncLab Home
          </button>
          <a
            href="https://www.linkedin.com/in/skysync-lab-840034448"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 px-3 py-1.5 rounded-full border border-slate-700 transition-all"
          >
            <span>Open in LinkedIn</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Company Card */}
        <div className="bg-[#0b1523] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md">
          {/* Banner */}
          <div className="w-full h-44 sm:h-52 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 relative overflow-hidden">
            <img
              src="/assets/linkedin_banner_1128x191.svg"
              alt="SkySyncLab Cover"
              className="w-full h-full object-cover opacity-90"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          {/* Profile Header */}
          <div className="px-6 sm:px-8 pb-8 pt-0 relative">
            {/* Logo Emblem */}
            <div className="-mt-16 sm:-mt-20 mb-4 inline-block relative">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#070e17] p-2.5 border-4 border-[#0b1523] shadow-xl flex items-center justify-center">
                <img
                  src="/assets/skysync_cloud_emblem.png"
                  alt="SkySyncLab Emblem"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/favicon.svg';
                  }}
                />
              </div>
            </div>

            {/* Title & Tagline */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">SkySyncLab</h1>
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/20 text-blue-400">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>
              </div>
              <p className="text-base sm:text-lg text-slate-300 font-normal">
                Cloud Infrastructure, DevOps Engineering & Enterprise Generative AI Solutions
              </p>
            </div>

            {/* Meta Line */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-4 text-xs sm:text-sm text-slate-400">
              <span className="inline-flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                IT Services and IT Consulting
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                New York, NY
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                {isFollowing ? '455' : '454'} followers
              </span>
              <span>•</span>
              <span>11-50 employees</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mt-6 pt-2">
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md cursor-pointer ${
                  isFollowing
                    ? 'bg-slate-800 text-cyan-300 border border-cyan-500/30 hover:bg-slate-750'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
                }`}
              >
                {isFollowing ? (
                  <>
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span>Following</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    <span>Follow</span>
                  </>
                )}
              </button>

              <button
                onClick={onRequestConsultation}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border border-blue-500/40 text-blue-400 hover:bg-blue-500/10 transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Message / Inquire</span>
              </button>

              <button
                onClick={handleCopyLink}
                title="Copy share link"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-slate-700 bg-slate-800/60 text-slate-300 hover:text-white hover:border-slate-600 transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
              </button>
              {copied && <span className="text-xs text-cyan-400 font-medium">Link copied!</span>}
            </div>

            {/* About SkySyncLab Section */}
            <div className="mt-8 pt-6 border-t border-slate-800/80">
              <h2 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-2">About SkySyncLab</h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                SkySyncLab engineers enterprise-grade AWS Cloud Infrastructure, automated CI/CD and GitOps pipelines, and scalable Generative AI workloads aligned with the AWS Well-Architected Framework. We empower businesses to migrate reliably, optimize cloud expenditure, and scale modern architectures with confidence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
