import { initReactI18next } from 'react-i18next';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    resources: {
      en: {
        translation: {
          lang: 'EN',
          noData: 'No data',
          madeWithLoveBy: 'Made with love by',
          developerName: 'Shemzoo',
          searchPlaceholder: 'Search by name...',
          gender: 'Gender',
          status: 'Status',
          species: 'Species',
          location: 'Location',
          reset: 'Reset',
          lastKnownLocation: 'Last known location:',
          firstSeenIn: 'First seen in:',
          'charInfo.gender': 'Gender:',
          'charInfo.status': 'Status:',
          'charInfo.specie': 'Specie:',
          'charInfo.origin': 'Origin:',
          'charInfo.type': 'Type:',
          'charInfo.location': 'Location:',
          'charCard.gender': 'Gender',
          'charCard.species': 'Species',
          'charCard.location': 'Location',
          'charCard.status': 'Status',
          'charCard.selectStatus': 'Select status',
          'statusOptions.alive': 'Alive',
          'statusOptions.dead': 'Dead',
          'statusOptions.unknown': 'Unknown',
          'genderOptions.male': 'Male',
          'genderOptions.female': 'Female',
          'genderOptions.genderless': 'Genderless',
          'genderOptions.unknown': 'Unknown',
          'speciesOptions.human': 'Human',
          'speciesOptions.alien': 'Alien',
          'speciesOptions.humanoid': 'Humanoid',
          'speciesOptions.animal': 'Animal',
          'speciesOptions.robot': 'Robot',
          'speciesOptions.cronenberg': 'Cronenberg',
          'speciesOptions.mythologicalCreature': 'Mythological Creature',
          'speciesOptions.disease': 'Disease',
          'speciesOptions.unknown': 'Unknown',
          loadingCharacter: 'Loading character card...',
          characterNotFound: 'Character with ID {{id}} does not exist.',
          genericError: 'An unexpected error occurred. Please try again later.',
          goBack: 'GO BACK',
          information: 'Information',
          loadingCharacters: 'Loading characters...',
          charactersNotFound: 'Characters with these parameters were not found',
          endOfList: 'End of character list'
        }
      },
      ru: {
        translation: {
          lang: 'РУ',
          noData: 'Нет данных',
          madeWithLoveBy: 'Made with love by',
          developerName: 'Shemzoo',
          searchPlaceholder: 'Поиск по имени...',
          gender: 'Пол',
          status: 'Статус',
          species: 'Вид',
          location: 'Местонахождение',
          reset: 'Сбросить',
          lastKnownLocation: 'Последнее известное местонахождение:',
          firstSeenIn: 'Впервые замечен в:',
          'charInfo.gender': 'Пол:',
          'charInfo.status': 'Статус:',
          'charInfo.specie': 'Вид:',
          'charInfo.origin': 'Происхождение:',
          'charInfo.type': 'Тип:',
          'charInfo.location': 'Местонахождение:',
          'charCard.gender': 'Пол',
          'charCard.species': 'Вид',
          'charCard.location': 'Местонахождение',
          'charCard.status': 'Статус',
          'charCard.selectStatus': 'Выбрать статус',
          'statusOptions.alive': 'Живой',
          'statusOptions.dead': 'Мертвый',
          'statusOptions.unknown': 'Неизвестно',
          'genderOptions.male': 'Мужской',
          'genderOptions.female': 'Женский',
          'genderOptions.genderless': 'Бесполый',
          'genderOptions.unknown': 'Неизвестно',
          'speciesOptions.human': 'Человек',
          'speciesOptions.alien': 'Инопланетянин',
          'speciesOptions.humanoid': 'Гуманоид',
          'speciesOptions.animal': 'Животное',
          'speciesOptions.robot': 'Робот',
          'speciesOptions.cronenberg': 'Кроненберг',
          'speciesOptions.mythologicalCreature': 'Мифическое существо',
          'speciesOptions.disease': 'Болезнь',
          'speciesOptions.unknown': 'Неизвестно',
          loadingCharacter: 'Loading character card...',
          characterNotFound: 'Character with ID {{id}} does not exist.',
          genericError: 'An unexpected error occurred. Please try again later.',
          goBack: 'НАЗАД',
          information: 'Информация',
          loadingCharacters: 'Загрузка персонажей...',
          charactersNotFound: 'Персонажи с такими параметрами не найдены',
          endOfList: 'Конец списка персонажей'
        }
      }
    }
  });

export default i18n;
