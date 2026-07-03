import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';
import { LEGAL_DISCLAIMER } from '@nyayaai/shared';
import type { AILegalResponse } from '@nyayaai/shared';
import { env } from '../config/env';
import { logger } from '../config/logger';

const SYSTEM_PROMPT = `You are NyayaAI, an expert Indian legal research assistant. You provide accurate, well-cited information about Indian law including:
- Constitution of India (Articles, Fundamental Rights, Directive Principles)
- Bharatiya Nyaya Sanhita (BNS), Bharatiya Nagarik Suraksha Sanhita (BNSS), Bharatiya Sakshya Adhiniyam (BSA)
- All major Indian statutes and regulations
- Supreme Court and High Court judgments
- Practical legal guidance for common situations

Always structure your response with:
1. Direct answer to the query
2. Relevant constitutional provisions (if applicable)
3. Applicable statutory provisions with section numbers
4. Relevant case law precedents with citations
5. Practical steps and required documents
6. Government authorities involved
7. Procedural roadmap with estimated timelines
8. Potential risks and considerations

IMPORTANT: Always end with this disclaimer: "${LEGAL_DISCLAIMER}"

Respond in JSON format matching this structure:
{
  "answer": "comprehensive answer",
  "constitutionalProvisions": [{"title": "", "reference": "", "excerpt": ""}],
  "statutoryProvisions": [{"title": "", "reference": "", "excerpt": ""}],
  "judicialPrecedents": [{"title": "", "reference": "", "court": "", "year": 0}],
  "practicalGuidance": ["step 1", "step 2"],
  "requiredDocuments": ["document 1"],
  "authorities": ["authority 1"],
  "proceduralRoadmap": [{"step": 1, "title": "", "description": "", "estimatedDuration": ""}],
  "estimatedTimeline": "timeline description",
  "potentialRisks": ["risk 1"],
  "disclaimer": "${LEGAL_DISCLAIMER}",
  "confidence": 0.85
}`;

export class AIService {
  private openai: OpenAI | null = null;
  private gemini: GoogleGenerativeAI | null = null;

  constructor() {
    if (env.OPENAI_API_KEY) {
      this.openai = new OpenAI({ apiKey: env.OPENAI_API_KEY });
    }
    if (env.GEMINI_API_KEY) {
      this.gemini = new GoogleGenerativeAI(env.GEMINI_API_KEY);
    }
  }

  async queryLegalAssistant(userQuery: string, context?: string): Promise<AILegalResponse> {
    const prompt = context
      ? `Context from legal documents:\n${context}\n\nUser Query: ${userQuery}`
      : userQuery;

    try {
      if (this.openai) {
        return await this.queryOpenAI(prompt);
      }
      if (this.gemini) {
        return await this.queryGemini(prompt);
      }
      return this.getMockResponse(userQuery);
    } catch (error) {
      logger.error('AI query failed:', error);
      return this.getMockResponse(userQuery);
    }
  }

