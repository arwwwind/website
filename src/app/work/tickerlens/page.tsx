import type { Metadata } from 'next';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { SectionGridBackground } from '@/components/ui/section-grid-background';

export const metadata: Metadata = {
  title: 'TickerLens — Case Study | Arvind Narayan',
  description:
    'How I built TickerLens — a conversational stock screening platform using NLP and predictive ML to let investors "talk" to the market instead of fighting 50-filter dashboards.',
  openGraph: {
    title: 'TickerLens — AI Stock Intelligence Platform',
    description:
      'Case study: natural language stock screening, SWOT AI summaries, and probability-based forecasting.',
    url: 'https://arwwwind.com/work/tickerlens',
  },
};

const stack = [
  'Python', 'FastAPI', 'OpenAI GPT-4o', 'LangChain', 'Pinecone', 'PostgreSQL',
  'Redis', 'yfinance / Polygon.io', 'scikit-learn', 'XGBoost',
  'Next.js', 'TypeScript', 'D3.js', 'Tailwind CSS',
];

export default function TickerLensPage() {
  return (
    <div className='min-h-screen bg-black'>
      <SectionGridBackground>
        <div className='max-w-screen-lg mx-auto px-4 py-24'>

          <Link
            href='/work'
            className='inline-flex items-center gap-2 text-neutral-500 hover:text-emerald-400 text-sm transition-colors mb-12'
          >
            ← All Work
          </Link>

          <div className='mb-10'>
            <span className='text-xs font-semibold tracking-widest text-emerald-400 uppercase'>
              FinTech · NLP · Predictive Analytics
            </span>
            <h1 className='text-4xl md:text-5xl font-bold text-white mt-3 mb-4 leading-tight'>
              TickerLens
            </h1>
            <p className='text-xl text-neutral-300 mb-6 md:w-[75%] leading-relaxed'>
              AI-powered stock screening that lets you type "find undervalued tech stocks with
              high growth and low debt" instead of configuring 50 filters. Conversational market
              intelligence backed by real-time data, predictive ML, and sentiment analysis.
            </p>
            <div className='flex flex-wrap gap-4 text-sm text-neutral-500 mb-6'>
              <span><span className='text-neutral-300 font-medium'>Client:</span> TickerLens</span>
              <span><span className='text-neutral-300 font-medium'>Role:</span> ML & Backend Engineer</span>
              <span><span className='text-neutral-300 font-medium'>Year:</span> 2024</span>
              <span>
                <a
                  href='https://www.ticker-lens.com'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-emerald-400 hover:text-emerald-300 transition-colors'
                >
                  ticker-lens.com ↗
                </a>
              </span>
            </div>
            <div className='flex flex-wrap gap-2'>
              {['NLP', 'Conversational AI', 'LLMs', 'Predictive ML', 'FinTech', 'Sentiment Analysis'].map((t) => (
                <Badge key={t} variant='outline' className='border-emerald-800/50 text-emerald-400 text-xs'>
                  {t}
                </Badge>
              ))}
            </div>
          </div>

          <div className='w-full h-64 rounded-xl bg-gradient-to-br from-emerald-950 via-teal-950 to-black border border-emerald-900/30 mb-16 flex items-center justify-center relative overflow-hidden'>
            <div className='absolute inset-0 opacity-10' style={{backgroundImage: 'radial-gradient(ellipse at 40% 50%, #065f46 0%, transparent 60%), radial-gradient(ellipse at 60% 50%, #134e4a 0%, transparent 60%)'}} />
            <div className='text-center relative z-10'>
              <p className='text-emerald-300 text-sm font-mono tracking-widest uppercase opacity-60'>Natural Language → Market Intelligence</p>
              <p className='text-neutral-600 text-xs mt-2 font-mono'>"Find undervalued tech stocks with strong free cash flow"</p>
            </div>
          </div>

          <div className='space-y-16'>

            <section>
              <h2 className='text-2xl font-bold text-white mb-5 flex items-center gap-3'>
                <span className='w-8 h-px bg-emerald-500' />
                The Problem
              </h2>
              <p className='text-neutral-400 leading-relaxed mb-4'>
                Retail investors are drowning in data but starving for signal. Every major brokerage
                gives you 50+ technical and fundamental filters — P/E, EV/EBITDA, RSI, MACD, beta,
                free cash flow yield. But these tools are designed for quants who already know what
                they&apos;re looking for. A first-time investor trying to find "AI companies that are
                actually profitable" has no idea which combination of filters maps to that concept.
              </p>
              <p className='text-neutral-400 leading-relaxed mb-4'>
                On the other end of the spectrum, Bloomberg Terminal and similar institutional tools
                require full-time analysts to extract value. There&apos;s a massive gap between
                "I know what I want to find" and "I know how to configure the system to find it."
              </p>
              <p className='text-neutral-400 leading-relaxed'>
                TickerLens&apos;s bet: natural language is the right interface for investment research.
                The same way ChatGPT democratized text analysis, a purpose-built conversational layer
                on top of financial data can bridge the gap between intent and insight.
              </p>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-5 flex items-center gap-3'>
                <span className='w-8 h-px bg-emerald-500' />
                The Core Systems
              </h2>

              <div className='space-y-6'>
                {[
                  {
                    title: 'Conversational Screening Engine',
                    body: `The query pipeline translates natural language into a structured screening spec. A user query like "show me profitable small-cap tech stocks with recent insider buying" gets parsed through an intent classification step, then a slot-filling LLM call that extracts filter predicates (market cap range, sector, profitability metrics, insider transaction signals). These predicates are compiled into a SQL query against the normalized financial data store.

The challenge was ambiguity. "High growth" means different things in biotech vs. utilities. I built a context-aware normalization layer that adjusts threshold definitions based on inferred sector, making "high revenue growth" a top-quartile screen relative to the sector peer group rather than an absolute number.`,
                  },
                  {
                    title: 'AI-Generated Ticker Summaries & SWOT',
                    body: `Every ticker page generates a fresh SWOT analysis on demand, synthesizing: SEC filing data (10-K highlights, MD&A excerpts), recent earnings call transcripts, news sentiment from the past 30 days, and technical signal summary. The output is structured and grounded — each SWOT point cites its source (e.g., "Management flagged supply chain headwinds in Q3 2024 earnings call").

I built a retrieval pipeline using Pinecone to store and query chunked SEC filings and earnings transcripts. The LLM prompt is constructed with the retrieved context plus live price/volume data, ensuring the summary is factual and current rather than hallucinated.`,
                  },
                  {
                    title: 'Predictive Price Direction Model',
                    body: `The forecasting module provides probability-based directional forecasts (up/down/flat) over 5, 10, and 30-day horizons. This is deliberately presented as probability ranges, not price targets — the goal is to calibrate user expectations, not give false precision.

The underlying model is an ensemble of XGBoost (trained on technical features: RSI, MACD, Bollinger, volume patterns, earnings proximity) and a simple LSTM for momentum pattern recognition. I was careful to validate out-of-sample rigorously using walk-forward validation to prevent data leakage — a common failure mode in financial ML.`,
                  },
                  {
                    title: 'Visual Lens Boards',
                    body: `Standard tables hide relationships. A stock might look cheap in isolation but expensive relative to its peer group and to its own historical range. Lens Boards are interactive visualizations that position a ticker within its sector peer set across multiple dimensions simultaneously — valuation, growth, profitability, momentum.

Built on D3.js with a custom React wrapper. The graph is force-directed when showing inter-stock relationships (correlation, sector clustering) and switches to a scatter matrix when showing fundamental comparisons.`,
                  },
                ].map((item) => (
                  <div key={item.title} className='bg-neutral-950 border border-neutral-800 rounded-xl p-6'>
                    <h3 className='text-emerald-400 font-semibold mb-3'>{item.title}</h3>
                    <p className='text-neutral-400 text-sm leading-relaxed whitespace-pre-line'>{item.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-5 flex items-center gap-3'>
                <span className='w-8 h-px bg-emerald-500' />
                Engineering Decisions Worth Calling Out
              </h2>
              <div className='grid md:grid-cols-2 gap-4'>
                {[
                  {
                    title: 'Grounding over generation',
                    body: 'Every AI output is anchored to retrieved source documents. The SWOT analysis cites filings. The summary references the earnings call. This prevents the hallucination problem that would make a financial product actively dangerous.',
                  },
                  {
                    title: 'Honest uncertainty quantification',
                    body: 'Directional forecasts are presented as probability ranges with confidence scores, not point predictions. The model also surfaces its own out-of-sample accuracy for each ticker category so users can calibrate how much to weight it.',
                  },
                  {
                    title: 'Real-time data freshness',
                    body: 'Price data refreshes via WebSocket. Sentiment scores update every 4 hours via a scheduled news ingestion pipeline. Filing data updates within 2 hours of an SEC EDGAR submission. Redis caches expensive computations with TTLs matched to data freshness windows.',
                  },
                  {
                    title: 'Sector-relative screening',
                    body: 'Filter thresholds are percentile-relative to sector peers, not absolute. A 15% revenue growth rate is middling in cloud SaaS but exceptional in traditional retail — the platform knows the difference.',
                  },
                ].map((item) => (
                  <div key={item.title} className='bg-neutral-950 border border-neutral-800 rounded-xl p-5'>
                    <h3 className='text-white font-semibold text-sm mb-2'>{item.title}</h3>
                    <p className='text-neutral-500 text-sm leading-relaxed'>{item.body}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className='text-2xl font-bold text-white mb-5 flex items-center gap-3'>
                <span className='w-8 h-px bg-emerald-500' />
                Stack
              </h2>
              <div className='flex flex-wrap gap-2'>
                {stack.map((s) => (
                  <Badge key={s} variant='outline' className='border-neutral-800 text-neutral-400 text-xs'>
                    {s}
                  </Badge>
                ))}
              </div>
            </section>
          </div>

          <div className='mt-20 pt-8 border-t border-neutral-900 flex justify-between items-center'>
            <Link href='/work/cohort-ai' className='text-sm text-neutral-500 hover:text-white transition-colors'>
              ← Cohort AI
            </Link>
            <Link href='/work/yuni' className='text-sm text-neutral-500 hover:text-white transition-colors'>
              Next: Yuni →
            </Link>
          </div>
        </div>
      </SectionGridBackground>
    </div>
  );
}
