import React, { useState } from 'react';
import { motion } from 'motion/react';
import { surveySteps } from '../constants';
import {
  SurveyHeader,
  GenderNameInput,
  AgeSelection,
  MultipleChoice,
  SurveyBottomActions,
} from '../components';

interface SurveyScreenProps {
  navigateTo: () => void;
  childName: string;
  setChildName: (name: string) => void;
  childGender: string;
  setChildGender: (gender: string) => void;
  childAge: number;
  setChildAge: (age: number) => void;
  surveyData: Record<string, unknown>;
  updateSurveyData: (data: Record<string, unknown>) => void;
}

export default function SurveyScreen({
  navigateTo,
  childName,
  setChildName,
  childGender,
  setChildGender,
  childAge,
  setChildAge,
  updateSurveyData,
}: SurveyScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [tempAnswers, setTempAnswers] = useState<Record<string, string[]>>({});

  const currentStepData = surveySteps[currentStep];
  const progress = ((currentStep + 1) / surveySteps.length) * 100;

  const handleNext = () => {
    if (currentStep < surveySteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      updateSurveyData(tempAnswers);
      navigateTo();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    if (!childName || childName.trim().length === 0) {
      setChildName('Maya');
    }
    if (!childGender) {
      setChildGender('male');
    }
    if (childAge < 3) {
      setChildAge(6);
    }

    const defaultSurveyData = {
      personality: ['Kemampuan akademik yang baik'],
      activities: ['Anak sendiri'],
      learningStyle: ['Bermain sambil belajar'],
      interests: ['Tumbuh menjadi anak yang bahagia'],
      hobbies: ['Belajar hal baru'],
    };

    updateSurveyData(defaultSurveyData);
    navigateTo();
  };

  const handleMultipleAnswer = (option: string) => {
    const currentAnswers = tempAnswers[currentStepData.id] || [];
    const newAnswers = currentAnswers.includes(option)
      ? currentAnswers.filter((a: string) => a !== option)
      : [...currentAnswers, option];

    setTempAnswers({ ...tempAnswers, [currentStepData.id]: newAnswers });
  };

  const canProceed = () => {
    switch (currentStepData.id) {
      case 'gender-name':
        return childName.trim().length > 0;
      case 'age':
        return childAge >= 3;
      default:
        return (tempAnswers[currentStepData.id]?.length ?? 0) > 0;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SurveyHeader
        currentStep={currentStep}
        totalSteps={surveySteps.length}
        progress={progress}
        onBack={handleBack}
        onSkip={handleSkip}
        showBackButton={currentStep > 0}
        showSkipButton={currentStep === 0}
      />

      <div className="px-6 py-8 pb-32">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-gray-900 font-heading font-bold text-xl mb-8 leading-tight">
            {currentStepData.title}
          </h2>

          {currentStepData.type === 'gender-name' && (
            <GenderNameInput
              childGender={childGender}
              childName={childName}
              onGenderChange={setChildGender}
              onNameChange={setChildName}
            />
          )}

          {currentStepData.type === 'age-selection' && (
            <AgeSelection selectedAge={childAge} onAgeChange={setChildAge} />
          )}

          {currentStepData.type === 'multiple-choice' && currentStepData.options && (
            <MultipleChoice
              stepId={currentStepData.id}
              options={currentStepData.options}
              selectedOptions={tempAnswers[currentStepData.id] || []}
              onOptionToggle={handleMultipleAnswer}
            />
          )}
        </motion.div>
      </div>

      <SurveyBottomActions
        showSkipButton={currentStep === 0}
        canProceed={canProceed()}
        isLastStep={currentStep === surveySteps.length - 1}
        onSkip={handleSkip}
        onNext={handleNext}
      />
    </div>
  );
}