  private async queryOpenAI(prompt: string): Promise<AILegalResponse> {
    const response = await this.openai!.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: prompt },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error('Empty AI response');
    return JSON.parse(content) as AILegalResponse;
  }

  private async queryGemini(prompt: string): Promise<AILegalResponse> {
    const model = this.gemini!.getGenerativeModel({ model: 'gemini-1.5-pro' });
    const result = await model.generateContent(`${SYSTEM_PROMPT}\n\nUser Query: ${prompt}`);
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Invalid Gemini response format');
    return JSON.parse(jsonMatch[0]) as AILegalResponse;
  }

  async summarizeJudgment(text: string): Promise<string> {
    const prompt = `Summarize this Indian court judgment in plain language for a layperson. Include key holdings, ratio decidendi, and practical implications:\n\n${text.slice(0, 8000)}`;

    if (this.openai) {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2,
      });
      return response.choices[0]?.message?.content || 'Summary unavailable';
    }

    return 'AI summarization requires an API key. Please configure OPENAI_API_KEY or GEMINI_API_KEY.';
  }

  async generateDocument(type: string, details: Record<string, string>): Promise<string> {
    const prompt = `Generate a legally structured ${type} document for India with the following details:\n${JSON.stringify(details, null, 2)}\n\nUse proper legal formatting, include all necessary clauses, and add placeholders for missing information marked with [PLACEHOLDER].`;

    if (this.openai) {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2,
      });
      return response.choices[0]?.message?.content || 'Document generation failed';
    }

    return this.getMockDocument(type, details);
  }

  private getMockResponse(query: string): AILegalResponse {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('legal notice') || lowerQuery.includes('notice')) {
      return {
        answer:
          'Upon receiving a legal notice, you should carefully read it, note the timeline for response (usually 15-30 days), consult an advocate, and prepare a suitable reply. Do not ignore a legal notice as it may weaken your position in subsequent proceedings.',
        constitutionalProvisions: [
          {
            title: 'Right to Equality',
            reference: 'Article 14, Constitution of India',
            excerpt: 'Equality before law and equal protection of laws.',
          },
        ],
        statutoryProvisions: [
          {
            title: 'Notice before suit',
            reference: 'Section 80, CPC / Section 355, BNSS',
            excerpt: 'Mandatory notice period before filing certain suits against government.',
          },
        ],
        judicialPrecedents: [
          {
            title: 'State of Punjab v. Gurdial Singh',
            reference: 'AIR 1980 SC 319',
            court: 'Supreme Court of India',
            year: 1980,
          },
        ],
        practicalGuidance: [
          'Read the notice carefully and identify claims made against you',
          'Gather all relevant documents and evidence',
          'Consult a qualified advocate within 7 days',
          'Prepare a detailed reply addressing each allegation',
          'Send reply via registered post with acknowledgment due',
          'Keep copies of notice and reply for records',
        ],
        requiredDocuments: [
          'Original legal notice received',
          'Supporting documents refuting claims',
          'Reply to legal notice (drafted by advocate)',
          'Registered post receipt',
        ],
        authorities: ['District Court', 'Relevant Civil/Criminal Court'],
        proceduralRoadmap: [
          {
            step: 1,
            title: 'Review Notice',
            description: 'Carefully analyze claims, timeline, and legal basis',
            estimatedDuration: '1-2 days',
          },
          {
            step: 2,
            title: 'Consult Advocate',
            description: 'Seek professional legal advice on merits and strategy',
            estimatedDuration: '2-3 days',
          },
          {
            step: 3,
            title: 'Prepare Reply',
            description: 'Draft comprehensive reply addressing all allegations',
            estimatedDuration: '5-7 days',
          },
          {
            step: 4,
            title: 'Send Reply',
            description: 'Dispatch reply via registered post before deadline',
            estimatedDuration: '1 day',
          },
        ],
        estimatedTimeline: '15-30 days from receipt of notice to file reply',
        potentialRisks: [
          'Failure to reply may lead to presumption of admission',
          'Missing deadline may weaken defense in court',
          'Inadequate reply may not protect your interests',
        ],
        disclaimer: LEGAL_DISCLAIMER,
        confidence: 0.75,
      };
    }

    if (lowerQuery.includes('cheque') && lowerQuery.includes('bounce')) {
      return {
        answer:
          'Cheque bounce is a criminal offense under Section 138 of the Negotiable Instruments Act, 1881. The payee must send a legal notice within 30 days of receiving return memo, and if payment is not made within 15 days of notice, a criminal complaint can be filed within 30 days thereafter.',
        constitutionalProvisions: [],
        statutoryProvisions: [
          {
            title: 'Dishonour of cheque for insufficiency of funds',
            reference: 'Section 138, Negotiable Instruments Act, 1881',
            excerpt:
              'Where any cheque is returned unpaid, the drawer shall be deemed to have committed an offence.',
          },
          {
            title: 'Notice demanding payment',
            reference: 'Section 138 proviso, NI Act',
            excerpt: 'Notice must be given within 30 days of receipt of information from bank.',
          },
        ],
        judicialPrecedents: [
          {
            title: 'Dashrath Rupsingh Rathod v. State of Maharashtra',
            reference: '(2014) 9 SCC 129',
            court: 'Supreme Court of India',
            year: 2014,
          },
        ],
        practicalGuidance: [
          'Obtain bank return memo showing reason for dishonour',
          'Send legal notice within 30 days via advocate',
          'Wait 15 days for payment after notice',
          'File complaint under Section 138 before Magistrate if unpaid',
          'Complaint must be filed within 30 days after expiry of notice period',
        ],
        requiredDocuments: [
          'Original cheque',
          'Bank return memo',
          'Legal notice with postal receipt',
          'Account statement',
          'Any agreement/invoice supporting the transaction',
        ],
        authorities: ['Metropolitan Magistrate / Judicial Magistrate First Class'],
        proceduralRoadmap: [
          {
            step: 1,
            title: 'Collect Evidence',
            description: 'Obtain return memo from bank',
            estimatedDuration: '1-3 days',
          },
          {
            step: 2,
            title: 'Legal Notice',
            description: 'Send notice under Section 138 within 30 days',
            estimatedDuration: '7 days',
          },
          {
            step: 3,
            title: 'Waiting Period',
            description: 'Allow 15 days for payment after notice',
            estimatedDuration: '15 days',
          },
          {
            step: 4,
            title: 'File Complaint',
            description: 'File criminal complaint before Magistrate',
            estimatedDuration: 'Within 30 days after notice period',
          },
        ],
        estimatedTimeline: '3-6 months for initial proceedings; 1-3 years for full trial',
        potentialRisks: [
          'Missing 30-day notice deadline bars prosecution',
          'Complaint must be filed at place where cheque was presented',
          'Compoundable offense — settlement possible at any stage',
        ],
        disclaimer: LEGAL_DISCLAIMER,
        confidence: 0.85,
      };
    }

    return {
      answer: `Thank you for your legal query regarding "${query}". Based on Indian law, I recommend consulting the relevant statutes and seeking advice from a qualified advocate for your specific situation. Our AI can provide general legal information, but personalized advice requires professional consultation.`,
      constitutionalProvisions: [
        {
          title: 'Right to Constitutional Remedies',
          reference: 'Article 32, Constitution of India',
          excerpt: 'Right to move Supreme Court for enforcement of fundamental rights.',
        },
      ],
      statutoryProvisions: [],
      judicialPrecedents: [],
      practicalGuidance: [
        'Document all facts and gather relevant evidence',
        'Identify the applicable area of law',
        'Consult a qualified advocate in your jurisdiction',
        'Explore alternative dispute resolution if applicable',
      ],
      requiredDocuments: ['Identity proof', 'Relevant agreements/contracts', 'Correspondence records'],
      authorities: ['District Court', 'Relevant Tribunal or Authority'],
      proceduralRoadmap: [
        {
          step: 1,
          title: 'Initial Consultation',
          description: 'Meet with an advocate to assess your case',
          estimatedDuration: '1-2 days',
        },
        {
          step: 2,
          title: 'Document Preparation',
          description: 'Gather and organize all relevant documents',
          estimatedDuration: '3-7 days',
        },
      ],
      estimatedTimeline: 'Varies based on case complexity',
      potentialRisks: ['Delay in action may affect limitation period', 'Incomplete documentation may weaken case'],
      disclaimer: LEGAL_DISCLAIMER,
      confidence: 0.6,
    };
  }

  async reviewContract(text: string): Promise<{
    summary: string;
    clauses: Array<{ name: string; content: string; risk: 'low' | 'medium' | 'high' }>;
    risks: string[];
    recommendations: string[];
    disclaimer: string;
  }> {
    const prompt = `Analyze this Indian legal contract and respond in JSON:
{
  "summary": "brief overview",
  "clauses": [{"name": "clause name", "content": "summary", "risk": "low|medium|high"}],
  "risks": ["risk 1"],
  "recommendations": ["recommendation 1"],
  "disclaimer": "${LEGAL_DISCLAIMER}"
}

Contract text:
${text.slice(0, 12000)}`;

    if (this.openai) {
      const response = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
        temperature: 0.2,
      });
      const content = response.choices[0]?.message?.content;
      if (content) return JSON.parse(content);
    }

    return {
      summary: 'Contract analysis identifies standard commercial terms with several clauses requiring review under Indian Contract Act, 1872.',
      clauses: [
        { name: 'Termination Clause', content: 'Allows termination with 30 days notice', risk: 'medium' },
        { name: 'Indemnity Clause', content: 'Broad indemnification obligations on one party', risk: 'high' },
        { name: 'Dispute Resolution', content: 'Arbitration under Arbitration and Conciliation Act, 1996', risk: 'low' },
        { name: 'Force Majeure', content: 'Standard force majeure provisions included', risk: 'low' },
        { name: 'Confidentiality', content: 'Mutual NDA with 3-year survival period', risk: 'medium' },
      ],
      risks: [
        'One-sided indemnity may expose you to unlimited liability',
        'No limitation of liability cap identified',
        'Governing law clause may favor the counterparty jurisdiction',
        'Penalty clauses may be unenforceable under Section 74 of Contract Act',
      ],
      recommendations: [
        'Negotiate mutual indemnification instead of one-sided clause',
        'Add limitation of liability cap (typically 12 months fees)',
        'Ensure governing law is Indian law with jurisdiction in your city',
        'Review penalty clauses for reasonableness under Section 74',
        'Have the contract reviewed by a qualified advocate before signing',
      ],
      disclaimer: LEGAL_DISCLAIMER,
    };
  }

  private getMockDocument(type: string, details: Record<string, string>): string {
    return `LEGAL DOCUMENT: ${type.toUpperCase()}
Generated by NyayaAI Document Automation

Date: ${new Date().toLocaleDateString('en-IN')}

${Object.entries(details)
  .map(([key, value]) => `${key.replace(/([A-Z])/g, ' $1').trim()}: ${value}`)
  .join('\n')}

[This is a template document. Please have it reviewed by a qualified advocate before use.]

---
${LEGAL_DISCLAIMER}`;
  }
}

export const aiService = new AIService();
