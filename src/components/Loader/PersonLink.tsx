import { Person } from '../../types/Person';

type Props = {
  person: Person | null;
};

export const PersonLink = ({ person }: Props) => {
  if (!person) {
    return <span>-</span>;
  }

  if (person.born === 0) {
    return (
      <span className={person.sex === 'f' ? 'has-text-danger' : ''}>
        {person.name}
      </span>
    );
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.hash = `#/people/${person.slug}`;
  };

  return (
    <a
      href={`#/people/${person.slug}`}
      className={person.sex === 'f' ? 'has-text-danger' : ''}
      data-cy="person-link"
      onClick={handleClick}
    >
      {person.name}
    </a>
  );
};
