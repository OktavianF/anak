import { useState } from 'react';
import { initialChcAssessments, ChcAssessments } from '../constants/initialChcAssessments';

export function useChcAssessments() {
  const [chcAssessments] = useState<ChcAssessments>(initialChcAssessments);

  // Add any assessment update logic here if needed
  // For now, this hook just provides the initial state

  return {
    chcAssessments,
  };
}
