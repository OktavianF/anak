import React from 'react';
import { DomainCard } from './DomainCard';
import type { ChcDomain } from '../../constants/chcDomains';

interface DomainGridProps {
  domains: ChcDomain[];
  onDomainClick: (gameScreen: string) => void;
}

export function DomainGrid({ domains, onDomainClick }: DomainGridProps) {
  return (
    <div className="px-6 py-4">
      <div className="grid grid-cols-2 gap-4 max-w-7xl mx-auto">
        {domains.map((domain, index) => (
          <DomainCard
            key={domain.id}
            domain={domain}
            index={index}
            onClick={() => onDomainClick(domain.gameScreen)}
          />
        ))}
      </div>
    </div>
  );
}
