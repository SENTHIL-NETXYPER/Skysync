import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Cloud,
  User,
  Coins,
  Shield,
  Network,
  Calendar,
  ChevronRight,
  Minus,
  Check,
  Copy,
  ArrowRight
} from 'lucide-react';
import { SkySyncLogo } from './SkySyncLogo';

interface AwsFloatingAssistantProps {
  onOpenAudit: () => void;
}

interface ActionCard {
  title: string;
  subtitle: string;
  iconType: 'costs' | 'security' | 'architecture';
  query: string;
  action?: 'audit';
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  id: string;
  cards?: ActionCard[];
  suggestions?: string[];
}
const GROQ_API_KEY = (import.meta.env.VITE_GROQ_API_KEY as string | undefined) || '';

const SYSTEM_PROMPT = `You are the SkySyncLab AI Assistant, founded by Senthil Kumar.
Your task is to provide expert, concise, and professional AWS cloud consulting advice to potential clients (universities, colleges, enterprises).

RULES FOR GREETINGS AND TONE:
1. NEVER start responses with formal greetings like "Namaste" or repeat "I am Senthil Kumar, Founder..." on casual user inputs (e.g., "hi", "hello", "hey").
2. Get straight to the answer or offer direct technical assistance. Do NOT repeat your name or title once the user is already talking in the widget.
3. Keep casual responses under 2-3 short sentences.
4. When the user says "hi", "hello", or "hey", respond with:
   "Hi! How can we help with your cloud infrastructure today? Select an option below or type your query:"
5. For technical or architectural queries, follow this strict 3-part template:
   Part 1: The Direct Technical Solution (2–3 bullet points mapping directly to AWS/Cloud best practices, naming specific services like Auto Scaling, Multi-AZ Aurora, S3, Application Load Balancer, ECS Fargate, or Amazon Bedrock).
   Part 2: The Next Logical Step (Clear institutional value or concrete benefit, e.g., zero exam-day downtime or 25%-65% cost savings).
   Part 3: One Primary Call to Action (CTA) (End with ONE direct next step, followed by [ Book a Free 30-Min Audit ] on a new line).
6. Tone & Style: Executive, confident, helpful, concise. Maximum 100-150 words per response.
7. Senthil Kumar Background: ONLY if specifically asked "Who is Senthil?" or "Who is the founder?", state that Senthil Kumar is the Founder & Principal Cloud Architect at SkySyncLab (AWS Certified Cloud Practitioner based in Salem, Tamil Nadu; email: senthilkumar@skysynclab.com). Never volunteer this unprompted on casual greetings.`;

