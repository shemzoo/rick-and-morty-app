import { type TFunction } from 'i18next';

export const getStatusOptions = (t: TFunction) => [
  { value: 'alive', label: t('statusOptions.alive') },
  { value: 'dead', label: t('statusOptions.dead') },
  { value: 'unknown', label: t('statusOptions.unknown') },
];

export const getGenderOptions = (t: TFunction) => [
  { value: 'female', label: t('genderOptions.female') },
  { value: 'male', label: t('genderOptions.male') },
  { value: 'genderless', label: t('genderOptions.genderless') },
  { value: 'unknown', label: t('genderOptions.unknown') },
];

export const getSpeciesOptions = (t: TFunction) => [
  { value: 'human', label: t('speciesOptions.human') },
  { value: 'alien', label: t('speciesOptions.alien') },
  { value: 'humanoid', label: t('speciesOptions.humanoid') },
  { value: 'animal', label: t('speciesOptions.animal') },
  { value: 'robot', label: t('speciesOptions.robot') },
  { value: 'cronenberg', label: t('speciesOptions.cronenberg') },
  {
    value: 'mythological creature',
    label: t('speciesOptions.mythologicalCreature'),
  },
  { value: 'disease', label: t('speciesOptions.disease') },
  { value: 'unknown', label: t('speciesOptions.unknown') },
];
