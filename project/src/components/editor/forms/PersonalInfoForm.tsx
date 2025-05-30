import React from 'react';
import { PersonalInfo } from '../../../types/resume';
import FormField from '../../ui/FormField';

interface PersonalInfoFormProps {
  personalInfo: PersonalInfo;
  onChange: (personalInfo: PersonalInfo) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ personalInfo, onChange }) => {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...personalInfo, [field]: value });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="First Name"
          id="firstName"
          value={personalInfo.firstName}
          onChange={(e) => handleChange('firstName', e.target.value)}
        />
        <FormField
          label="Last Name"
          id="lastName"
          value={personalInfo.lastName}
          onChange={(e) => handleChange('lastName', e.target.value)}
        />
      </div>
      
      <FormField
        label="Job Title"
        id="jobTitle"
        value={personalInfo.jobTitle}
        onChange={(e) => handleChange('jobTitle', e.target.value)}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Email"
          id="email"
          type="email"
          value={personalInfo.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />
        <FormField
          label="Phone"
          id="phone"
          value={personalInfo.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
        />
      </div>
      
      <FormField
        label="Location"
        id="location"
        value={personalInfo.location}
        onChange={(e) => handleChange('location', e.target.value)}
      />
      
      <h4 className="text-md font-medium text-gray-700 mt-6">Online Presence</h4>
      
      <FormField
        label="Website"
        id="website"
        value={personalInfo.website || ''}
        onChange={(e) => handleChange('website', e.target.value)}
      />
      
      <FormField
        label="LinkedIn"
        id="linkedin"
        value={personalInfo.linkedin || ''}
        onChange={(e) => handleChange('linkedin', e.target.value)}
      />
      
      <FormField
        label="GitHub"
        id="github"
        value={personalInfo.github || ''}
        onChange={(e) => handleChange('github', e.target.value)}
      />
    </div>
  );
};

export default PersonalInfoForm;