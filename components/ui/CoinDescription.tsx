'use client';

import { useState } from 'react';

interface CoinDescriptionProps {
  description: string;
  name: string;
}

const CoinDescription = ({ description, name }: CoinDescriptionProps) => {
  const [expanded, setExpanded] = useState(false);

  const clean = description
    .replace(/<[^>]*>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();

  if (!clean) return null;

  const isLong = clean.length > 300;
  const displayed = expanded || !isLong ? clean : clean.slice(0, 300) + '...';

  return (
    <div className="shrink-0 mt-4 bg-dark-500 rounded-xl px-5 py-4">
      <h4 className="text-lg font-semibold mb-2">About {name}</h4>
      <p className="text-sm text-purple-100 leading-relaxed">{displayed}</p>
      {isLong && (
        <button
          onClick={() => setExpanded((p) => !p)}
          className="mt-2 text-green-500 text-sm font-medium hover:text-green-400 transition-colors"
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </div>
  );
};

export default CoinDescription;