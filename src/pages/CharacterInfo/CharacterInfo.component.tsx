import { useState } from 'react';

import { Link } from 'react-router-dom';

import ArrowBackIcon from '@/assets/arrow-back.svg?react';
import SearchIcon from '@/assets/search.svg?react';
import Loader from '@/shared/components/Loader/Loader.component';
import Selector from '@/shared/components/Selector/Selector.component';
import StatusIcon, {
  type Status
} from '@/shared/components/StatusIcon/StatusIcon.component';
import { TextInput } from '@/shared/components/TextInput/TextInput.component';

import styles from './CharacterInfo.module.scss';

interface StatusOptionRendererProps {
  option: { value: string; label: string };
}

const StatusOptionRenderer = ({ option }: StatusOptionRendererProps) => {
  return (
    <StatusIcon
      status={option.value as Status}
      label={option.label}
    />
  );
};

const CharacterInfo = () => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>();
  const [status, setStatus] = useState<Status | undefined>();

  const options = [
    { value: '1', label: 'Human' },
    { value: '2', label: 'Alien' },
    { value: '3', label: 'Humanoid' },
    { value: '4', label: 'Animal' },
    { value: '5', label: 'Robot' }
  ];

  const statusOptions: { value: Status; label: string }[] = [
    { value: 'alive', label: 'Alive' },
    { value: 'dead', label: 'Dead' },
    { value: 'unknown', label: 'Unknown' }
  ];

  return (
    <div className={styles.characterInfo}>
      <Link
        to='/'
        className={styles.characterInfo__goBack}
      >
        <ArrowBackIcon />
        <span>GO BACK</span>
      </Link>
      <Loader
        size='large'
        text='Loading character card...'
      />
      <div style={{ marginTop: '20px', display: 'flex', gap: '20px' }}>
        <Selector
          options={options}
          label='Species'
          value={selectedValue}
          onChange={setSelectedValue}
        />
        <Selector
          options={statusOptions}
          label='Status'
          value={status}
          onChange={(value) => setStatus(value as Status)}
          size='small'
          OptionRenderer={StatusOptionRenderer}
        />
        <TextInput
          variant='filter'
          placeholder='Filter by name...'
          icon={<SearchIcon />}
        ></TextInput>
        <TextInput variant='form'></TextInput>
      </div>
    </div>
  );
};

export default CharacterInfo;
