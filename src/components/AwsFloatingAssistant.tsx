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
  Copy
} from 'lucide-react';

interface AwsFloatingAssistantProps {
  onOpenAudit: () => void;
}

interface ActionCard {
  title: string;
  subtitle: string;
  iconType: 'costs' | 'security' | 'architecture';
  query: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  cards?: ActionCard[];
  suggestions?: string[];
}
const GROQ_API_KEY = (import.meta.env.VITE_GROQ_API_KEY as string | undefined) || '';

const SYSTEM_PROMPT = `You are Senthil Kumar (AWS Certified Cloud Practitioner) and Principal Cloud Architect at NetXyper.
NetXyper is a specialized enterprise cloud consultancy helping educational institutions, startups, and enterprises build high-availability AWS infrastructure.

Key Core Capabilities:
1. Campus & Institutional Cloud IT: Handling 15,000+ simultaneous student admission/exam traffic spikes with AWS Auto Scaling, Application Load Balancer (ALB), and CloudFront caching.
2. Zero-Downtime Database Migration: Migrating on-prem physical/virtual servers (VMware, Hyper-V) to AWS EC2, and databases (Oracle, MySQL, SQL Server) to Amazon Aurora Multi-AZ with AWS Database Migration Service (DMS) and rehearsed rollback runbooks.
3. DevOps & CI/CD Pipelines: Containerized workflows using Docker, Amazon ECS (Fargate), Amazon EKS (Kubernetes), GitHub Actions, and Terraform Infrastructure as Code (IaC).
4. Enterprise Generative AI: Private institutional chatbots powered by Amazon Bedrock (Claude 3.5 Sonnet / Llama 3) with pgvector RAG for querying internal campus syllabi and compliance docs securely.
5. FinOps & Cost Optimization: AWS Cost Explorer, Savings Plans, and automated night/weekend resource shutdown saving institutions up to 65% over on-premise hardware.

Rules for your responses:
- Provide authoritative, practical, and resource-rich architectural guidance.
- Name specific AWS services (e.g., Aurora Multi-AZ, AWS DMS, ALB, CloudFront, ECS Fargate, Amazon Bedrock).
- Format with clean bullet points, bold key terms, and concise paragraphs.
- Keep answers focused, direct, and under 130 words for conversational clarity.
- Be polite, professional, and invite the user to book an architecture review.`;

