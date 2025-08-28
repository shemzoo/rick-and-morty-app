import { useState } from 'react';
import { Link } from 'react-router-dom';

import ArrowBackIcon from '@/assets/arrow-back.svg?react';
import Loader from '@/components/Loader/Loader.component';
import Selector from '@/components/Selector/Selector.component';

import styles from './CharacterInfo.module.scss';

const CharacterInfo = () => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>();
  const [status, setStatus] = useState<string | undefined>();

  const options = [
    { value: '1', label: 'Human' },
    { value: '2', label: 'Alien' },
    { value: '3', label: 'Humanoid' },
    { value: '4', label: 'Animal' },
    { value: '5', label: 'Robot' }
  ];

  const statusOptions = [
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
          withStatusIcon={true}
          onChange={setStatus}
          size='small'
        />
      </div>
    </div>
  );
};

export default CharacterInfo;
