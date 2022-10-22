import { useContext } from 'react';
import { AppContext } from '../AppContext';
import { Restriction, RestrictionType } from '../class/Restriction';

interface RestrictionButtonProps {
  restriction: Restriction;
}

function RestrictionButton({ restriction }: RestrictionButtonProps) {
  const { setHoveredRestriction } = useContext(AppContext);

  return (
    <div
      className='menu-button vertical'
      onMouseEnter={() => setHoveredRestriction(restriction)}
      onMouseLeave={() => setHoveredRestriction(undefined)}
    >
      <div>
        {restriction.type === RestrictionType.Length
          ? 'Długość'
          : 'Prostopadłość'}
      </div>
      <button className='apply-button'>Usuń</button>
    </div>
  );
}

export default RestrictionButton;
