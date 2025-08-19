import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Person } from '../types/Person';
import { getPeople } from '../api';
import { PersonLink } from '../components/Loader/PersonLink';

export const PersonPage = () => {
  const { slug } = useParams();
  const [people, setPeople] = useState<Person[]>([]);
  const [person, setPerson] = useState<Person | null>(null);

  useEffect(() => {
    getPeople().then(loadedPeople => {
      setPeople(loadedPeople);
      setPerson(loadedPeople.find(p => p.slug === slug) || null);
    });
  }, [slug]);

  if (!person) {
    return <div>Person not found</div>;
  }

  const findPerson = (name: string | null) =>
    name ? people.find(p => p.name === name) || null : null;

  return (
    <div>
      <h1 className="title">{person.name}</h1>
      <div className="content">
        <p>
          Born: {person.born}, Died: {person.died}
        </p>
        <p>
          Mother: <PersonLink person={findPerson(person.motherName)} />
        </p>{' '}
        {/* ← motherName */}
        <p>
          Father: <PersonLink person={findPerson(person.fatherName)} />
        </p>{' '}
        {/* ← fatherName */}
      </div>
    </div>
  );
};
