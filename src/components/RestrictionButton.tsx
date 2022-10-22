import { Restriction, RestrictionType } from '../class/Restriction';

interface RestrictionButtonProps {
  restriction: Restriction;
}

function RestrictionButton({ restriction }: RestrictionButtonProps) {
  return (
    <div className='menu-button vertical'>
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