export const AwsFloatingAssistant: React.FC<AwsFloatingAssistantProps> = ({ onOpenAudit }) => {
  const [isOpenChat, setIsOpenChat] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: `Hi there! Welcome to SkySyncLab. How can I help with your AWS architecture, cloud migration, or cost optimization today?`,
      timestamp: '10:24 AM',
      cards: [
        {
          title: 'Analyze AWS Costs',
          subtitle: 'Cost Explorer audit & FinOps savings',
          iconType: 'costs',
          query: 'Can you review my AWS costs and find savings with Cost Explorer?'
        },
        {
          title: 'Assess High Availability',
          subtitle: 'Auto-scaling & resilience review',
          iconType: 'architecture',
          query: 'Can you assess our architecture for high availability, auto-scaling, and resilience?'
        },
        {
          title: 'Book Architecture Call',
          subtitle: 'Schedule a free 30-min Well-Architected consultation',
          iconType: 'architecture',
          query: 'Can you assess our architecture for high availability, auto-scaling, and resilience?',
          action: 'audit'
        }
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpenChat) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpenChat, messages]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCardIcon = (iconType: 'costs' | 'security' | 'architecture') => {
    switch (iconType) {
      case 'costs':
        return <Coins size={18} color="#ED7100" strokeWidth={2.4} />;
      case 'security':
        return <Shield size={18} color="#ED7100" strokeWidth={2.4} />;
      case 'architecture':
        return <Network size={18} color="#ED7100" strokeWidth={2.4} />;
      default:
        return <Cloud size={18} color="#ED7100" strokeWidth={2.4} />;
    }
  };

  const executeQuery = async (queryText: string) => {
    if (!queryText.trim() || isLoading) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: queryText.trim(),
      timestamp: currentTime
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');

    // Differentiate casual greetings in chat: direct, clean response with 3 quick-reply chips
    const isGreeting = /^(hi|hello|hey|greetings|good\s*(morning|afternoon|evening)|howdy)\b[\s!.]*$/i.test(queryText.trim());

    if (isGreeting) {
      const greetingCards: ActionCard[] = [
        {
          title: 'Analyze AWS Costs',
          subtitle: 'Cost Explorer audit & FinOps savings',
          iconType: 'costs',
          query: 'Can you review my AWS costs and find savings with Cost Explorer?'
        },
        {
          title: 'Assess High Availability',
          subtitle: 'Auto-scaling & resilience review',
          iconType: 'architecture',
          query: 'Can you assess our architecture for high availability, auto-scaling, and resilience?'
        },
        {
          title: 'Book Architecture Call',
          subtitle: 'Schedule a free 30-min Well-Architected consultation',
          iconType: 'architecture',
          query: 'Can you assess our architecture for high availability, auto-scaling, and resilience?',
          action: 'audit'
        }
      ];

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: 'Hi! How can we help with your cloud infrastructure today? Select an option below or type your query:',
        timestamp: currentTime,
        cards: greetingCards
      };

      setMessages((prev) => [...prev, assistantMessage]);
      return;
    }

    setIsLoading(true);

    try {
      // Build conversation history for multi-turn context
      const chatHistory = messages.slice(-5).map((m) => ({
        role: m.role,
        content: m.content
      }));

      if (!GROQ_API_KEY) {
        throw new Error('No VITE_GROQ_API_KEY configured');
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout

      let res: Response;
      try {
        res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          signal: controller.signal,
          headers: {
            Authorization: `Bearer ${GROQ_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'qwen/qwen3.8-27b',
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              ...chatHistory,
              { role: 'user', content: queryText.trim() }
            ],
            max_tokens: 300, // Caps response length for conciseness
            temperature: 0.3 // Keeps output deterministic, executive and professional
          })
        });
      } finally {
        clearTimeout(timeoutId);
      }

      if (!res.ok) {
        throw new Error(`Groq API returned ${res.status}`);
      }

      const data = await res.json();
      const aiReply = data.choices?.[0]?.message?.content;

      if (!aiReply) {
        throw new Error('Empty AI response received');
      }

      // Dynamic Smart Quick-Reply Chips: Limit to 1 primary CTA or 2 concise choices
      let followUpCards: ActionCard[] | undefined = undefined;
      const lower = queryText.toLowerCase();

      if (lower.includes('cost') || lower.includes('saving') || lower.includes('bill') || lower.includes('finops') || lower.includes('pricing')) {
        followUpCards = [
          {
            title: 'Estimate AWS Costs',
            subtitle: 'Analyze Cost Explorer & find savings',
            iconType: 'costs',
            query: 'Can you review my AWS costs and find savings with Cost Explorer?'
          }
        ];
      } else if (lower.includes('security') || lower.includes('iam') || lower.includes('waf') || lower.includes('compliance')) {
        followUpCards = [
          {
            title: 'Schedule Security Review',
            subtitle: 'Audit IAM, Security Groups & Well-Architected rules',
            iconType: 'security',
            query: 'How do you check AWS security across IAM, Security Groups, and Well-Architected rules?'
          }
        ];
      } else {
        followUpCards = [
          {
            title: 'Schedule Architecture Review',
            subtitle: 'Free 30-min Well-Architected framework review',
            iconType: 'architecture',
            query: 'Can you assess our architecture for high availability, auto-scaling, and resilience?'
          }
        ];
      }

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: aiReply.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        cards: followUpCards
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      const isTimeout = err?.name === 'AbortError';
      console.warn(isTimeout ? 'Query timed out after 12s, using SkySyncLab Cloud Knowledge Engine' : 'Live Groq query failed, using SkySyncLab Cloud Knowledge Engine:', err);

      const q = queryText.toLowerCase();
      let fallbackText = '';
      let fallbackCards: ActionCard[] | undefined = undefined;

      if (q.includes('senthil') || q.includes('who are you') || q.includes('about you') || q.includes('founder') || q.includes('who is') || q.includes('creator')) {
        fallbackText = `Senthil Kumar is the Founder & Principal Cloud Architect at SkySyncLab, and an AWS Certified Cloud Practitioner based in Salem, Tamil Nadu:

• **Campus Modernization**: Designing rock-solid AWS architectures that protect student admission and exam portals against 15,000+ simultaneous traffic surges.
• **Ethical FinOps**: Eliminating vendor lock-in and cutting redundant cloud spend by up to 65% through disciplined Well-Architected engineering.
• **Direct Leadership**: Personally overseeing database cutovers, zero-downtime migrations, and internal staff runbook training.

We typically start with a 30-minute Architecture Audit to align on your institutional requirements.

[ Book a Free 30-Min Audit ]`;
        fallbackCards = [
          {
            title: 'Schedule Architecture Review',
            subtitle: 'Direct consultation with Senthil',
            iconType: 'architecture',
            query: 'Can you assess our architecture for high availability, auto-scaling, and resilience?'
          }
        ];
      } else if (q.includes('cost') || q.includes('saving') || q.includes('explorer') || q.includes('finops') || q.includes('bill')) {
        fallbackText = `Here is our 3-step AWS Cost Optimization framework:

• **Right-Sizing Compute**: AWS Compute Optimizer analysis to downscale idle or over-provisioned EC2 and RDS instances.
• **Commitment Discounts**: Applying 1-Year or 3-Year AWS Compute Savings Plans for baseline workloads, reducing compute bills up to 72%.
• **Storage Hygiene**: Automated S3 Glacier lifecycle transitions and terminating unattached EBS volumes.

Most institutions achieve a 25% to 65% reduction in their monthly AWS bill within the first billing cycle.

[ Book a Free 30-Min Audit ]`;
        fallbackCards = [
          {
            title: 'Estimate AWS Costs',
            subtitle: 'Analyze Cost Explorer & find savings',
            iconType: 'costs',
            query: 'Can you review my AWS costs and find savings with Cost Explorer?'
          }
        ];
      } else if (q.includes('security') || q.includes('iam') || q.includes('group') || q.includes('waf') || q.includes('compliance')) {
        fallbackText = `Here is our core AWS Security & Compliance baseline:

• **IAM Hardening**: Enforcing least-privilege role separation, mandatory MFA, and eliminating static access keys.
• **Network Isolation**: Tightening Security Group ingress to strict CIDR ranges and placing databases in isolated private subnets.
• **Continuous Auditing**: Activating AWS CloudTrail immutable logging and Amazon GuardDuty intelligent threat detection.

This baseline ensures student records and institutional datasets satisfy regulatory compliance and accreditation audits.

[ Book a Free 30-Min Audit ]`;
        fallbackCards = [
          {
            title: 'Schedule Security Review',
            subtitle: 'Audit IAM, Security Groups & compliance',
            iconType: 'security',
            query: 'How do you check AWS security across IAM, Security Groups, and Well-Architected rules?'
          }
        ];
      } else {
        // High Availability / Architecture / Audit / Default
        fallbackText = `Here is how SkySyncLab evaluates and optimizes high-concurrency cloud workloads:

• **High Availability**: Dual-AZ deployment across Application Load Balancer (ALB) and Multi-AZ Amazon Aurora to eliminate single points of failure.
• **Auto-Scaling**: Dynamic EC2 target-tracking policies triggered by CPU/Memory spikes to handle peak result-day traffic seamlessly.
• **Resilience & Storage**: Encrypted S3 document vaults with automated snapshot runbooks for rapid recovery.

We typically start with a 30-minute Architecture Audit to review your setup against the AWS Well-Architected Framework.

[ Book a Free 30-Min Audit ]`;
        fallbackCards = [
          {
            title: 'Schedule Architecture Review',
            subtitle: 'Book a free 30-min Well-Architected audit',
            iconType: 'architecture',
            query: 'Can you assess our architecture for high availability, auto-scaling, and resilience?'
          }
        ];
      }

      const fallbackMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        cards: fallbackCards
      };

      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeQuery(inputQuery);
  };

  // Helper to format bold markdown, clean bullet points, and primary CTA buttons
  const renderFormattedContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, lIdx) => {
      const trimmed = line.trim();
      if (!trimmed) {
        return <div key={lIdx} style={{ height: '6px' }} />;
      }

      // Check for inline primary CTA buttons formatted as [ Button Text ]
      if (trimmed.startsWith('[') && trimmed.endsWith(']') && trimmed.length > 2) {
        const btnText = trimmed.slice(1, -1).trim();
        return (
          <div key={lIdx} style={{ marginTop: '10px', marginBottom: '4px' }}>
            <button
              onClick={() => {
                setIsOpenChat(false);
                onOpenAudit();
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 16px',
                borderRadius: '10px',
                backgroundColor: '#ED7100',
                color: '#FFFFFF',
                border: 'none',
                fontWeight: 750,
                fontSize: '0.84rem',
                cursor: 'pointer',
                boxShadow: '0 3px 10px rgba(237, 113, 0, 0.28)',
                transition: 'all 0.16s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#D96500';
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ED7100';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Calendar size={14} strokeWidth={2.4} />
              <span>{btnText}</span>
              <ArrowRight size={14} strokeWidth={2.4} />
            </button>
          </div>
        );
      }

      const isBullet = trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('• ');
      const cleanLine = isBullet ? trimmed.replace(/^[*•-]\s*/, '') : line;

      const parts = cleanLine.split(/(\*\*.*?\*\*)/g);
      const parsedLine = parts.map((part, pIdx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return (
            <strong key={pIdx} style={{ color: '#0F172A', fontWeight: 750 }}>
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });

      if (isBullet) {
        return (
          <div
            key={lIdx}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '7px',
              margin: '3px 0',
              lineHeight: 1.5
            }}
          >
            <span
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                backgroundColor: '#ED7100',
                marginTop: '7px',
                flexShrink: 0
              }}
            />
            <div style={{ flex: 1 }}>{parsedLine}</div>
          </div>
        );
      }

      return (
        <div key={lIdx} style={{ lineHeight: 1.55, marginBottom: '2px' }}>
          {parsedLine}
        </div>
      );
    });
  };

  return (
    <>
      <style>{`
        @keyframes chatFadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .ai-action-card:hover {
          border-color: #ED7100 !important;
          box-shadow: 0 6px 18px -2px rgba(237, 113, 0, 0.18) !important;
          transform: translateY(-2px);
        }

        .chat-scroll-area::-webkit-scrollbar {
          width: 5px;
        }

        .chat-scroll-area::-webkit-scrollbar-thumb {
          background: #CBD5E1;
          border-radius: 4px;
        }
      `}</style>

      {/* Floating Action Launcher Button (Displays 'AI CONSULTING' pill label) */}
      <div
        className="floating-ai-launcher"
        style={{
          position: 'fixed',
          bottom: 'max(20px, env(safe-area-inset-bottom))',
          right: 'max(20px, env(safe-area-inset-right))',
          zIndex: 990,
          pointerEvents: 'none'
        }}
      >
        <button
          onClick={() => setIsOpenChat(!isOpenChat)}
          aria-label={isOpenChat ? 'Close AI Cloud Consultant' : 'Open SkySyncLab AI Consulting'}
          style={{
            pointerEvents: 'auto',
            backgroundColor: '#ED7100',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '9999px',
            padding: isOpenChat ? '11px 18px' : '11px 20px',
            fontSize: '0.84rem',
            fontWeight: 800,
            letterSpacing: '0.04em',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 8px 24px -2px rgba(237, 113, 0, 0.42), 0 4px 12px rgba(15, 23, 42, 0.14)',
            transition: 'all 0.22s cubic-bezier(0.16, 1, 0.3, 1)',
            textTransform: 'uppercase'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px) scale(1.03)';
            e.currentTarget.style.backgroundColor = '#D96500';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
            e.currentTarget.style.backgroundColor = '#ED7100';
          }}
        >
          {isOpenChat ? (
            <>
              <X size={17} strokeWidth={2.6} />
              <span>CLOSE</span>
            </>
          ) : (
            <>
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <SkySyncLogo iconOnly height={18} variant="dark" />
              </div>
              <span className="ai-launcher-text">AI CONSULTING</span>
            </>
          )}
        </button>
      </div>

      {/* Floating Chat Modal (Exact match to target UI) */}
      {isOpenChat && (
        <div
          role="dialog"
          aria-label="SkySyncLab AI Cloud Consultant"
          style={{
            position: 'fixed',
            bottom: '92px',
            right: '24px',
            width: 'min(410px, calc(100vw - 32px))',
            height: 'min(660px, calc(100vh - 120px))',
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            boxShadow: '0 24px 60px -12px rgba(15, 23, 42, 0.22), 0 0 0 1px rgba(226, 232, 240, 0.9)',
            zIndex: 1001,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            animation: 'chatFadeSlideUp 0.22s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '16px 18px',
              backgroundColor: '#FFFFFF',
              borderBottom: '1px solid #F1F5F9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            {/* Logo and Brand Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '11px',
                  border: '1.5px solid rgba(0, 145, 255, 0.25)',
                  backgroundColor: '#0B2A4A',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <SkySyncLogo iconOnly height={20} variant="dark" />
              </div>

              <div style={{ fontSize: '1.02rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.01em' }}>
                skysync<span style={{ color: '#0091FF' }}>lab</span> AI Consultant
              </div>
            </div>

            {/* Minimize and Close Controls */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => setIsOpenChat(false)}
                title="Minimize"
                aria-label="Minimize Chat"
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: '#F1F5F9',
                  border: 'none',
                  color: '#64748B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background-color 0.16s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#E2E8F0')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#F1F5F9')}
              >
                <Minus size={15} strokeWidth={2.5} />
              </button>

              <button
                onClick={() => setIsOpenChat(false)}
                title="Close"
                aria-label="Close Chat"
                style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#64748B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background-color 0.16s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F1F5F9')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <X size={18} strokeWidth={2.4} />
              </button>
            </div>
          </div>

          {/* Messages Scroll Area */}
          <div
            className="chat-scroll-area"
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px 18px',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: '#FFFFFF'
            }}
          >
            {messages.map((msg) => {
              if (msg.role === 'user') {
                return (
                  <div
                    key={msg.id}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end',
                      marginBottom: '18px'
                    }}
                  >
                    <span style={{ fontSize: '0.72rem', color: '#94A3B8', marginBottom: '5px', marginRight: '38px' }}>
                      {msg.timestamp}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', maxWidth: '85%' }}>
                      <div
                        style={{
                          backgroundColor: '#FFF0E6',
                          color: '#0F172A',
                          padding: '11px 16px',
                          borderRadius: '18px 18px 4px 18px',
                          fontSize: '0.9rem',
                          fontWeight: 500,
                          lineHeight: 1.45,
                          boxShadow: '0 2px 8px rgba(237, 113, 0, 0.08)'
                        }}
                      >
                        {msg.content}
                      </div>

                      {/* User Icon Avatar */}
                      <div
                        style={{
                          width: '30px',
                          height: '30px',
                          borderRadius: '50%',
                          backgroundColor: '#FFEDD5',
                          color: '#ED7100',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <User size={16} strokeWidth={2.4} />
                      </div>
                    </div>
                  </div>
                );
              }

              // Assistant message
              return (
                <div
                  key={msg.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    marginBottom: '20px',
                    width: '100%'
                  }}
                >
                  <span style={{ fontSize: '0.72rem', color: '#94A3B8', marginBottom: '5px', marginLeft: '38px' }}>
                    {msg.timestamp}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', width: '100%' }}>
                    {/* Cloud Assistant Avatar */}
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: '#FFF7ED',
                        border: '1px solid #FFEDD5',
                        color: '#ED7100',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        marginTop: '2px'
                      }}
                    >
                      <Cloud size={16} strokeWidth={2.4} />
                    </div>

                    <div style={{ flex: 1, maxWidth: 'calc(100% - 40px)' }}>
                      {/* Main Message Bubble */}
                      <div
                        style={{
                          backgroundColor: '#F1F5F9',
                          color: '#0F172A',
                          padding: '13px 16px',
                          borderRadius: '4px 18px 18px 18px',
                          fontSize: '0.9rem',
                          lineHeight: 1.55,
                          marginBottom: msg.cards && msg.cards.length > 0 ? '10px' : '0'
                        }}
                      >
                        {renderFormattedContent(msg.content)}

                        {/* Copy message button */}
                        <div
                          style={{
                            marginTop: '8px',
                            display: 'flex',
                            justifyContent: 'flex-end'
                          }}
                        >
                          <button
                            onClick={() => copyToClipboard(msg.content, msg.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              cursor: 'pointer',
                              color: copiedId === msg.id ? '#16A34A' : '#94A3B8',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              fontSize: '0.7rem',
                              fontWeight: 600,
                              padding: '2px 4px',
                              borderRadius: '4px'
                            }}
                          >
                            {copiedId === msg.id ? <Check size={11} /> : <Copy size={11} />}
                            <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                      </div>

                      {/* Stacked Action Cards */}
                      {msg.cards && msg.cards.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                          {msg.cards.map((card, cIdx) => (
                            <button
                              key={cIdx}
                              onClick={() => {
                                if (card.action === 'audit') {
                                  setIsOpenChat(false);
                                  onOpenAudit();
                                } else {
                                  executeQuery(card.query);
                                }
                              }}
                              disabled={isLoading}
                              className="ai-action-card"
                              style={{
                                backgroundColor: '#FFFFFF',
                                border: '1.5px solid #E2E8F0',
                                borderRadius: '14px',
                                padding: '12px 14px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                gap: '12px',
                                cursor: 'pointer',
                                textAlign: 'left',
                                boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
                                transition: 'all 200ms cubic-bezier(0.16, 1, 0.3, 1)'
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div
                                  style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '10px',
                                    backgroundColor: '#FFF7ED',
                                    border: '1px solid #FFEDD5',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                  }}
                                >
                                  {getCardIcon(card.iconType)}
                                </div>

                                <div>
                                  <div style={{ fontSize: '0.88rem', fontWeight: 750, color: '#0F172A' }}>
                                    {card.title}
                                  </div>
                                  <div style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 500, marginTop: '2px' }}>
                                    {card.subtitle}
                                  </div>
                                </div>
                              </div>

                              <ChevronRight size={16} color="#64748B" strokeWidth={2.2} />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginLeft: '40px',
                  backgroundColor: '#F1F5F9',
                  borderRadius: '14px',
                  padding: '10px 14px',
                  width: 'fit-content'
                }}
              >
                <div style={{ display: 'flex', gap: '4px' }}>
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#ED7100'
                    }}
                  />
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#ED7100',
                      opacity: 0.6
                    }}
                  />
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#ED7100',
                      opacity: 0.3
                    }}
                  />
                </div>
                <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: 600 }}>
                  Reviewing cloud setup...
                </span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Area */}
          <div
            style={{
              padding: '12px 16px 14px 16px',
              backgroundColor: '#FFFFFF',
              borderTop: '1px solid #F1F5F9',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            {/* Input Form with Send Button */}
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <input
                  ref={inputRef}
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="Ask about AWS, cloud costs, or migration..."
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    padding: '11px 14px',
                    borderRadius: '12px',
                    border: '1.5px solid #E2E8F0',
                    fontSize: '0.88rem',
                    outline: 'none',
                    color: '#0F172A',
                    backgroundColor: '#FFFFFF',
                    transition: 'border-color 0.18s ease, box-shadow 0.18s ease'
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = '#ED7100';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(237, 113, 0, 0.12)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={!inputQuery.trim() || isLoading}
                aria-label="Send message"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  backgroundColor: '#ED7100',
                  color: '#FFFFFF',
                  border: 'none',
                  cursor: inputQuery.trim() && !isLoading ? 'pointer' : 'default',
                  opacity: inputQuery.trim() && !isLoading ? 1 : 0.65,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 4px 12px rgba(237, 113, 0, 0.3)',
                  transition: 'transform 0.18s ease, background-color 0.18s ease'
                }}
                onMouseEnter={(e) => {
                  if (inputQuery.trim() && !isLoading) {
                    e.currentTarget.style.backgroundColor = '#D96500';
                    e.currentTarget.style.transform = 'scale(1.04)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ED7100';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <Send size={16} strokeWidth={2.4} />
              </button>
            </form>

            {/* Book an Architecture Review Button */}
            <button
              onClick={() => {
                setIsOpenChat(false);
                onOpenAudit();
              }}
              style={{
                width: '100%',
                padding: '11px 16px',
                borderRadius: '12px',
                backgroundColor: '#FFF7ED',
                border: '1.5px solid #FED7AA',
                color: '#9A3412',
                fontSize: '0.88rem',
                fontWeight: 750,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 2px 6px rgba(237, 113, 0, 0.08)',
                transition: 'all 0.18s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#FFEDD5';
                e.currentTarget.style.borderColor = '#FDBA74';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#FFF7ED';
                e.currentTarget.style.borderColor = '#FED7AA';
              }}
            >
              <Calendar size={17} color="#EA580C" strokeWidth={2.4} />
              <span>Book an architecture review</span>
            </button>

            {/* Disclaimer Text */}
            <div style={{ textAlign: 'center', fontSize: '0.72rem', color: '#94A3B8', fontWeight: 500 }}>
              AI can make mistakes. Verify critical decisions.
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AwsFloatingAssistant;