export const AwsFloatingAssistant: React.FC<AwsFloatingAssistantProps> = ({ onOpenAudit }) => {
  const [isOpenChat, setIsOpenChat] = useState(false);
  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: `Absolutely. I can help you review your AWS architecture, security, and costs.\n\nHere are a few ways we can get started:`,
      timestamp: '10:24 AM',
      cards: [
        {
          title: 'Review AWS costs',
          subtitle: 'Analyze Cost Explorer, find savings',
          iconType: 'costs',
          query: 'Can you review my AWS costs and find savings with Cost Explorer?'
        },
        {
          title: 'Check security',
          subtitle: 'Review IAM, Security Groups, best practices',
          iconType: 'security',
          query: 'How do you check AWS security across IAM, Security Groups, and Well-Architected rules?'
        },
        {
          title: 'Assess architecture',
          subtitle: 'High availability, scaling, improvements',
          iconType: 'architecture',
          query: 'Can you assess our architecture for high availability, auto-scaling, and resilience?'
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

      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
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
          max_tokens: 340,
          temperature: 0.6
        })
      });

      if (!res.ok) {
        throw new Error(`Groq API returned ${res.status}`);
      }

      const data = await res.json();
      const aiReply = data.choices?.[0]?.message?.content;

      if (!aiReply) {
        throw new Error('Empty AI response received');
      }

      // Contextual follow-up cards
      let followUpCards: ActionCard[] | undefined = undefined;
      const lower = queryText.toLowerCase();

      if (lower.includes('audit') || lower.includes('start') || lower.includes('setup')) {
        followUpCards = [
          {
            title: 'Review AWS costs',
            subtitle: 'Analyze Cost Explorer, find savings',
            iconType: 'costs',
            query: 'Can you review my AWS costs and find savings with Cost Explorer?'
          },
          {
            title: 'Check security',
            subtitle: 'Review IAM, Security Groups, best practices',
            iconType: 'security',
            query: 'How do you check AWS security across IAM, Security Groups, and Well-Architected rules?'
          },
          {
            title: 'Assess architecture',
            subtitle: 'High availability, scaling, improvements',
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
    } catch (err) {
      console.warn('Live Groq query failed, using NetXyper Cloud Knowledge Engine:', err);

      const q = queryText.toLowerCase();
      let fallbackText = '';
      let fallbackCards: ActionCard[] | undefined = undefined;

      if (q.includes('audit') || q.includes('setup') || q.includes('review')) {
        fallbackText = `Absolutely. I can help you review your AWS architecture, security, and costs.\n\nHere are a few ways we can get started:`;
        fallbackCards = [
          {
            title: 'Review AWS costs',
            subtitle: 'Analyze Cost Explorer, find savings',
            iconType: 'costs',
            query: 'Can you review my AWS costs and find savings with Cost Explorer?'
          },
          {
            title: 'Check security',
            subtitle: 'Review IAM, Security Groups, best practices',
            iconType: 'security',
            query: 'How do you check AWS security across IAM, Security Groups, and Well-Architected rules?'
          },
          {
            title: 'Assess architecture',
            subtitle: 'High availability, scaling, improvements',
            iconType: 'architecture',
            query: 'Can you assess our architecture for high availability, auto-scaling, and resilience?'
          }
        ];
      } else if (q.includes('cost') || q.includes('saving') || q.includes('explorer')) {
        fallbackText = `Here is our 3-step AWS Cost Optimization framework:
• **Right-Sizing**: We analyze AWS Compute Optimizer and downscale over-provisioned EC2/RDS instances.
• **Commitment Discounts**: Apply 1-Year or 3-Year AWS Compute Savings Plans for baseline traffic, cutting compute bills up to 72%.
• **Lifecycle Policies**: Transition stale S3 datasets to Glacier Flexible Retrieval and eliminate unattached EBS volumes.`;
      } else if (q.includes('security') || q.includes('iam') || q.includes('group')) {
        fallbackText = `Our AWS Security & Compliance baseline includes:
• **IAM Hardening**: Enforcing least privilege, removing static root credentials, and activating MFA.
• **Network Isolation**: Tightening Security Group ingress to strict CIDR ranges and placing databases in private isolated subnets.
• **Threat Detection**: Enabling AWS CloudTrail logging and GuardDuty anomaly alerts.`;
      } else if (q.includes('architecture') || q.includes('scale') || q.includes('exam')) {
        fallbackText = `For high-availability institutional architecture:
• **Multi-AZ Resilience**: Distribute EC2/ECS workloads across multiple AWS Availability Zones behind an Application Load Balancer.
• **Auto Scaling**: Configure Target Tracking policies to automatically provision compute capacity 30 minutes before student exam windows.
• **Database High Availability**: Deploy Amazon Aurora Multi-AZ with RDS Proxy connection pooling.`;
      } else {
        fallbackText = `NetXyper designs secure, cost-effective AWS architectures for institutions and growing businesses. We can audit your current infrastructure, plan zero-downtime database migrations, or build private Bedrock GenAI solutions.`;
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

  // Helper to format bold markdown and clean bullet points
  const renderFormattedContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, lIdx) => {
      const trimmed = line.trim();
      if (!trimmed) {
        return <div key={lIdx} style={{ height: '6px' }} />;
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
          aria-label={isOpenChat ? 'Close AI Cloud Consultant' : 'Open NetXyper AI Consulting'}
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
                  width: '22px',
                  height: '22px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.22)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Cloud size={13} strokeWidth={2.6} color="#FFFFFF" />
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
          aria-label="NetXyper AI Cloud Consultant"
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
                  border: '1.5px solid #FFEDD5',
                  backgroundColor: '#FFF7ED',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Cloud size={20} color="#ED7100" strokeWidth={2.4} />
              </div>

              <div style={{ fontSize: '1.02rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.01em' }}>
                Net<span style={{ color: '#ED7100' }}>Xyper</span> AI Cloud Consultant
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
                              onClick={() => executeQuery(card.query)}
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
